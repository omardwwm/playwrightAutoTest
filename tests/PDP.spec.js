const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/homePage');
const { PDPPage } = require('../pages/PDPPage');
const { LoginPage } = require('../pages/loginPage');

// 1- add a login failure test
// 2- Refcartor this part to use goToLoginForm and fillCredentials as before each test (loginSuccess and loginFalilure)



// test.beforeEach(async ({ page }) => {
//     const homePage = new HomePage(page);
//     await homePage.goto();
//     await homePage.getStarted();
//     const loginPage = new LoginPage(page);
//     await loginPage.goToLoginForm();
// });


test('Login Success', async ({ page }) => {
    const homePage = new HomePage(page);
    const pdpPage = new PDPPage(page);
    // const loginPage = new LoginPage(page);
    await homePage.goto();
    // await homePage.getStarted();
    await homePage.isCurrentEnvT1();
    await homePage.switchToT1Env();
    // await loginPage.goToLoginForm();
    // await loginPage.fillCredentials('maelle.daniel.ext+16@louisvuitton.com', 'Azerty2!');
    // await loginPage.successLoginCheck();
    await pdpPage.goSerchProduct(5000);
    await pdpPage.placeOneProductInCart('LP0001', 'Apogée', 8000, 9000, 4000, 6000);
    // await pdpPage.continueShopping(2000);
    // await pdpPage.goSerchProduct(6000);
    // await pdpPage.placeOneProductInCart('N41414', 'Keepall Bandoulière 55', 5000, 9000, 5000, 6000);
    await pdpPage.goToMyCart(4000);
    await pdpPage.attacheEmailToCart('omar.boudraa.ext@louisvuitton.com');
    await pdpPage.continueCheckout(5000);
    console.log('End of test');

    // await pdpPage.fillSkuId();
    // await pdpPage.executeSearchProduct();
    // await pdpPage.goToProductPage();
    // await pdpPage.placeInCart();
    // await pdpPage.verifyIfAddedOK();
});