const { test, expect } = require("../fixtures/mobile.fixture");
const LoginPage = require("../pom/login.page");
const BottomNavPage = require("../pom/bottomnav.page");

async function waitForElement(driver, selector, timeout = 20000) {
  const element = await driver.$(selector);
  await element.waitForDisplayed({ timeout });
  return element;
}

test.describe("POM usage examples", () => {
  test("login via POM and open history", async ({ driver }) => {
    const login = new LoginPage(driver);
    await login.waitForShown();

    await login.enterEmail("alice@flashguard.local");
    await login.enterPassword("offline-demo");
    await login.submit();

    const bottom = new BottomNavPage(driver);
    await bottom.openHistory();

    const historyTitle = await waitForElement(driver, "~history-screen-title");
    await expect(await historyTitle.isDisplayed()).toBeTruthy();
  });
});
