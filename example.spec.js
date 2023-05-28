const { test, expect } = require('@playwright/test');
test('basic test', async ({ page }) => {
    await page.goto('https://me-i3f.louisvuitton.com/eng-ae/homepage?cachebusting=2959570827');
    await page.waitForLoadState('networkidle');
    // const wishlist = page.locator('.lv-header-icon-wishlist__label');
    // const logo = page.locator('h1')
    // await expect(wishlist).toHaveText('Wishlist');
    // const devToolBtn = page.locator('.lv-footer-legal__item');
    // const devToolBtn = page.locator('//*[@id="__layout"]/div/footer/div[6]/div/ul[1]/li[4]/button');
    // const devToolBtn = page.locator('//*[@id="__layout"]/div/footer/div[6]/div/ul[1]/li[4]/button');
    // await expect(devToolBtn).toHaveText('Devtool', { timeout: 45000 });
    // await page.getByRole('button', { name: 'Devtool' }).click({timeout:35000});
    // await page.getByRole('button', { name: 'Devtool' }).waitFor();
    // await page.getByRole('button', { name: 'Devtool' }).click();
    await page.getByRole('button', { name: 'Search' }).waitFor();
    await page.getByRole('button', { name: 'Search' }).click();
    const inputSearchLocator = page.locator('input#searchHeaderInput')
    const placeholderText = await inputSearchLocator.getAttribute('placeholder')
    expect(placeholderText).toEqual('Product, Store…')
    await inputSearchLocator.type("LP0001");
    const resultSearch = page.locator('#header > div.lv-header__predictive > div > div:nth-child(2)')
    await expect(resultSearch).toBeVisible();
    // const testText = await page.textContent("resultSearch:has(div.lv-predictive-products-list__title overline)");
    // console.log(testText);
    // expect (resultSearch).toHaveAttribute('h2.lv-predictive-products-list__title overline', 'PRODUCTS');
    // expect (resultSearch).toHaveAttribute('link', 'See more products');
    // await page.getByRole('link', { name: 'See more products' }).click();
    //*[@id="__layout"]/div/footer/div[6]/div/ul[1]/li[4]/button
    // await expect(BtnDevTool).toBeVisible({ timeout: 40000 })
    // await expect(logo).toHaveClass('lv-logo__wrap');
    // await page.click(BtnDevTool);
    // expect(page.locator('text=DEV TOOL').first()).toBeVisible();
});