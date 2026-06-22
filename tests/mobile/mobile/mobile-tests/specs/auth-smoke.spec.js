const { test, expect } = require("../fixtures/mobile.fixture");
const selectors = require("../support/selectors");

async function waitForElement(driver, selector, timeout = 20000) {
  const element = await driver.$(selector);
  await element.waitForDisplayed({ timeout });
  return element;
}

test.describe("Auth smoke tests", () => {
  test("renders login controls and accepts input", async ({ driver }) => {
    await waitForElement(driver, selectors.authScreen);

    const emailInput = await waitForElement(driver, selectors.loginEmailInput);
    const passwordInput = await waitForElement(driver, selectors.loginPasswordInput);
    const submitButton = await waitForElement(driver, selectors.loginSubmitButton);

    await emailInput.setValue("alice@flashguard.local");
    await passwordInput.setValue("offline-demo");

    await expect(await submitButton.isDisplayed()).toBeTruthy();
  });

  test("navigates to signup and back to login", async ({ driver }) => {
    const signupLink = await waitForElement(driver, selectors.goToSignupLink);
    await signupLink.click();

    const signupTitle = await waitForElement(driver, selectors.signupScreenTitle);
    await expect(await signupTitle.isDisplayed()).toBeTruthy();

    const backButton = await waitForElement(driver, selectors.signupBackToLoginButton);
    await backButton.click();

    const emailInput = await waitForElement(driver, selectors.loginEmailInput);
    await expect(await emailInput.isDisplayed()).toBeTruthy();
  });
});
