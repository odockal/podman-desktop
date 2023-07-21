import type { Locator, Page } from 'playwright';
import { PodmanDesktopPage } from './base-page';
import { ImagesPage } from './images-page';

export class PullImagePage extends PodmanDesktopPage {
  readonly heading: Locator;
  readonly pullImageButton: Locator;
  readonly closeLink: Locator;
  readonly backToImagesLink: Locator;
  readonly manageRegistriesButton: Locator;
  readonly imageToPullLabel: Locator;
  readonly imageNameInput: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Pull Image From a Registry' });
    this.pullImageButton = page.getByRole('button', { name: 'Pull image' });
    this.closeLink = page.getByRole('link', { name: 'Close' });
    this.backToImagesLink = page.getByRole('link', { name: 'Go back to Images' });
    this.manageRegistriesButton = page.getByRole('button', { name: 'Manage registries' });
    this.imageToPullLabel = page.getByLabel('Image to Pull');
    this.imageNameInput = page.getByLabel('imageName');
  }

  async pullImage(imageName: string, tag = '', timeout = 10000): Promise<ImagesPage> {
    const fullImageName = `${imageName}${tag.length === 0 ? '' : ':' + tag}`;
    await this.imageNameInput.fill(fullImageName);
    if (await this.pullImageButton.isEnabled()) {
      await this.pullImageButton.click();
    } else {
      throw Error(`Pull image button is not enabled, pulling of '${fullImageName}' failed, verify image name`);
    }
    const doneButton = this.page.getByRole('button', { name: 'Done' });
    await doneButton.waitFor({ state: 'visible', timeout: timeout });
    await doneButton.click();
    return new ImagesPage(this.page);
  }
}
