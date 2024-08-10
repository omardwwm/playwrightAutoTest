import { defineConfig } from "@playwright/test";

module.exports = defineConfig({
  // Look for test files in the "tests" directory, relative to this configuration file.
  testDir: "tests",

  // Run all tests in parallel.
  fullyParallel: true,
  // Timeout
  // timeout: 80000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 50000,
  },

  // REPORTER
  reporter: [
    ["line"],
    ["blob"],
    [
      "allure-playwright",
      // ,
      // {
      //     detail: true,
      //     outputFolder: "allure-results",
      //     suiteTitle: true,
      //     categories: [
      //         {
      //             name: "Outdated tests",
      //             messageRegex: ".*FileNotFound",
      //         },
      //     ],
      //     environmentInfo: {
      //         framework: "playwright"
      //     }
      // }
    ],
  ],

  use: {
    // Browser options
    headless: true,

    // Context options
    // viewport: { width: 1280, height: 720 },

    // Artifacts
    screenshot: "only-on-failure",
    trace: "on",
    video: "on",
  },
  helpers: {
    Playwright: {
      // ...
      video: true,
    },
  },

  projects: [
    {
      name: "Chrome",
      use: { browserName: "chromium" },
    },
    // {
    //     name: 'Firefox',
    //     use: { browserName: 'firefox' },
    // },
    // {
    //     name: 'WebKit',
    //     use: { browserName: 'webkit' },
    // },
  ],
});
