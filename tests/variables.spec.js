const { test, expect } = require("@playwright/test");
const { HomePage } = require("../pages/homePage");
require("dotenv").config();

const env = process.env.ENVIRONMENT;
// const locale = process.env.LOCALE;
const realm = process.env.REALM;

test(`Testvars env in ${env}  and ${realm}`, async ({ page }) => {
  const envvarTest = process.env.S3_BUCKET;
  console.log("envvarTest", envvarTest);
  const homePage = new HomePage(page);
  await homePage.envTest(envvarTest);
});
