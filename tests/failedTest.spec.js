const { test } = require("@playwright/test");
const { HomePage } = require("../pages/homePage");
// const { loadConfig } = require("../utils/loadConfig");

const env = process.env.ENVIRONMENT;
const locale = process.env.LOCALE;
const realm = process.env.REALM;

test(`Test failed results for Locale ${locale} in ${env} Einvironment and Realm ${realm}`, async ({ page }) => {
  // const homePage = new HomePage(page);
  // await homePage.failedTest();
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.checkH1HeadingOK();
});
