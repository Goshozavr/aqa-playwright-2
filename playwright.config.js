// @ts-check
import { defineConfig, devices } from "@playwright/test";
import { config as testConfig } from "./config/config.js";

//require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = defineConfig({
  testDir: "./tests",
  //testMatch: "./tests/**/*.spec.js",
  testIgnore: "./tests/**/test.spec.js",
  globalSetup: "./globalSetup.js",
  globalTeardown: "./globalTeardown.js",
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  //forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: testConfig.baseURL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
    actionTimeout: 6000,
    headless: false,
    httpCredentials: testConfig.httpCredentials,
    /*{
      username: process.env.HTTP_CREDENTIALS_USERNAME, //"guest",
      password: process.env.HTTP_CREDENTIALS_PASSWORD, //"welcome2qauto",
    },*/
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "global-setup",
      testMatch: "tests/setup/*.setup.js",
    },
    {
      name: "global-teardown",
      testMatch: "tests/teardown/*.teardown.js",
    },
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
      dependencies: ["global-setup"],
      teardown: "global-teardown",
      testMatch: "/tests/e2e/**/*.spec.js",
    },
    {
      name: "API tests",
      testMatch: "/tests/api/**/*spec.js",
    },
    /*{
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },

    /* Test against mobile viewports. */
    /*{
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "Mobile Safari",
      use: { ...devices["iPhone 12"] },
    },

    /* Test against branded browsers. */
    /*{
      name: "Microsoft Edge",
      use: {
        ...devices["Desktop Edge"],
        channel: "msedge",
      },
    },
    {
      name: "Google Chrome",
      use: {
        ...devices["Desktop Chrome"],
        channel: "chrome",
      },
    },*/
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

export default config;
