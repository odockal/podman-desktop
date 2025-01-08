import type { Page } from '@playwright/test';
import { expect as playExpect } from '@playwright/test';

import { ExtensionCatalogCardPage } from '../model/pages/extension-catalog-card-page';
import { ExtensionsPage } from '../model/pages/extensions-page';

export async function installExtensionFromOCIImage(
  page: Page,
  ociImageUrl: string,
  extensionType: string,
  extensionLabel: string,
): Promise<void> {
  const extensionsPage = new ExtensionsPage(page);

  await extensionsPage.installExtensionFromOCIImage(ociImageUrl);
  await extensionsPage.openCatalogTab();
  const extensionCatalog = new ExtensionCatalogCardPage(page, extensionType);
  await playExpect(extensionCatalog.parent).toBeVisible();
  await playExpect.poll(async () => await extensionCatalog.isInstalled()).toBeTruthy();

  await extensionsPage.openInstalledTab();
  await playExpect.poll(async () => await extensionsPage.extensionIsInstalled(extensionLabel)).toBeTruthy();
}
