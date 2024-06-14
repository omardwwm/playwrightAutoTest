const { test, expect } = require("@playwright/test");
const { HomePage } = require("../pages/homePage");

test("Test failed results", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.failedTest();
});
