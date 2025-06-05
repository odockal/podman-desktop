/**********************************************************************
 * Copyright (C) 2024 Red Hat, Inc.
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

import * as os from 'node:os';

export const isLinux = os.platform() === 'linux';
export const isMac = os.platform() === 'darwin';
export const isWindows = os.platform() === 'win32';
export const archType = os.arch();

export const isCI = process.env.CI ? process.env.CI === 'true' : false;
export const isGHActions = process.env.GITHUB_ACTIONS === 'true';
