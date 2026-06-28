import test, { expect } from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage";
import { HomePage } from "../src/pages/HomePage";
import { config } from "../config/env";
let loginPage: LoginPage;
let homePage: HomePage;
test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goToLoginPage();
    homePage = new HomePage(page);
}
)

test('Login page title test', async ({ }) => {
    const pageTitle = await loginPage.getLoginPageTitle();
    expect(pageTitle).toBe('Account Login');
})
test('forgot password test', async ({ }) => {
    expect(await loginPage.isForgotPasswordLinkExistsOrNot()).toBeTruthy();
})

test('User is able to login to application test', async ({ }) => {
    await loginPage.doLogin(config.username, config.password);
    expect.soft(await homePage.isLogoutLinkExists()).toBeTruthy;
    expect.soft(await homePage.getHomePageTitle()).toBe('My Account');
    
})
