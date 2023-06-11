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
        setTimeout(async () => {
            await expect(this.page.getByRole('button', { name: 'MyLV' })).toBeVisible()
        }, 500);
        await this.page.getByRole('button', { name: 'MyLV' }).click();
        setTimeout(async () => {
            await expect(this.page.getByRole('heading', { name: 'WELCOME BACK' })).toBeVisible();

        }, 1000);
        // await expect(this.page.getByText('p', { name: 'Sign in with your email address and your password' })).toBeVisible({ timeout: 10000 });
        // Sign in with your email address and your password
        // await expect(this.loginFormPageTitle).toBeVisible();
    }

    async fillCredentials(email, password) {
        console.log('enter to login form with success >>>>>>> OK!');
        await expect(this.page.getByLabel('Login*')).toBeVisible();
        setTimeout(async () => {
            await this.page.getByLabel('Login*').fill(email);
            await this.page.getByLabel('Password*').fill(password);
        }, 750);
        setTimeout(async () => {
            await this.page.getByRole('button', { hasText: 'Sign in' }).click();
        }, 500);
    }

    async successLoginCheck() {
        // await expect(this.myAccountPage).toBeVisible({ timeout: 5000 });
        console.log('Enter to "successLoginCheck" Function');
        setTimeout(async () => {
            await expect(this.page.getByRole('heading', { hasText: 'PERSONAL INFORMATION' })).toBeVisible();
        }, 500);
        console.log('Out from "successLoginCheck" Function');
        // await expect(this.page.getByText('My Profile')).toBeVisible({ timeout: 5000 });
    }

}