const { test } = require("@playwright/test");
const { HomePage } = require("../pages/homePage");

const env = process.env.ENVIRONMENT;
// const locale = process.env.LOCALE;
const realm = process.env.REALM;

test(`GO HOME PAGE OK in ${env}  and ${realm}`, async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.checkH1HeadingOK();
});
