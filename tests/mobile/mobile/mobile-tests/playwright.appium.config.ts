import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './specs',
  testMatch: '**/*.spec.ts',
  timeout: 120_000,
  expect: {
    timeout: 15_000,
  },
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report-mobile' }],
  ],
  use: {
    trace: 'on-first-retry',
  },
});
