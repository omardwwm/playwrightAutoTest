const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/homePage');

test('Get Started table of contents', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    // await homePage.getStarted();
    await homePage.isCurrentEnvT1();
    await homePage.switchToT1Env();
});