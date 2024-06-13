const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/homePage');

test('Get Started table of contents', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await expect(homePage.locator("h1")).toBeVisible();

});