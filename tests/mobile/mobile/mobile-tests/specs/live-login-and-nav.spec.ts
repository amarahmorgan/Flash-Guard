import { test, expect } from '../fixtures/mobile.fixture';
import { selectors } from '../support/selectors';

const liveEnabled = process.env.E2E_LIVE_LOGIN === '1';

async function waitForElement(driver: any, selector: string, timeout = 20_000) {
  const element = await driver.$(selector);
  await element.waitForDisplayed({ timeout });
  return element;
}

test.describe('Live backend flow', () => {
  test.skip(!liveEnabled, 'Set E2E_LIVE_LOGIN=1 to run live sign-in navigation test.');

  test('signs in and opens history tab', async ({ driver }) => {
    const email = process.env.E2E_LOGIN_EMAIL || 'alice@flashguard.local';
    const password = process.env.E2E_LOGIN_PASSWORD || 'offline-demo';

    const emailInput = await waitForElement(driver, selectors.loginEmailInput);
    const passwordInput = await waitForElement(driver, selectors.loginPasswordInput);
    const submitButton = await waitForElement(driver, selectors.loginSubmitButton);

    await emailInput.setValue(email);
    await passwordInput.setValue(password);
    await submitButton.click();

    const historyTab = await waitForElement(driver, selectors.bottomTabHistory, 30_000);
    await historyTab.click();

    const historyTitle = await waitForElement(driver, selectors.historyScreenTitle);
    expect(await historyTitle.isDisplayed()).toBe(true);
  });
});
