import { PlaywrightTestConfig } from '@playwright/test';

const config = {
    // Timeout
    // timeout: 80000,
    expect: {
        /**
         * Maximum time expect() should wait for the condition to be met.
         * For example in `await expect(locator).toHaveText();`
         */
        timeout: 50000
    },

    // REPORTER 
    reporter: [
        ["line"],
        [
            "allure-playwright",
            {
                detail: true,
                outputFolder: "allure-results",
                suiteTitle: true,
                categories: [
                    {
                        name: "Outdated tests",
                        messageRegex: ".*FileNotFound",
                    },
                ],
                environmentInfo: {
                    framework: "playwright"
                }
            }
        ]
    ],

    use: {
        // Browser options
        headless: true,

        // Context options
        // viewport: { width: 1280, height: 720 },

        // Artifacts
        screenshot: 'only-on-failure',
        trace: 'on',
        video: 'on'
    },
    helpers: {
        Playwright: {
            // ...
            video: true
        }
    },

    projects: [
        {
            name: 'Chrome',
            use: { browserName: 'chromium' },
        }
        // {
        //     name: 'Firefox',
        //     use: { browserName: 'firefox' },
        // },
        // {
        //     name: 'WebKit',
        //     use: { browserName: 'webkit' },
        // },
    ],
};

export default config;