import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { test as base, expect } from 'playwright-bdd';

import capabilities from '../config/android.capabilities';

import { AirtimePage } from '../pom/airtime.page';
import { DashboardPage } from '../pom/dashboard.page';
import { GesturePage } from '../pom/gesture.page';
import { HistoryPage } from '../pom/history.page';
import { LoginPage } from '../pom/login.page';
import { NavigationPage } from '../pom/navigation.page';
import { NotificationsPage } from '../pom/notifications.page';
import { SettingsPage } from '../pom/settings.page';
import { TransferPage } from '../pom/transfer.page';

const APPIUM_PROTOCOL = process.env.APPIUM_PROTOCOL || 'http';
const APPIUM_HOST = process.env.APPIUM_HOST || '127.0.0.1';
const APPIUM_PORT = Number(process.env.APPIUM_PORT || '4723');
const APPIUM_PATH = process.env.APPIUM_BASE_PATH || '/';

type Driver = any;

type MobileFixtures = {
  driver: Driver;
  loginPage: LoginPage;
  navPage: NavigationPage;
  dashboardPage: DashboardPage;
  transferPage: TransferPage;
  historyPage: HistoryPage;
  airtimePage: AirtimePage;
  notificationsPage: NotificationsPage;
  settingsPage: SettingsPage;
  gesturePage: GesturePage;
};

function configureAndroidEnvironment() {
  const defaultSdk = path.join(os.homedir(), 'AppData', 'Local', 'Android', 'Sdk');
  const sdkRoot = process.env.ANDROID_SDK_ROOT || process.env.ANDROID_HOME || defaultSdk;

  if (fs.existsSync(sdkRoot)) {
    process.env.ANDROID_HOME = process.env.ANDROID_HOME || sdkRoot;
    process.env.ANDROID_SDK_ROOT = process.env.ANDROID_SDK_ROOT || sdkRoot;

    const platformTools = path.join(sdkRoot, 'platform-tools');
    const emulatorTools = path.join(sdkRoot, 'emulator');
    const currentPath = process.env.PATH || '';

    const additions = [platformTools, emulatorTools].filter(
      (p) => fs.existsSync(p) && !currentPath.includes(p)
    );

    if (additions.length) {
      process.env.PATH = `${additions.join(path.delimiter)}${path.delimiter}${currentPath}`;
    }
  }

  return {
    ANDROID_HOME: process.env.ANDROID_HOME,
    ANDROID_SDK_ROOT: process.env.ANDROID_SDK_ROOT,
    PATH: process.env.PATH,
  };
}

function buildAppiumSetupMessage(error: unknown) {
  const env = configureAndroidEnvironment();
  const message = error instanceof Error ? error.message : String(error);

  const common = [
    'Could not create an Appium Android session.',
    '',
    'This happened before the test interacted with mobile elements.',
    'So this is a SETUP / APPIUM SESSION issue, not a POM selector issue yet.',
    '',
    `Detected ANDROID_HOME: ${env.ANDROID_HOME || '(not set)'}`,
    `Detected ANDROID_SDK_ROOT: ${env.ANDROID_SDK_ROOT || '(not set)'}`,
    '',
  ];

  if (message.includes('ANDROID_HOME') || message.includes('ANDROID_SDK_ROOT')) {
    return [
      ...common,
      'Problem: Android SDK environment variables are missing.',
      '',
      'Fix in PowerShell BEFORE starting Appium:',
      '$env:ANDROID_HOME="C:\\Users\\Flash_QE\\AppData\\Local\\Android\\Sdk"',
      '$env:ANDROID_SDK_ROOT=$env:ANDROID_HOME',
      '$env:Path="$env:ANDROID_HOME\\platform-tools;$env:ANDROID_HOME\\emulator;$env:Path"',
      'appium',
      '',
      `Original error: ${message}`,
    ].join('\n');
  }

  if (message.includes('Activity class') || message.includes('does not exist')) {
    return [
      ...common,
      'Problem: Appium is trying to launch an Android activity that does not exist.',
      '',
      'This usually means appPackage/appActivity is wrong.',
      'Because your app is already open in Android Studio, use:',
      '',
      "'appium:autoLaunch': false",
      "'appium:noReset': true",
      "'appium:dontStopAppOnReset': true",
      '',
      'Also remove appPackage and appActivity from android.capabilities.ts for now.',
      '',
      'To check the real current activity, run:',
      '& "C:\\Users\\Flash_QE\\AppData\\Local\\Android\\Sdk\\platform-tools\\adb.exe" shell dumpsys activity activities | findstr "mResumedActivity topResumedActivity"',
      '',
      `Original error: ${message}`,
    ].join('\n');
  }

  if (message.includes('ECONNREFUSED') || message.includes('connect')) {
    return [
      ...common,
      'Problem: Appium server is not reachable.',
      '',
      'Start Appium in a separate terminal:',
      'appium',
      '',
      'Then run the tests in another terminal:',
      'npm run test:mobile:bdd',
      '',
      `Original error: ${message}`,
    ].join('\n');
  }

  return [
    ...common,
    'Problem: Unknown Appium session failure.',
    '',
    'Check that:',
    '1. Android emulator is open',
    '2. FlashGuard app is open on the emulator',
    '3. Appium is running on http://127.0.0.1:4723',
    '4. adb can see emulator-5554',
    '',
    `Original error: ${message}`,
  ].join('\n');
}

export const test = base.extend<MobileFixtures>({
  driver: async ({}, use, testInfo) => {
    configureAndroidEnvironment();

    let driver: Driver | undefined;

    try {
      const { remote } = await import('webdriverio');

      driver = await remote({
        protocol: APPIUM_PROTOCOL,
        hostname: APPIUM_HOST,
        port: APPIUM_PORT,
        path: APPIUM_PATH,
        capabilities,
        connectionRetryCount: 1,
        connectionRetryTimeout: 30_000,
      });

      await use(driver);
    } catch (error) {
      testInfo.annotations.push({
        type: 'mobile-setup-failure',
        description: 'Appium session could not start. Check emulator, Appium server, and app launch capabilities.',
      });

      throw new Error(buildAppiumSetupMessage(error));
    } finally {
      if (driver) {
        try {
          await driver.deleteSession();
        } catch (error) {
          console.warn(`[MOBILE CLEANUP WARNING] Could not delete Appium session: ${error}`);
        }
      }
    }
  },

  loginPage: async ({ driver }, use) => use(new LoginPage(driver)),
  navPage: async ({ driver }, use) => use(new NavigationPage(driver)),
  dashboardPage: async ({ driver }, use) => use(new DashboardPage(driver)),
  transferPage: async ({ driver }, use) => use(new TransferPage(driver)),
  historyPage: async ({ driver }, use) => use(new HistoryPage(driver)),
  airtimePage: async ({ driver }, use) => use(new AirtimePage(driver)),
  notificationsPage: async ({ driver }, use) => use(new NotificationsPage(driver)),
  settingsPage: async ({ driver }, use) => use(new SettingsPage(driver)),
  gesturePage: async ({ driver }, use) => use(new GesturePage(driver)),
});

export { expect };
