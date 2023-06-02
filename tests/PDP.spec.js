const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/homePage');
const { PDPPage } = require('../pages/PDPPage');

// 1- add a login failure test
// 2- Refcartor this part to use goToLoginForm and fillCredentials as before each test (loginSuccess and loginFalilure)



// test.beforeEach(async ({ page }) => {
//     const homePage = new HomePage(page);
//     await homePage.goto();
//     // await homePage.getStarted();
//     // const loginPage = new LoginPage(page);
//     // await loginPage.goToLoginForm();
// });


test('Login Success', async ({ page }) => {
    const homePage = new HomePage(page);
    const pdpPage = new PDPPage(page);
    await homePage.goto();
    // await homePage.getStarted();
    await homePage.isCurrentEnvT1();
    await homePage.switchToT1Env();
    await pdpPage.goSerchProduct();
    await pdpPage.fillSkuId();
    await pdpPage.executeSearchProduct();
    await pdpPage.goToProductPage();
});