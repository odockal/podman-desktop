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
import { afterAll, beforeAll, test, describe } from 'vitest';
import { expect as playExpect } from '@playwright/test';
import { PodmanDesktopRunner } from './runner/podman-desktop-runner';
import { WelcomePage } from './model/pages/welcome-page';
import { NavigationBar } from './model/workbench/navigation';
import { delay, waitWhile } from './utility/wait';
import { deleteContainer, deleteImage } from './utility/operations';

let pdRunner: PodmanDesktopRunner;
let page: Page;
const imageToPull = 'alpine';
const imageTag = 'latest';
const containerToRun = 'alpine';

beforeAll(async () => {
  console.log('BeforeAll containers');
  pdRunner = new PodmanDesktopRunner();
  page = await pdRunner.start();
  const welcomePage = new WelcomePage(page);
  await welcomePage.handleWelcomePage(true);
  // hard wait giving a time to podman desktop to load up
  await delay(5000);
  await deleteContainer(page, containerToRun);
  await deleteImage(page, imageToPull);
}, 30000);

afterAll(async () => {
  console.log('AfterAll containers');
  await deleteContainer(page, containerToRun);
  await deleteImage(page, imageToPull);
  await pdRunner.close();
});

describe('Verification of container creation workflow', async () => {
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
    await waitWhile(() => containers.pageIsEmpty());
    playExpect(await containers.getTable()).toBeDefined();
    playExpect(await containers.containerExists(containerToRun)).toBeTruthy();
    // ToDo: After updating of accessibility of various element in containers pages, we can extend test
  }, 30000);

  test('Open a container details', async () => {
    console.log('open details containers');
    const navigationBar = new NavigationBar(page);
    const containers = await navigationBar.openContainers();
    const containersDetails = await containers.openContainersDetails(containerToRun);
    await playExpect(containersDetails.heading).toBeVisible();
    await playExpect(containersDetails.heading).toContainText(containerToRun);
    // test state of container in summary tab
    const containerState = await containersDetails.getState();
    playExpect(containerState).toContain('RUNNING');
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
    playExpect(await containersDetails.getState()).toContain('RUNNING');
    await containersDetails.stopContainer();
    await playExpect(await containersDetails.getStateLocator()).toHaveText('EXITED');
    const startButton = containersDetails.getPage().getByRole('button', { name: 'Start Container', exact: true });
    await playExpect(startButton).toBeVisible();
  });

  test('Deleting a container', async () => {
    console.log('delete containers');
    const navigationBar = new NavigationBar(page);
    const containers = await navigationBar.openContainers();
    const containersDetails = await containers.openContainersDetails(containerToRun);
    await playExpect(containersDetails.heading).toContainText(containerToRun);
    await playExpect(await containersDetails.getStateLocator()).toHaveText('EXITED');
    const containersPage = await containersDetails.deleteContainer();
    playExpect(containersPage).toBeDefined();
    playExpect(await containersPage.containerExists(containerToRun)).toBeFalsy();
  });
});
