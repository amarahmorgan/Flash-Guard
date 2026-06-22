# Appium + Playwright (Android) for this app

This setup uses:
- Appium to automate the React Native app on Android.
- Playwright Test as the runner, reporter, retries, and assertions.
- WebdriverIO client as the WebDriver bridge to Appium.

## 1) Install dependencies

```bash
npm install
```

TypeScript-specific tooling:

```bash
npm run e2e:typecheck
```

## 2) Install Appium Android driver once

```bash
npx appium driver install uiautomator2
```

## 3) Build and launch the app on emulator/device

```bash
npm run android
```

## 4) Start Appium server

```bash
npm run e2e:appium:start
```

## 5) Run smoke tests

```bash
npm run e2e:test:android
```

This uses `e2e/playwright.appium.config.ts` and matches only `*.spec.ts` files.

## Optional: run live sign-in navigation flow

This requires your backend to be reachable from the emulator.

```bash
set E2E_LIVE_LOGIN=1
npm run e2e:test:android
```

You can override login values:

```bash
set E2E_LOGIN_EMAIL=alice@flashguard.local
set E2E_LOGIN_PASSWORD=offline-demo
```

## Troubleshooting

```bash
npm run e2e:doctor
```

If ADB cannot find a device:
- Start an emulator from Android Studio Device Manager.
- Or connect a real Android phone with USB debugging enabled.
