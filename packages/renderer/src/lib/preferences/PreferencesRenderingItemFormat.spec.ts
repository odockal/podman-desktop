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

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */

import '@testing-library/jest-dom';
import { test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import type { IConfigurationPropertyRecordedSchema } from '../../../../main/src/plugin/configuration-registry';
import PreferencesRenderingItemFormat from './PreferencesRenderingItemFormat.svelte';
import userEvent from '@testing-library/user-event';

beforeAll(() => {
  (window as any).getConfigurationValue = vi.fn();
});

test('Expect to see checkbox enabled', async () => {
  const record: IConfigurationPropertyRecordedSchema = {
    title: 'my boolean property',
    id: 'myid',
    parentId: '',
    type: 'boolean',
    default: true,
  };
  // remove display name
  render(PreferencesRenderingItemFormat, { record });
  const button = screen.getByRole('checkbox');
  expect(button).toBeInTheDocument();
  expect(button).toBeChecked();
});

test('Expect to see checkbox enabled', async () => {
  const record: IConfigurationPropertyRecordedSchema = {
    title: 'my boolean property',
    id: 'myid',
    parentId: '',
    type: 'boolean',
    default: false,
  };
  // remove display name
  render(PreferencesRenderingItemFormat, { record });
  const button = screen.getByRole('checkbox');
  expect(button).toBeInTheDocument();
  expect(button).not.toBeChecked();
});

test('Expect a checkbox when record is type boolean', async () => {
  const record: IConfigurationPropertyRecordedSchema = {
    id: 'record',
    title: 'record',
    parentId: 'parent.record',
    description: 'record-description',
    type: 'boolean',
  };
  render(PreferencesRenderingItemFormat, {
    record,
  });
  const input = screen.getByLabelText('record-description');
  expect(input).toBeInTheDocument();
  expect(input instanceof HTMLInputElement).toBe(true);
  expect((input as HTMLInputElement).type).toBe('checkbox');
  expect((input as HTMLInputElement).name).toBe('record');
});

test('Expect a slider when record and its maximum are type number and enableSlider is true', async () => {
  const record: IConfigurationPropertyRecordedSchema = {
    id: 'record',
    title: 'record',
    parentId: 'parent.record',
    description: 'record-description',
    type: 'number',
    minimum: 1,
    maximum: 34,
  };
  render(PreferencesRenderingItemFormat, {
    record,
    enableSlider: true,
  });
  const input = screen.getByLabelText('record-description');
  expect(input).toBeInTheDocument();
  expect(input instanceof HTMLInputElement).toBe(true);
  expect((input as HTMLInputElement).type).toBe('range');
  expect((input as HTMLInputElement).name).toBe('record');
});

test('Expect a text input when record is type number and enableSlider is false', async () => {
  const record: IConfigurationPropertyRecordedSchema = {
    id: 'record',
    title: 'record',
    parentId: 'parent.record',
    description: 'record-description',
    type: 'number',
    minimum: 1,
    maximum: 34,
  };
  render(PreferencesRenderingItemFormat, {
    record,
  });
  const input = screen.getByLabelText('record-description');
  expect(input).toBeInTheDocument();
  expect(input instanceof HTMLInputElement).toBe(true);
  expect((input as HTMLInputElement).type).toBe('text');
  expect((input as HTMLInputElement).name).toBe('record');
});

test('Expect an input button with Browse as placeholder when record is type string and format file', async () => {
  const record: IConfigurationPropertyRecordedSchema = {
    title: 'record',
    parentId: 'parent.record',
    placeholder: 'Example: text',
    description: 'record-description',
    type: 'string',
    format: 'file',
  };
  render(PreferencesRenderingItemFormat, {
    record,
  });
  const readOnlyInput = screen.getByLabelText('record-description');
  expect(readOnlyInput).toBeInTheDocument();
  expect(readOnlyInput instanceof HTMLInputElement).toBe(true);
  expect((readOnlyInput as HTMLInputElement).placeholder).toBe(record.placeholder);
  const input = screen.getByLabelText('button-record-description');
  expect(input).toBeInTheDocument();
  expect(input instanceof HTMLInputElement).toBe(true);
  expect((input as HTMLInputElement).placeholder).toBe('Browse ...');
});

test('Expect a select when record is type string and has enum values', async () => {
  const record: IConfigurationPropertyRecordedSchema = {
    id: 'record',
    title: 'record',
    parentId: 'parent.record',
    description: 'record-description',
    type: 'string',
    enum: ['first', 'second'],
  };
  render(PreferencesRenderingItemFormat, {
    record,
  });
  const input = screen.getByLabelText('record-description');
  expect(input).toBeInTheDocument();
  expect(input instanceof HTMLSelectElement).toBe(true);
  expect((input as HTMLSelectElement).name).toBe('record');
});

test('Expect a text input when record is type string', async () => {
  const record: IConfigurationPropertyRecordedSchema = {
    id: 'record',
    title: 'record',
    parentId: 'parent.record',
    description: 'record-description',
    placeholder: 'Example: text',
    type: 'string',
  };
  render(PreferencesRenderingItemFormat, {
    record,
  });
  const input = screen.getByLabelText('record-description');
  expect(input).toBeInTheDocument();
  expect(input instanceof HTMLInputElement).toBe(true);
  expect((input as HTMLInputElement).type).toBe('text');
  expect((input as HTMLSelectElement).name).toBe('record');
  expect((input as HTMLInputElement).placeholder).toBe(record.placeholder);
});

test('Expect tooltip text shows info when input is less than minimum', async () => {
  const record: IConfigurationPropertyRecordedSchema = {
    id: 'record',
    title: 'record',
    parentId: 'parent.record',
    description: 'record-description',
    type: 'number',
    minimum: 1,
    maximum: 34,
  };
  render(PreferencesRenderingItemFormat, {
    record,
  });
  const input = screen.getByLabelText('record-description');
  await userEvent.click(input);
  await userEvent.clear(input);
  await userEvent.keyboard('0');
  const tooltip = screen.getByLabelText('tooltip');
  expect(tooltip).toBeInTheDocument();
  expect(tooltip.textContent).toBe('The value cannot be less than 1');
});

test('Expect tooltip text shows info when input is empty', async () => {
  const record: IConfigurationPropertyRecordedSchema = {
    id: 'record',
    title: 'record',
    parentId: 'parent.record',
    description: 'record-description',
    type: 'number',
    minimum: 1,
    maximum: 34,
  };
  render(PreferencesRenderingItemFormat, {
    record,
  });
  const input = screen.getByLabelText('record-description');
  await userEvent.click(input);
  await userEvent.clear(input);
  await userEvent.keyboard('40');
  const tooltip = screen.getByLabelText('tooltip');
  expect(tooltip).toBeInTheDocument();
  expect(tooltip.textContent).toBe('The value cannot be greater than 34');
});
