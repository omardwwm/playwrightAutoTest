const { test } = require("@playwright/test");
const { HomePage } = require("../pages/homePage");
// const { loadConfig } = require("../utils/loadConfig");

const env = process.env.ENVIRONMENT;
// const locale = process.env.LOCALE;
const realm = process.env.REALM;

test(`Test failed results in ${env}  and ${realm}`, async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.failedTest();
});
