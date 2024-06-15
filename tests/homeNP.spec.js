const { test, expect } = require("@playwright/test");
const { HomePage } = require("../pages/homePage");

const env = process.env.ENVIRONMENT;
// const locale = process.env.LOCALE;
const realm = process.env.REALM;

test(`Go home page KO in ${env}  and ${realm}`, async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.checkH1HeadingKO();
});
