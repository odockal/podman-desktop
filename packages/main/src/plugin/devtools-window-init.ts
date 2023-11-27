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

import type { IConfigurationNode, IConfigurationRegistry } from './configuration-registry.js';
import { DevtoolsWindowSettings } from './devtools-window-settings.js';

export class DevtoolsWindowInit {
  constructor(private configurationRegistry: IConfigurationRegistry) {}

  init() {
    const devtoolsWindowConfiguration: IConfigurationNode = {
      id: 'preferences.devtoolswindow',
      title: 'Devtools Window configuration',
      type: 'object',
      properties: {
        [DevtoolsWindowSettings.SectionName + '.' + DevtoolsWindowSettings.DevtoolsWindow]: {
          description: 'DevTools window configuration in DEV mode',
          type: 'string',
          enum: [DevtoolsWindowSettings.OpenEnumValue, DevtoolsWindowSettings.CloseEnumValue, DevtoolsWindowSettings.DetachEnumValue],
          default: (process.env.DEVTOOLS_CLOSED && process.env.DEVTOOLS_CLOSED == 'true' ?
            DevtoolsWindowSettings.CloseEnumValue : DevtoolsWindowSettings.OpenEnumValue),
          hidden: true,
        },
      },
    };

    this.configurationRegistry.registerConfigurations([devtoolsWindowConfiguration]);
  }
}