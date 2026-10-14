/**********************************************************************
 * Copyright (C) 2026 Red Hat, Inc.
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

import fs from 'node:fs';
import path from 'node:path';

import { AIRGAP_MACHINE_IMAGE_FILENAMES, EULA_FILENAME_PATTERN } from '/@/model/core/installation-assets';
import { ElectronRunner } from '/@/runner/electron-runner';
import { expect as playExpect, test } from '/@/utility/fixtures';
import { handleUpdateDialog } from '/@/utility/operations';
import { isLinux, isWindows } from '/@/utility/platform';
import { isRhBuild, readPackagedProductJson, resolvePackagedResourcesPath } from '/@/utility/product';

// Mirrors podman-installer.spec.ts: no single fixed installer/asset layout on Linux
// (flatpak sandbox dir, rpm to /usr/bin, tar.gz extracted anywhere), so this suite is
// scoped to macOS/Windows only, same as the rest of the installation special-specs.
test.skip(isLinux, 'No fixed installation asset layout to verify on Linux');

test.beforeAll(async ({ runner, welcomePage }) => {
  runner.setVideoAndTraceName('installation-assets-e2e');
  await handleUpdateDialog(welcomePage.getPage());
  await welcomePage.handleWelcomePage(true);
});

test.afterAll(async ({ runner }) => {
  await runner.close();
});

async function getElectronBinary(runner: unknown): Promise<string> {
  let electronBinary: string;
  if (runner instanceof ElectronRunner) {
    electronBinary = await runner.getElectronApp().evaluate(async ({ app }) => app.getPath('exe'));
  } else {
    electronBinary = process.env.PODMAN_DESKTOP_BINARY ?? '';
  }
  playExpect(electronBinary, { message: 'Application executable binary is not defined' }).not.toBe('');
  return electronBinary;
}

test.describe('Installation assets verification', { tag: '@update-install' }, () => {
  test.describe.configure({ mode: 'serial' });

  test('Podman machine image airgap assets match the declared build variant', async ({ runner }) => {
    // The installed app alone can't tell us whether it was built with AIRGAP_DOWNLOAD set
    // (extensions/podman/packages/extension/scripts/podman-download.ts) -- absence of the
    // images is only a failure for an airgap build, and presence is only a failure for a
    // non-airgap one, so the variant under test must be told to us explicitly.
    const airgapEnv = process.env.TEST_AIRGAP_BUILD;
    test.skip(
      airgapEnv === undefined,
      'Set TEST_AIRGAP_BUILD=true|false to indicate whether this build bundles airgap machine images at install time',
    );
    const isAirgapBuild = airgapEnv === 'true';

    const electronBinary = await getElectronBinary(runner);
    const resourcesPath = resolvePackagedResourcesPath(electronBinary);
    const podmanAssetsPath = path.join(resourcesPath, 'extensions', 'podman', 'packages', 'extension', 'assets');

    for (const filename of AIRGAP_MACHINE_IMAGE_FILENAMES) {
      const assetPath = path.join(podmanAssetsPath, filename);
      const exists = fs.existsSync(assetPath);
      if (isAirgapBuild) {
        playExpect(exists, { message: `Expected airgap machine image not found: ${assetPath}` }).toBeTruthy();
      } else {
        playExpect(exists, {
          message: `Non-airgap build unexpectedly bundles machine image at install time: ${assetPath}`,
        }).toBeFalsy();
      }
    }
  });

  test('EULA is present on RH builds and absent upstream', async ({ runner }) => {
    const electronBinary = await getElectronBinary(runner);
    const resourcesPath = resolvePackagedResourcesPath(electronBinary);
    const product = readPackagedProductJson(resourcesPath);

    // rh-podman-desktop/pre-build-script.sh injects the EULA via electron-builder's
    // extraFiles: into Contents/License on macOS (a sibling of Contents/Resources), and
    // into the installation root (alongside the binary) on Windows.
    const eulaDirectory = isWindows ? path.join(electronBinary, '..') : path.join(resourcesPath, '..', 'License');

    const foundEula = fs.existsSync(eulaDirectory)
      ? // eslint-disable-next-line n/no-sync
        fs.readdirSync(eulaDirectory).find(file => EULA_FILENAME_PATTERN.test(file))
      : undefined;

    if (isRhBuild(product)) {
      playExpect(foundEula, {
        message: `Expected a Red Hat EULA PDF under: ${eulaDirectory}`,
      }).toBeTruthy();
    } else {
      playExpect(foundEula, {
        message: `Upstream build unexpectedly ships an EULA: ${String(foundEula)}`,
      }).toBeUndefined();
    }
  });
});
