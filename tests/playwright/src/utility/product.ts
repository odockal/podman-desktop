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

import { isWindows } from '/@/utility/platform';

// appId is the stable field branding carries: it's the macOS bundle identifier and the
// Windows PROGRAMDATA namespace, so it can't drift the way a display name might.
const RH_APP_ID = 'com.redhat.PodmanDesktop';

export interface PackagedProductJson {
  name: string;
  appId: string;
  paths: {
    config: string;
    managed: Record<string, string>;
  };
}

// Installed resources sit next to the Electron binary -- Contents/Resources on macOS,
// resources/ alongside the exe on Windows/Linux. Mirrors podman-installer.spec.ts and
// product-json-data-directory.spec.ts, which both resolve this the same way.
export function resolvePackagedResourcesPath(electronBinary: string): string {
  return isWindows ? path.join(electronBinary, '..', 'resources') : path.join(electronBinary, '..', '..', 'Resources');
}

export function readPackagedProductJson(resourcesPath: string): PackagedProductJson {
  // eslint-disable-next-line n/no-sync
  return JSON.parse(fs.readFileSync(path.join(resourcesPath, 'product.json'), 'utf-8')) as PackagedProductJson;
}

export function isRhBuild(product: Pick<PackagedProductJson, 'appId'>): boolean {
  return product.appId === RH_APP_ID;
}
