const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./specs",
  timeout: 120000,
  expect: {
    timeout: 15000,
  },
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [
    ["list"],
    ["html", { open: "never", outputFolder: "playwright-report-mobile" }],
  ],
  use: {
    trace: "on-first-retry",
  },
});
