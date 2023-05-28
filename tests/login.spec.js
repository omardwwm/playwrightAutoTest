const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');
const { HomePage } = require('../pages/homePage');

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
    const loginPage = new LoginPage(page);
    await homePage.goto();
    // await homePage.getStarted();
    await homePage.isCurrentEnvT1();
    await homePage.switchToT1Env();
    await loginPage.goToLoginForm();
    await loginPage.fillCredentials();
    await loginPage.successLoginCheck();
});