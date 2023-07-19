import { expect } from '@playwright/test';
import { existsSync } from 'node:fs';
import { rm } from 'node:fs/promises';
import type { Page } from 'playwright';

/**
 * Force remove recursively folder, if exists
 * @param path path to a folder to be force removed recursively
 */
export async function removeFolderIfExists(path: string) {
  if (existsSync(path)) {
    console.log(`Cleaning up folder: ${path}`);
    await rm(path, { recursive: true, force: true });
  }
}

/**
 * Waits for application to initialize, turn off telemetry and handle welcome page
 * @param page playwright page object of the electron application
 */
export async function handleWelomePage(page: Page) {
  // wait for an application to initialize
  const checkLoader = page.getByRole('heading', { name: 'Initializing...' });
  await expect(checkLoader).toHaveCount(0, { timeout: 5000 });

  // handle welcome page
  if ((await page.getByRole('button', { name: 'Go to Podman Desktop' }).count()) > 0) {
    const telemetryConsent = page.getByText('Telemetry');
    if (await telemetryConsent.isChecked()) {
      await telemetryConsent.click();
    }
    await page.getByRole('button', { name: 'Go to Podman Desktop' }).click();
  }
}
