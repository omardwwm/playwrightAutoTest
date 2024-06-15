const { test } = require("@playwright/test");
const { HomePage } = require("../pages/homePage");

test("GO HOME PAGE OK", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.checkH1HeadingOK();
});
