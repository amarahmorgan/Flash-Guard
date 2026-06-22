import { test, expect } from '../fixtures/mobile.fixture';
import { selectors } from '../support/selectors';

async function waitForElement(driver: any, selector: string, timeout = 20_000) {
  const element = await driver.$(selector);
  await element.waitForDisplayed({ timeout });
  return element;
}

test.describe('Auth smoke tests', () => {
  test('renders login controls and accepts input', async ({ driver }) => {
    await waitForElement(driver, selectors.authScreen);

    const emailInput = await waitForElement(driver, selectors.loginEmailInput);
    const passwordInput = await waitForElement(driver, selectors.loginPasswordInput);
    const submitButton = await waitForElement(driver, selectors.loginSubmitButton);

    await emailInput.setValue('alice@flashguard.local');
    await passwordInput.setValue('offline-demo');

    await expect(submitButton).toBeDisplayed();
  });

  test('navigates to signup and back to login', async ({ driver }) => {
    const signupLink = await waitForElement(driver, selectors.goToSignupLink);
    await signupLink.click();

    const signupTitle = await waitForElement(driver, selectors.signupScreenTitle);
    await expect(signupTitle).toBeDisplayed();

    const backButton = await waitForElement(driver, selectors.signupBackToLoginButton);
    await backButton.click();

    const emailInput = await waitForElement(driver, selectors.loginEmailInput);
    await expect(emailInput).toBeDisplayed();
  });
});
