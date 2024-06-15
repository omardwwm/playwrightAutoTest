const { test } = require("@playwright/test");
const { HomePage } = require("../pages/homePage");
// const { loadConfig } = require("../utils/loadConfig");

test("Test failed results", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.failedTest();
});
