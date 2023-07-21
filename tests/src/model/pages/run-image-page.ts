import type { Locator, Page } from 'playwright';
import { PodmanDesktopPage } from './base-page';
import { ContainersPage } from './containers-page';

export class RunImagePage extends PodmanDesktopPage {
  readonly name: Locator;
  readonly heading: Locator;
  readonly closeLink: Locator;
  readonly backToImageDetailsLink: Locator;
  readonly imageName: string;
  readonly startContainerButton: Locator;

  constructor(page: Page, name: string) {
    super(page);
    this.imageName = name;
    this.name = page.getByLabel('name').and(page.getByText('Run Image'));
    this.heading = page.getByRole('heading', { name: this.imageName });
    this.closeLink = page.getByRole('link', { name: 'Close' });
    this.backToImageDetailsLink = page.getByRole('link', { name: 'Go back to Image Details' });
    this.startContainerButton = page.getByRole('button', { name: 'Start Container' });
  }

  async activateTab(name: string) {
    const tabactive = this.page.getByRole('link', { name: name, exact: true }).and(this.page.getByText(name));
    await tabactive.click();
  }

  async startContainer(customName = ''): Promise<ContainersPage> {
    if (customName !== '') {
      await this.activateTab('Basic');
      // ToDo: improve UI side with aria-labels
      const textbox = this.page.locator('input[type=\'text\'][name=\'modalContainerName\']');
      await textbox.fill(customName);
    }
    await this.startContainerButton.waitFor({ state: 'visible', timeout: 1000 });
    await this.startContainerButton.click();
    return new ContainersPage(this.page);
  }
}
