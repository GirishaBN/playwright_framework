import test, { expect } from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage";
import { HomePage } from "../src/pages/HomePage";
let loginPage: LoginPage;
let homePage: HomePage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goToLoginPage();
    await loginPage.doLogin('girisha@gmail.com', 'Test@123');
    homePage = new HomePage(page);
});

test('HomePage Title test', async ({ }) => {
    let homePageTitle = await homePage.getHomePageTitle();
    expect(homePageTitle).toBe('My Account');

});
test('Logout Link Exists Or Not test', async ({ }) => {
    expect(await homePage.isLogoutLinkExists()).toBeTruthy();
})

test('Header Exists Test', async ({ }) => {
    let allHeaders = await homePage.getHomePageHeaders();
    console.log(allHeaders);
    expect.soft(allHeaders).toHaveLength(4);
    expect.soft(allHeaders).toEqual(["My Account", "My Orders", "My Affiliate Account", "Newsletter"]);
})
