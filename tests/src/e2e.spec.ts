import type { BrowserWindow } from 'electron';
import type { ElectronApplication, JSHandle, Page } from 'playwright';
import { _electron as electron } from 'playwright';
import { afterAll, beforeAll, expect, test } from 'vitest';
import { expect as playExpect } from '@playwright/test';
import { existsSync } from 'node:fs';
import { rm } from 'node:fs/promises';

let electronApp: ElectronApplication;

let page: Page;

beforeAll(async () => {
  // remove all videos/screenshots
  if (existsSync('tests/output')) {
    console.log('Cleaning up output folder...');
    await rm('tests/output', { recursive: true, force: true });
  }

  electronApp = await electron.launch({
    args: ['.'],
    recordVideo: {
      dir: 'tests/output/videos',
      size: {
        width: 1050,
        height: 700,
      },
    },
  });

  electronApp.process().stdout?.on('data', (data) => console.log(`stdout: ${data}`));
  electronApp.process().stderr?.on('data', (error) => console.log(`stderr: ${error}`));

  page = await electronApp.firstWindow();
});

afterAll(async () => {
  console.log('After all...');
  await electronApp.close().then((data) => {
    console.log(`Sucessfully resolved application closing: ${data}`);
  }).catch((error) => {
    console.log(`Error happened on catch part: ${error}`);
  });
});

test('Check welcome page is displayed and that we are redirected to the main page where dashboard page is there', async () => {
  // Direct Electron console to Node terminal.
  page.on('console', console.log);

  const window: JSHandle<BrowserWindow> = await electronApp.browserWindow(page);

  const windowState = await window.evaluate(
    (mainWindow): Promise<{ isVisible: boolean; isDevToolsOpened: boolean; isCrashed: boolean }> => {
      const getState = () => ({
        isVisible: mainWindow.isVisible(),
        isDevToolsOpened: mainWindow.webContents.isDevToolsOpened(),
        isCrashed: mainWindow.webContents.isCrashed(),
      });

      return new Promise(resolve => {
        /**
         * The main window is created hidden, and is shown only when it is ready.
         * See {@link ../packages/main/src/mainWindow.ts} function
         */
        if (mainWindow.isVisible()) {
          resolve(getState());
        } else mainWindow.once('ready-to-show', () => resolve(getState()));
      });
    },
  );

  await page.screenshot({ path: 'tests/output/screenshots/screenshot-welcome-page-init.png', fullPage: true });

  // wait for the initial screen to be loaded
  console.log('goToPodmanDekstop = page.locator');
  const goToPodmanDesktopButton = page.locator('button:text("Go to Podman Desktop")');
  // wait for visibility
  console.log('goToPodmanDekstop waitFor');
  await goToPodmanDesktopButton.waitFor({ state: 'visible', timeout: 3000 },);

  await page.screenshot({ path: 'tests/output/screenshots/screenshot-welcome-page-display.png', fullPage: true });

  // click on the button
  console.log('click');
  await goToPodmanDesktopButton.click();

  await page.screenshot({
    path: 'tests/output/screenshots/screenshot-welcome-page-redirect-to-dashboard.png',
    fullPage: true,
  });

  // check we have the dashboard page
  console.log('getByrole');
  const dashboardTitle = page.getByRole('heading', { name: 'Dashboard' });
  console.log('expect test');
  expect(dashboardTitle).toBeDefined();

  expect(windowState.isCrashed, 'The app has crashed').toBeFalsy();
  expect(windowState.isVisible, 'The main window was not visible').toBeTruthy();
}, 20000);
