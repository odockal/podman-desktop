import type { ElectronApplication, Page } from 'playwright';
import { _electron as electron } from 'playwright';
import { afterAll, beforeAll, expect, test, describe } from 'vitest';
import { expect as playExpect } from '@playwright/test';
import { existsSync, copyFileSync, renameSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { rm } from 'node:fs/promises';
import * as os from 'node:os';
import * as path from 'node:path';

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

export function dashboardTest() {
    describe('Highlevel overal', async () => {
        test('lowerlevel test', () => {
            expect(true).toBeTruthy();
        });
    });
}

export async function telemetryTest() {
    let electronApp: ElectronApplication;

    let page: Page;

    beforeAll(async () => {
    // remove all videos/screenshots
    console.log('First BeforeAll');
    if (existsSync('tests/output')) {
        console.log('Cleaning up output folder...');
        await rm('tests/output', { recursive: true, force: true });
    }
    if (existsSync(settingsPath)) {
        console.log('Removing settings.json to get initial state');
        copyFileSync(settingsPath, settingsBackupPath);
        await rm(settingsPath, { force: true });
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

    page = await electronApp.firstWindow();
    });

    afterAll(async () => {
        console.log('First AfterAll');
        await electronApp.close();
    });
    describe('Basic e2e verification of podman desktop', async () => {
        // clean up settings to show initial welcome screen and telemetry, create settings backup
        beforeAll(async () => {

            console.log('Sencond BeforeAll');

        });

        afterAll(async () => {
            // restore backupe settings.json file

            console.log('Second BeforeAll');
            if (existsSync(settingsBackupPath)) {
                console.log('Restoring settings.json file');
                await rm(settingsPath, { force: true });
                renameSync(settingsBackupPath, settingsPath);
            }
        });

        test('Check the Welcome page is displayed', async () => {
            expect(page).toBeDefined();
            // Direct Electron console to Node terminal.
            page.on('console', console.log);

            const welcomeMessage = page.locator('text=/Welcome to Podman Desktop.*/');
            await playExpect(welcomeMessage).toBeVisible();
        });

        test('Telemetry checkbox is present, set to true, consent can be changed', async () => {
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
}

export function binaryOnPath(binary: string) {
  const run = (cmd: string) => execSync(cmd, 'utf-8');
  try {
    run(`which ${binary}`);
    return true;
  } catch (error) {
    return false;
  }
}
