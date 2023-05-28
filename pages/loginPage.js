// homePage.js
const { expect } = require('@playwright/test');

exports.LoginPage = class LoginPage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        // this.getStartedLink = page.locator('text=CONNECT');
        // this.myLvBtn = page.getByText('text=MyLv');
        this.loginFormPageTitle = page.locator('h2', { hasText: 'WELCOME BACK' });
        // this.myAccountPage = page.locator('h1', { hasText: 'MY ACCOUNT' });
        this.myAccountPage = page.getByRole('heading', { name: 'MY PROFILE' });
        // this.loginInput = page.locator()

    }

    async goToLoginForm() {
        console.log('test OK');
        // await this.page.getByText('text=MyLV').click();
        await expect(this.page.getByRole('button', { name: 'MyLV' })).toBeVisible({timeout: 500})
        await this.page.getByRole('button', { name: 'MyLV' }).click();
        await expect(this.page.getByRole('heading', { name: 'WELCOME BACK' })).toBeVisible({ timeout: 8000 });
        // await expect(this.loginFormPageTitle).toBeVisible();
    }

    async fillCredentials() {
        console.log('enter to login form with success >>>>>>> OK!');
        await this.page.getByLabel('Login*').fill('maelle.daniel.ext+16@louisvuitton.com');
        await this.page.getByLabel('Password*').fill('Azerty2!');
        await this.page.getByRole('button', { hasText: 'Sign in' }).click();
    }

    async successLoginCheck() {
        // await expect(this.myAccountPage).toBeVisible({ timeout: 5000 });
        await expect(this.page.getByRole('heading', { hasText: 'PERSONAL INFORMATION' })).toBeVisible({ timeout: 60000 });
        // await expect(this.page.getByText('My Profile')).toBeVisible({ timeout: 5000 });
    }

}