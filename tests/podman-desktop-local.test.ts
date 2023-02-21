import type { ElectronApplication } from 'playwright';
import { _electron as electron } from 'playwright';
import { afterAll, beforeAll, expect, test } from 'vitest';
import type {  } from 'node:process';

describe('E2E testing suite', () => {
  let electronApp: ElectronApplication;
  const electronAppRoot = '.';
  const electronAppPath = process.env.PODMAN_DESKTOP_BINARY ? process.env.PODMAN_DESKTOP_BINARY : '/home/odockal/git/podman-desktop/dist/linux-unpacked/podman-desktop';
  // const electronAppPath = '/home/odockal/Apps/podman/podman-desktop-0.12.0/podman-desktop';
  // const electronAppPath = '.';
  beforeAll(async () => {
    electronApp = await electron.launch({ 
      // args: [electronAppRoot, '--disable_splash_screen', '--no-sandbox', '--enable-logging' ],
      executablePath: electronAppPath,
    });
  });

  afterAll(async () => {
    await electronApp.close();
  });

  test('verify electron application basic properties', async () => {
    const appProperties = await electronApp.evaluate(async ({app}) => {
      return {
        path: app.getAppPath(),
        name: app.getName(),
        version: app.getVersion(),
      };
    });
    electronApp.process().stdout.on('data', (data) => console.log(`stdout: ${data}`));
    electronApp.process().stderr.on('data', (error) => console.log(`stderr: ${error}`));
    // const process = electronApp.process();
    process.on('beforeExit', (code) => {
      console.log('Process beforeExit event with code: ', code);
    });
    process.on('exit', (code) => {
      console.log('Process exit event with code: ', code);
    });
    console.log(`App process id: ${process.pid}`);
    console.log(`properties: path: ${appProperties.path}, name: ${appProperties.name}, version: ${appProperties.version}`);
    const page = await electronApp.firstWindow();
    // Print the title.
    console.log(`windows title: ${await page.title()}`);
    await page.screenshot({ path: 'intro.png' });
  });

  // test('verify main window state', async () => {
  //   const windowState: { isVisible: boolean; isDevToolsOpened: boolean; isCrashed: boolean } = await electronApp.evaluate(
  //     ({ BrowserWindow }) => {
  //       const allWindows = BrowserWindow.getAllWindows();
  //       const mainWindow = BrowserWindow.getAllWindows()[0];

  //       console.log(`windows: ${allWindows.map(item => item.getTitle())}`);
  //       const getState = () => ({
  //         isVisible: mainWindow.isVisible(),
  //         isDevToolsOpened: mainWindow.webContents.isDevToolsOpened(),
  //         isCrashed: mainWindow.webContents.isCrashed(),
  //       });

  //       return new Promise(resolve => {
  //         if (mainWindow.isVisible()) {
  //           resolve(getState());
  //         } else mainWindow.once('ready-to-show', () => setTimeout(() => resolve(getState()), 0));
  //       });
  //     },
  //   );

  //   expect(windowState.isCrashed, 'App was crashed').toBeFalsy();
  //   expect(windowState.isVisible, 'Main window was not visible').toBeTruthy();
  //   expect(windowState.isDevToolsOpened, 'DevTools was opened').toBeFalsy();
  // });

  test('verify main window web content', async () => {
    const page = await electronApp.firstWindow();
    const element = await page.$('#app', { strict: true });
    expect(element, 'Cannot find root element').toBeDefined();
    await delay(1000);
    expect((await element.innerHTML()).trim(), 'Window content was empty').not.equal('');
    console.log(`intennHTML: ${await element?.innerHTML()}`);
    await page.screenshot({ path: 'intro2.png' });
  });

  // test('verify running application', async () => {
  //   const page = await electronApp.firstWindow();
  //   // Print the title.
  //   console.log(`windows title: ${await page.title()}`);
  //   // Capture a screenshot.
  //   await page.screenshot({ path: 'intro.png' });
  //   const element = await page.$('#app', { strict: true });
  //   expect(element, 'Cannot find root element').toBeDefined();
  //   // expect((await element.innerHTML()).trim(), 'Window content was empty').not.equal('');
  //   const header = await page.locator('#navbar');
  //   expect(header).toBeDefined();
  //   // console.log(await header.innerHTML());
  //   await delay(3000);
  // });
});

async function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}