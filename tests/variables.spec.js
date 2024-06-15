const { test, expect } = require("@playwright/test");
const { HomePage } = require("../pages/homePage");
require('dotenv').config()

test("Testvars env", async ({ page }) => {
  const envvarTest = process.env.SECRET_KEY;
  console.log("envvarTest", envvarTest);
  const homePage = new HomePage(page);
  await homePage.envTest(envvarTest);
});
