import { createBdd } from 'playwright-bdd';
import { test } from '../fixtures/mobile.fixture';

const { When, Then } = createBdd(test);

When('I perform a mobile swipe gesture', async ({ gesturePage }) => {
  await gesturePage.performSwipeGesture();
});

When('I perform a mobile long press gesture', async ({ gesturePage }) => {
  await gesturePage.performLongPressGesture();
});

When('I rotate the mobile device landscape and portrait', async ({ gesturePage }) => {
  await gesturePage.rotateLandscapeThenPortrait();
});

Then('the mobile device should return to portrait mode', async ({ gesturePage }) => {
  await gesturePage.expectPortraitOrientation();
});

When('I check the mobile device size', async ({ gesturePage }) => {
  await gesturePage.expectDeviceSizeAvailable();
});

Then('the mobile device dimensions should be available', async ({ gesturePage }) => {
  await gesturePage.expectDeviceSizeAvailable();
});
