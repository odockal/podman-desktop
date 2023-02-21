import { describe, beforeAll, afterAll, test } from 'vitest';
import { expect } from '@playwright/test';
import { Locator, _electron as electron } from 'playwright';
import type { ElectronApplication } from 'playwright';
import * as os from 'os';
import path from 'path';

describe('E2E test using playwright', () => {
    let electronApp: ElectronApplication;
    const electronAppRoot = '.';
    const binaryPathWindows = path.join('win-unpacked', 'Podman Desktop.exe');
    const binaryPathLinux = path.join('linux-unpacked', 'podman-desktop');
    const distPath = path.join(__dirname, '../', 'dist');
    const localBinaryPath = path.join(distPath, os.platform() === 'win32' ? binaryPathWindows : os.platform() === 'linux' ? binaryPathLinux: '');
    const electronAppPath = process.env.PODMAN_DESKTOP_BINARY ? process.env.PODMAN_DESKTOP_BINARY : localBinaryPath;
    // const electronAppPath = '.';
    beforeAll(async () => {
      electronApp = await electron.launch({ 
        args: [
          // electronAppRoot,
          // '--no-sandbox',
          // '--whitelisted-ips',
          // '--enable-logging',
          // '--disable-gpu',
          // '--disable-software-rasterizer',
          // '--unhandled-rejections=strict',
          // '--trace-warnings',
          // '--disable_splash_screen',
        ],
        executablePath: electronAppPath,
      });
      electronApp.process().stderr.on('data', (error) => console.log(`stderr: ${error}`));
    });
  
    afterAll(async () => {
      await electronApp.close();
    });

    test('My first e2e test case', async () => {
        const appProperties = await electronApp.evaluate(async ({app}) => {
            return {
              path: app.getAppPath(),
              name: app.getName(),
              version: app.getVersion(),
            };
          });
          console.log(`properties: path: ${appProperties.path}, name: ${appProperties.name}, version: ${appProperties.version}`);
          const page = await electronApp.firstWindow();
          // const window = await electronApp.waitForEvent('window');
          // console.log(`window: ${await window.innerText('#app')}`);
          // Print the title.
          console.log(`windows title: ${await page.title()}`);
          expect(await page.title()).toBeDefined();
          expect(await page.title()).toContain('Podman Desktop');
          await page.screenshot({ path: 'intro.png' });
          const button = await page.getByText('Go to Podman Desktop');
          expect.soft(button).toBeDefined();
          const navbar1 = await page.$('#app', { strict: true });
          const navbar2 = page.getByText('Podman Desktop');
          expect.soft(navbar1).toBeDefined();
          expect.soft(navbar2).toBeDefined();
          const navbarItems = page.getByLabel('Global');
          expect.soft(navbarItems).toBeDefined();
          console.log(`Navbar items: ${await Promise.all((await getLiItems(navbarItems)).map(async item => await item.innerText()))}`);
          // get dashboard after startup
          const mainContent = await page.$('//div[@class="p-2 flex flex-col bg-zinc-800 rounded-lg"]');
          console.log(`Main content: ${await mainContent?.innerText()}`);
    });
});

export async function getLiItems(root: Locator): Promise<Locator[]> {
    const array: Locator[] = [];
    for (const li of await root.getByRole('listitem').all()) {
        array.push(li);
    }
    return array;
}

export async function getNavBarItem(root: Locator, name: string): Promise<Locator | undefined> {
    for (const li of await root.getByRole('listitem').all()) {
        if ((await li.innerText()).toLowerCase().indexOf(name) >= 0) {
            return li;
        }
    }
}
