/**********************************************************************
 * Copyright (C) 2023-2025 Red Hat, Inc.
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

import '@testing-library/jest-dom/vitest';

import { fireEvent, render, screen } from '@testing-library/svelte';
import { expect, test, vi } from 'vitest';

import DeploymentColumnName from './DeploymentColumnName.svelte';
import type { DeploymentUI } from './DeploymentUI';

const deployment: DeploymentUI = {
  uid: '123',
  name: 'my-deployment',
  status: '',
  namespace: 'default',
  replicas: 0,
  ready: 0,
  selected: false,
  conditions: [],
};

test('Expect simple column styling', async () => {
  render(DeploymentColumnName, { object: deployment });

  const text = screen.getByText(deployment.name);
  expect(text).toBeInTheDocument();
  expect(text).toHaveClass('text-[var(--pd-table-body-text-highlight)]');
});

test('Expect clicking works', async () => {
  render(DeploymentColumnName, { object: deployment });

  const text = screen.getByText(deployment.name);
  expect(text).toBeInTheDocument();

  // test click
  const navigationSpy = vi.spyOn(window, 'navigateToRoute');

  await fireEvent.click(text);

  expect(navigationSpy).toBeCalledWith('kubernetes', [
    { kind: 'Deployment', name: deployment.name, namespace: deployment.namespace },
  ]);
});

test('Expect to show namespace in column', async () => {
  render(DeploymentColumnName, { object: deployment });

  const text = screen.getByText(deployment.namespace);
  expect(text).toBeInTheDocument();
});
