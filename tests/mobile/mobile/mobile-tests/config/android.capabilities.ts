const capabilities = {
  platformName: 'Android',

  'appium:automationName': 'UiAutomator2',

  // Your adb output showed emulator-5554, so use that.
  'appium:deviceName': process.env.APPIUM_DEVICE_NAME || 'emulator-5554',

  // Keep the current app state.
  // This is important because your app is already open/logged in from Android Studio.
  'appium:noReset': true,
  'appium:dontStopAppOnReset': true,

  // Do NOT force Appium to start MainActivity.
  // This avoids the "Activity class does not exist" error.
  'appium:autoLaunch': false,

  'appium:newCommandTimeout': 120
};

export default capabilities;
