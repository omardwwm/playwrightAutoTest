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
    await pdpPage.placeOneProductInCart('LP0001', 'Apogée');
    await pdpPage.continueShopping();
    await pdpPage.goSerchProduct();
    await pdpPage.placeOneProductInCart('N41414', 'Keepall Bandoulière 55');
    await pdpPage.goToMyCart();
    await pdpPage.attacheEmailToCart('omar.boudraa.Ext+2@louisvuitton.com');
    await pdpPage.continueCheckout();

    // await pdpPage.fillSkuId();
    // await pdpPage.executeSearchProduct();
    // await pdpPage.goToProductPage();
    // await pdpPage.placeInCart();
    // await pdpPage.verifyIfAddedOK();
});