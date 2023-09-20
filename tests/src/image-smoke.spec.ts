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
import type { RunnerTestContext } from './testContext/runner-test-context';
import { afterAll, beforeAll, test, describe, beforeEach, expect } from 'vitest';
import { expect as playExpect } from '@playwright/test';
import { PodmanDesktopRunner } from './runner/podman-desktop-runner';
import { WelcomePage } from './model/pages/welcome-page';
import { ImagesPage } from './model/pages/images-page';
import { NavigationBar } from './model/workbench/navigation';
import { ImageDetailsPage } from './model/pages/image-details-page';

let pdRunner: PodmanDesktopRunner;
let page: Page;

beforeAll(async () => {
  pdRunner = new PodmanDesktopRunner();
  page = await pdRunner.start();
  pdRunner.setVideoName('pull-image-e2e');

  const welcomePage = new WelcomePage(page);
  await welcomePage.handleWelcomePage(true);
});

afterAll(async () => {
  await pdRunner.close();
});

beforeEach<RunnerTestContext>(async ctx => {
  ctx.pdRunner = pdRunner;
});

describe('Image workflow verification', async () => {
  test.skip('Pull image', async () => {
    const navBar = new NavigationBar(page);
    const imagesPage = await navBar.openImages();
    await playExpect(imagesPage.heading).toBeVisible();

    const pullImagePage = await imagesPage.openPullImage();
    const updatedImages = await pullImagePage.pullImage('quay.io/podman/hello');

    const exists = await updatedImages.waitForImageExists('quay.io/podman/hello');
    expect(exists, 'quay.io/podman/hello image not present in the list of images').toBeTruthy();
  });

  test.skip('Check image details', async () => {
    const imagesPage = new ImagesPage(page);
    const imageDetailPage = await imagesPage.openImageDetails('quay.io/podman/hello');

    await playExpect(imageDetailPage.summaryTab).toBeVisible();
    await playExpect(imageDetailPage.historyTab).toBeVisible();
    await playExpect(imageDetailPage.inspectTab).toBeVisible();
  });

  test.skip('Delete image', async () => {
    const imageDetailPage = new ImageDetailsPage(page, 'quay.io/podman/hello');
    await playExpect(imageDetailPage.deleteButton).toBeVisible();
    await imageDetailPage.deleteButton.click();

    const imagesPage = new ImagesPage(page);
    await playExpect(imagesPage.heading).toBeVisible();

    const imageExists = await imagesPage.waitForImageDelete('quay.io/podman/hello');
    playExpect(imageExists).toBeTruthy();
  });

  test('Build an image', async () => {
    const navBar = new NavigationBar(page);
    const images = await navBar.openImages();
    await images.buildImageButton.click();
    const input = page.getByPlaceholder('Select Containerfile to build...');
    // await input.setInputFiles('/home/odockal/git/podman-desktop-qe/examples/centos7-httpd-24.containerfile');
    // await input.fill('/home/odockal/git/podman-desktop-qe/examples/centos7-httpd-24.containerfile');
    page.on('dialog', async (dialog) => await dialog.accept());
    await input.click();
    await page.keyboard.press('Control+L', { delay: 100 });
    await page.keyboard.type('/home/odockal/git/podman-desktop-qe/examples/centos7-httpd-24.containerfile', { delay: 100 });
    await page.keyboard.press('Enter');
    const button = page.getByRole('button', { name: 'Build' });
    await playExpect(button).toBeEnabled();
    await button.click();
    const buttonDone = page.getByRole('button', { name: 'Done' });
    await playExpect(buttonDone).toBeVisible();
    await buttonDone.click();
  });
});
