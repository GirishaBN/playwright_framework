import {test, expect } from "../src/fixctures/pagefixcture";
import { config } from "../config/env";

test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLoginPage();
    await loginPage.doLogin(config.username, config.password);
});

test('HomePage Title test', async ({homePage }) => {
    let homePageTitle = await homePage.getHomePageTitle();
    expect(homePageTitle).toBe('My Account');

});
test('Logout Link Exists Or Not test', async ({homePage }) => {
    expect(await homePage.isLogoutLinkExists()).toBeTruthy();
})

test('Header Exists Test', async ({homePage }) => {
    let allHeaders = await homePage.getHomePageHeaders();
    console.log(allHeaders);
    expect.soft(allHeaders).toHaveLength(4);
    expect.soft(allHeaders).toEqual(["My Account", "My Orders", "My Affiliate Account", "Newsletter"]);
})

