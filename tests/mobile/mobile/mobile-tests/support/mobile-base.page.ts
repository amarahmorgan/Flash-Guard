import fs from 'node:fs';
import path from 'node:path';
import type { SelectorList } from './selectors';

export class MobileBasePage {
  constructor(protected driver: WebdriverIO.Browser) {}

  async isVisible(selector: string, timeout = 2000): Promise<boolean> {
    try {
      const element = await this.driver.$(selector);
      await element.waitForDisplayed({ timeout });
      return true;
    } catch {
      return false;
    }
  }

  async isAnyVisible(selectors: string[], timeout = 1500): Promise<boolean> {
    for (const selector of selectors) {
      if (await this.isVisible(selector, timeout)) {
        return true;
      }
    }

    return false;
  }

  async tapIfVisible(selector: string, timeout = 2000): Promise<boolean> {
    try {
      const element = await this.driver.$(selector);
      await element.waitForDisplayed({ timeout });
      await element.click();
      return true;
    } catch {
      console.warn(`[MOBILE KNOWN ISSUE] Could not tap selector: ${selector}`);
      return false;
    }
  }

  async tapFirstVisible(selectors: string[], timeout = 1500): Promise<boolean> {
    for (const selector of selectors) {
      const didTap = await this.tapIfVisible(selector, timeout);

      if (didTap) {
        return true;
      }
    }

    console.warn(
      `[MOBILE KNOWN ISSUE] None of these selectors were clickable: ${selectors.join(', ')}`
    );

    return false;
  }

  async setValueIfVisible(
    selector: string,
    value: string,
    timeout = 2000
  ): Promise<boolean> {
    try {
      const element = await this.driver.$(selector);
      await element.waitForDisplayed({ timeout });
      await element.setValue(value);
      return true;
    } catch {
      console.warn(`[MOBILE KNOWN ISSUE] Could not set value for selector: ${selector}`);
      return false;
    }
  }

  async expectVisibleOrKnownIssue(
    selector: string,
    knownIssueMessage: string,
    timeout = 2000
  ): Promise<boolean> {
    try {
      const element = await this.driver.$(selector);
      await element.waitForDisplayed({ timeout });

      console.log(`[MOBILE] Element visible: ${selector}`);
      return true;
    } catch {
      console.warn(`[MOBILE KNOWN ISSUE] ${knownIssueMessage}`);
      console.warn(`[MOBILE KNOWN ISSUE] Missing selector: ${selector}`);

      await this.saveScreenshotSafe('known-issue-missing-element');

      return false;
    }
  }

  async expectAnyVisibleOrKnownIssue(
    selectors: string[],
    knownIssueMessage: string,
    timeout = 2000
  ): Promise<boolean> {
    for (const selector of selectors) {
      if (await this.isVisible(selector, timeout)) {
        console.log(`[MOBILE] Element visible: ${selector}`);
        return true;
      }
    }

    console.warn(`[MOBILE KNOWN ISSUE] ${knownIssueMessage}`);
    console.warn(`[MOBILE KNOWN ISSUE] Missing selectors: ${selectors.join(', ')}`);

    await this.saveScreenshotSafe('known-issue-missing-any-element');

    return false;
  }

  async logPageSource(label: string): Promise<void> {
    try {
      const source = await this.driver.getPageSource();
      console.log(`\n[MOBILE PAGE SOURCE - ${label}]`);
      console.log(source.slice(0, 5000));
    } catch (error) {
      console.warn(`[MOBILE DEBUG WARNING] Could not get page source: ${error}`);
    }
  }
    async saveScreenshotSafe(name: string): Promise<string | undefined> {
      try {
        const screenshotDirectory = path.resolve(
          process.cwd(),
          'test-results',
          'mobile-screenshots'
        );

        fs.mkdirSync(screenshotDirectory, { recursive: true });

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

        const filePath = path.join(
          screenshotDirectory,
          `${name}-${timestamp}.png`
        );

        await this.driver.saveScreenshot(filePath);

        console.log(`[MOBILE] Screenshot saved: ${filePath}`);

        return filePath;
      } catch (error) {
        console.warn(
          `[MOBILE SCREENSHOT WARNING] Could not save screenshot: ${error}`
        );

        return undefined;
      }
    }

  protected async saveScreenshot(
    name: string
  ): Promise<string | undefined> {
    return this.saveScreenshotSafe(name);
  }
}