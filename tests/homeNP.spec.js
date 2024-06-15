const { test, expect } = require("@playwright/test");
const { HomePage } = require("../pages/homePage");

test("Go home page KO", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.checkH1HeadingKO();
});
