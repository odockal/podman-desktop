/**********************************************************************
 * Copyright (C) 2023 Red Hat, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ***********************************************************************/

import type { Page } from 'playwright';
import { afterAll, beforeAll, test, describe, afterEach } from 'vitest';
import { expect as playExpect } from '@playwright/test';
import { PodmanDesktopRunner } from './runner/podman-desktop-runner';
import { WelcomePage } from './model/pages/welcome-page';
import { NavigationBar } from './model/workbench/navigation';
import { delay, executeWithTimeout, waitUntil, waitWhile } from './utility/wait';
import { deleteContainer, deleteImage } from './utility/operations';
import { ContainerState } from './model/constants/enums';

let pdRunner: PodmanDesktopRunner;
let page: Page;
const imageToPull = 'docker.io/library/alpine';
const imageTag = 'latest';
const containerToRun = 'alpine';

beforeAll(async () => {
  pdRunner = new PodmanDesktopRunner();
  page = await pdRunner.start();
  // await pdRunner.openDevToolsInDettachedMode();
  const welcomePage = new WelcomePage(page);
  await welcomePage.handleWelcomePage(true);
  // wait giving a time to podman desktop to load up
  const images = await new NavigationBar(page).openImages();
  await waitWhile(async () => await images.pageIsEmpty(), 5000, 1000, false, 'Images page is empty, there are no images present');
  // await deleteContainer(page, containerToRun);
});

afterAll(async () => {
  console.log('AfterAll containers');
  // await deleteContainer(page, containerToRun);
  // await deleteImage(page, imageToPull);
  console.log('After image removal');
  // const process = pdRunner.getElectronApp().process();
  // try {
  //   await executeWithTimeout(() => pdRunner.close(), 60000);
  // } catch(error) {
  //   console.log(`timeout encountered waiting for app to close peacefully: ${error}`);
  //   process.kill();
  // }
  await pdRunner.close();
  console.log(`AfterAll Containers end`);
}, 120000);

describe('Verification of container creation workflow', async () => {

  afterEach((test) => {
    console.log(`In afterEach evaluation...of ${test.task.name}`);
    if (test.task.fails) {
      console.log(`This task failed`);
    }
    test.onTestFailed(async () => {
      console.log(`Test has failed: ${test.task.name}, taking a screenshot`);
      const normalizeFilePath = test.task.name.replace(/'/g, `\'`).replace(/\//g, '_').replace(/:/g, '_');
      await pdRunner.screenshot(`${normalizeFilePath}.png`);
    });
  });

  test(`Pulling of '${imageToPull}:${imageTag}' image`, async () => {
    console.log('Pulling image containers');
    const navigationBar = new NavigationBar(page);
    let images = await navigationBar.openImages();
    const pullImagePage = await images.openPullImage();
    images = await pullImagePage.pullImage(imageToPull, imageTag, 45000);
    playExpect(await images.imageExists(imageToPull)).toBeTruthy();
    const details = await images.openImageDetails(imageToPull);
    playExpect(details).toBeDefined();
    await playExpect(details.heading).toContainText(imageToPull);
  }, 60000);

  test(`Start a container '${containerToRun}'`, async () => {
    console.log('start containers');
    const navigationBar = new NavigationBar(page);
    const images = await navigationBar.openImages();
    const imageDetails = await images.openImageDetails(imageToPull);
    const runImage = await imageDetails.openRunImage();
    const containers = await runImage.startContainer(containerToRun);
    await waitUntil(async () => containers.containerExists(containerToRun), 15000, 1000);
    playExpect(await containers.getTable()).toBeDefined();
    playExpect(await containers.containerExists(containerToRun)).toBeTruthy();
    await waitUntil(async () =>  {
      const containerDetails = await containers.openContainersDetails(containerToRun);
      return await containerDetails.getState() === ContainerState.Running;
    }, 20000);
    // ToDo: After updating of accessibility of various element in containers pages, we can extend test
  });

  test('Open a container details', async () => {
    console.log('open details containers');
    const navigationBar = new NavigationBar(page);
    const containers = await navigationBar.openContainers();
    const containersDetails = await containers.openContainersDetails(containerToRun);
    await playExpect(containersDetails.heading).toBeVisible();
    await playExpect(containersDetails.heading).toContainText(containerToRun);
    // test state of container in summary tab
    const containerState = await containersDetails.getState();
    playExpect(containerState).toContain(ContainerState.Running);
    // check Logs output
    await containersDetails.activateTab('Logs');
    const noLog = containersDetails.getPage().getByRole('heading', { name: 'No Log', exact: true });
    await playExpect(noLog).toBeVisible();
    // Switch between various other tabs, no checking of the content
    await containersDetails.activateTab('Inspect');
    await containersDetails.activateTab('Kube');
    await containersDetails.activateTab('Terminal');
    // ToDo: After updating of accessibility of various element in containers pages, we can extend test
  });

  test('Stopping a container', async () => {
    console.log('stop containers');
    const navigationBar = new NavigationBar(page);
    const containers = await navigationBar.openContainers();
    const containersDetails = await containers.openContainersDetails(containerToRun);
    await playExpect(containersDetails.heading).toBeVisible();
    await playExpect(containersDetails.heading).toContainText(containerToRun);
    // test state of container in summary tab
    await containersDetails.stopContainer();
    
    try {
      await waitUntil(async () => await containersDetails.getState() === ContainerState.Exited, 15000);
      await playExpect(await containersDetails.getStateLocator()).toHaveText(ContainerState.Exited);
    } catch (error) {
      console.log('Stop button not working? Error?');
      try {
        playExpect(await containersDetails.getState()).toContain(ContainerState.Running);
      } catch(error) {
        console.log(`Assertion error: ${error}`);
        // get an error:
        const cPage = containersDetails.getPage()
        const errorLocator = cPage.getByLabel('tooltip').and(cPage.getByText('Error'));
        console.log(`Error text: ${await errorLocator.allInnerTexts()}`);
      }
      await pdRunner.screenshot('stoppingcontainererror.png');
      await containersDetails.stopContainer();
      await playExpect(await containersDetails.getStateLocator()).toHaveText(ContainerState.Exited);
    }
    const startButton = containersDetails.getPage().getByRole('button', { name: 'Start Container', exact: true });
    await playExpect(startButton).toBeVisible();
  });

  test('Deleting a container', async () => {
    console.log('delete containers');
    const navigationBar = new NavigationBar(page);
    const containers = await navigationBar.openContainers();
    const containersDetails = await containers.openContainersDetails(containerToRun);
    await playExpect(containersDetails.heading).toContainText(containerToRun);
    await playExpect(await containersDetails.getStateLocator()).toHaveText(ContainerState.Exited);
    const containersPage = await containersDetails.deleteContainer();
    await playExpect(containersPage.heading).toBeVisible();
    playExpect(await containersPage.containerExists(containerToRun)).toBeFalsy();
  });
});
