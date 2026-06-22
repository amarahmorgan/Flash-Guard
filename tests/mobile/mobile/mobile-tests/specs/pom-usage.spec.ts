import { test, expect } from '../fixtures/mobile.fixture';
import { LoginPage } from '../pom/login.page';
import { BottomNavPage } from '../pom/bottomnav.page';

async function waitForElement(driver: any, selector: string, timeout = 20_000) {
  const element = await driver.$(selector);
  await element.waitForDisplayed({ timeout });
  return element;
}

test.describe('POM usage examples', () => {
  test('login via POM and open history', async ({ driver }) => {
    const login = new LoginPage(driver);
    await login.waitForShown();

    await login.enterEmail('alice@flashguard.local');
    await login.enterPassword('offline-demo');
    await login.submit();

    const bottom = new BottomNavPage(driver);
    await bottom.openHistory();

    const historyTitle = await waitForElement(driver, '~history-screen-title');
    await expect(historyTitle).toBeDisplayed();
  });
});
