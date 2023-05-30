import type { BrowserWindow } from 'electron';
import type { ElectronApplication, JSHandle, Page } from 'playwright';
import { _electron as electron } from 'playwright';
import { afterAll, beforeAll, expect, test, describe } from 'vitest';
import { expect as playExpect } from '@playwright/test';
import { existsSync, copyFileSync, renameSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { rm } from 'node:fs/promises';
import * as os from 'node:os';
import * as path from 'node:path';

let electronApp: ElectronApplication;

let page: Page;
const userHome = os.homedir();
const navBarItems = ['Dashboard', 'Containers', 'Images', 'Pods', 'Volumes', 'Settings'];
const settingsPath = path.join(
  userHome,
  '.local',
  'share',
  'containers',
  'podman-desktop',
  'configuration',
  'settings.json',
);
const settingsBackupPath = path.join(
  userHome,
  '.local',
  'share',
  'containers',
  'podman-desktop',
  'configuration',
  'settings_backup.json',
);
const kindPath = path.join(
  userHome,
  '.local',
  'share',
  'containers',
  'podman-desktop',
  'extensions-storage',
  'podman-desktop.kind',
  'kind-linux-amd64', // ToDo: change according to OS
);

describe('Basic e2e verification of podman desktop', async () => {
  beforeAll(async () => {
    // remove all videos/screenshots
    if (existsSync('tests/output')) {
      console.log('Cleaning up output folder...');
      await rm('tests/output', { recursive: true, force: true });
    }

    // // clean up settings to show initial welcome screen and telemetry, create settings backup
    // if (existsSync(settingsPath)) {
    //   console.log('Removing settings.json to get initial state');
    //   copyFileSync(settingsPath, settingsBackupPath);
    //   await rm(settingsPath, { force: true });
    // }

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

    page = await electronApp.firstWindow();
  });

  afterAll(async () => {
    console.log('In afterAll');
    await electronApp.close();
    // restore backupe settings.json file
    // if (existsSync(settingsBackupPath)) {
    //   await rm(settingsPath, { force: true });
    //   renameSync(settingsBackupPath, settingsPath);
    // }
  });

  test('Check the Welcome page is displayed', async () => {
    // Direct Electron console to Node terminal.
    page.on('console', console.log);

    const window: JSHandle<BrowserWindow> = await electronApp.browserWindow(page);

    const windowState = await window.evaluate((mainWindow): Promise<{ isVisible: boolean; isCrashed: boolean }> => {
      const getState = () => ({
        isVisible: mainWindow.isVisible(),
        isCrashed: mainWindow.webContents.isCrashed(),
      });

      return new Promise(resolve => {
        /**
         * The main window is created hidden, and is shown only when it is ready.
         * See {@link ../packages/main/src/mainWindow.ts} function
         */

        mainWindow.webContents.closeDevTools();
        if (mainWindow.isVisible()) {
          resolve(getState());
        } else mainWindow.once('ready-to-show', () => resolve(getState()));
      });
    });
    expect(windowState.isCrashed, 'The app has crashed').toBeFalsy();
    expect(windowState.isVisible, 'The main window was not visible').toBeTruthy();

    await page.screenshot({ path: 'tests/output/screenshots/screenshot-welcome-page-init.png', fullPage: true });

    const welcomeMessage = page.locator('text=/Welcome to Podman Desktop.*/');
    await playExpect(welcomeMessage).toBeVisible();
  });

  test.skip('Telemetry checkbox is present, set to true, consent can be changed', async () => {
    // wait for the initial screen to be loaded
    const telemetryConsent = page.getByText('Telemetry');
    expect(telemetryConsent).not.undefined;
    expect(await telemetryConsent.isChecked()).to.be.true;

    await telemetryConsent.click();
    expect(await telemetryConsent.isChecked()).to.be.false;
  });

  test('Redirection from Welcome page to Dashboard works', async () => {
    const goToPodmanDesktopButton = page.locator('button:text("Go to Podman Desktop")');
    // wait for visibility
    await goToPodmanDesktopButton.waitFor({ state: 'visible' });

    await page.screenshot({ path: 'tests/output/screenshots/screenshot-welcome-page-display.png', fullPage: true });

    // click on the button
    await goToPodmanDesktopButton.click();

    await page.screenshot({
      path: 'tests/output/screenshots/screenshot-welcome-page-redirect-to-dashboard.png',
      fullPage: true,
    });

    // check we have the dashboard page
    const dashboardTitle = page.getByRole('heading', { name: 'Dashboard' });
    await playExpect(dashboardTitle).toBeVisible();
  });

  test.skip('Verify main UI elements are present in Status Bar', async () => {
    await playExpect.soft(page.locator('xpath=.//li//div[@title="Help"]'), 'Help was not found').toBeVisible();
    await playExpect.soft(page.locator('xpath=.//li//div[@title="Tasks"]'), 'Help was not found').toBeVisible();
    await playExpect
      .soft(page.locator('xpath=.//li//div[@title="Share your feedback"]'), 'Share your feedback was not found')
      .toBeVisible();
    await playExpect
      .soft(page.locator('xpath=.//li//div[starts-with(@title, "Using version")]'), 'Version was not found')
      .toBeVisible();
  });

  test.skip('Verify main UI elements are present in Status Bar - Kind and Compose installation', async () => {
    if (existsSync(kindPath)) {
      console.log('Kind is already downloaded');
    } else if (binaryOnPath('kind')) {
      console.log('Kind is on PATH');
    } else {
      await playExpect
        .soft(page.getByRole('listitem').filter({ hasText: 'Kind' }), 'Kind button was not found')
        .toBeVisible();
    }
    await playExpect
      .soft(page.getByRole('listitem').filter({ hasText: 'Compose' }), 'Compose button was not found')
      .toBeVisible();
  });

  test('Verify main UI elements are present in Navigation Bar', async () => {
    for (const item of navBarItems) {
      const locator = page.getByRole('navigation').getByText(new RegExp(item));
      await playExpect.soft(locator).toBeVisible();
    }
  });
});

export function binaryOnPath(binary: string) {
  const run = (cmd: string) => execSync(cmd, 'utf-8');
  try {
    run(`which ${binary}`);
    return true;
  } catch (error) {
    return false;
  }
}
