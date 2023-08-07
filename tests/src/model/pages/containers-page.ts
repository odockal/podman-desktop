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

import type { Locator, Page } from 'playwright';
import { PodmanDesktopPage } from './base-page';
import { ContainerDetailsPage } from './container-details-page';

export class ContainersPage extends PodmanDesktopPage {
  readonly heading: Locator;
  readonly pruneContainersButton: Locator;
  readonly createContainerButton: Locator;
  readonly playKubernetesYAMLButton: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = this.page.getByRole('heading', { name: 'Containers', exact: true });
    this.pruneContainersButton = this.page.getByRole('button', { name: 'Prune containers' });
    this.createContainerButton = this.page.getByRole('button', { name: 'Create a container' });
    this.playKubernetesYAMLButton = this.page.getByRole('button', { name: 'Play Kubernetes YAML' });
  }

  async getTable(): Promise<Locator> {
    if (!(await this.pageIsEmpty())) {
      return this.page.getByRole('table');
    } else {
      throw Error('Containers page is empty, there are no containers');
    }
  }

  async pageIsEmpty(): Promise<boolean> {
    const noContainersHeading = this.page.getByRole('heading', { name: 'No containers', exact: true });
    try {
      await noContainersHeading.waitFor({ state: 'visible', timeout: 500 });
    } catch (err) {
      return false;
    }
    return true;
  }

  async openContainersDetails(name: string): Promise<ContainerDetailsPage> {
    const containerRow = await this.getContainerRowByName(name);
    if (containerRow === undefined) {
      throw Error(`Container: '${name}' does not exist`);
    }
    const containerRowName = containerRow.getByRole('cell').nth(3);
    await containerRowName.click();
    return new ContainerDetailsPage(this.page, name);
  }

  async getContainerRowByName(name: string): Promise<Locator | undefined> {
    if (await this.pageIsEmpty()) {
      return undefined;
    }
    const containersTable = await this.getTable();
    const rows = await containersTable.getByRole('row').all();
    for (const row of rows) {
      // test on empty row - contains on 0th position &nbsp; character (ISO 8859-1 character set: 160)
      const zeroCell = await row.getByRole('cell').nth(0).innerText();
      if (zeroCell.indexOf(String.fromCharCode(160)) === 0) {
        continue;
      }
      const thirdCell = await row.getByRole('cell').nth(3).innerText();
      const index = thirdCell.indexOf(name);
      if (index >= 0) {
        return row;
      }
    }
  }

  async containerExists(name: string): Promise<boolean> {
    return (await this.getContainerRowByName(name)) !== undefined ? true : false;
  }
}
