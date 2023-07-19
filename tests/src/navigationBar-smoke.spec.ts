import type { ElectronApplication, Page } from 'playwright';
import { _electron as electron } from 'playwright';
import { afterAll, beforeAll, test, describe } from 'vitest';
import { expect as playExpect } from '@playwright/test';
import { handleWelomePage, removeFolderIfExists } from './util/testUtility';

const navBarItems = ['Dashboard', 'Containers', 'Images', 'Pods', 'Volumes', 'Settings'];
let electronApp: ElectronApplication;
let page: Page;

beforeAll(async () => {
  // clean up temporary podman-desktop configuration folder
  await removeFolderIfExists('tests/output/podman-desktop');

  const env: { [key: string]: string } = Object.assign({}, process.env as { [key: string]: string });
  env.PODMAN_DESKTOP_HOME_DIR = 'tests/output/podman-desktop';

  electronApp = await electron.launch({
    args: ['.'],
    env,
    recordVideo: {
      dir: 'tests/output/videos',
      size: {
        width: 1050,
        height: 700,
      },
    },
  });

  page = await electronApp.firstWindow();

  page.on('console', console.log);

  await handleWelomePage(page);
});

afterAll(async () => {
  await electronApp.close();
});

describe('Navigation Bar test', async () => {
  test('Verify navigation items are present', async () => {
    const navBar = page.getByRole('navigation', { name: 'AppNavigation' });
    await playExpect(navBar).toBeVisible();
    for (const item of navBarItems) {
      const locator = navBar.getByRole('link', { name: item, exact: true });
      await playExpect(locator).toBeVisible();
    }
  });
});
