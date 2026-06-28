import { test, expect } from "../src/fixctures/pagefixcture";
import { CsvHelper } from "../utils/CsvHelper";
import { config } from "../config/env";
import { ExcelHelper } from "../utils/ExcelHelper";
import { JsonHelper } from "../utils/JsonHelper";

test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLoginPage();
}
)

test('Login page title test', async ({ loginPage }) => {
    const pageTitle = await loginPage.getLoginPageTitle();
    expect(pageTitle).toBe('Account Login');
})
test('forgot password test', async ({ loginPage }) => {
    expect(await loginPage.isForgotPasswordLinkExistsOrNot()).toBeTruthy();
})

test('User is able to login to application test', async ({ loginPage, homePage }) => {
    await loginPage.doLogin(config.username, config.password);
    expect.soft(await homePage.isLogoutLinkExists()).toBeTruthy;
    expect.soft(await homePage.getHomePageTitle()).toBe('My Account');

})

test('Login to application with invalid credentials with data driven test', async ({ loginPage, testData }) => {
    for (let row of testData) {
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isInvalidErrorMessageDisplayed()).toBeTruthy();
    }

})

let testData = CsvHelper.readCsv('src/data/loginData.csv');
for (let row of testData) {
    test(`Invalid login test with email:${row.username},password:${row.password}`, async ({ loginPage }) => {
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isInvalidErrorMessageDisplayed()).toBeTruthy();
    })

}

let exceltestData = ExcelHelper.readExcel('./src/data/OpenCartTestData.xlsx', 'login');
exceltestData.forEach(exceldata => {
    test(`Invalid login from excel test with email:${exceldata.userName},password:${exceldata.password}`, async ({ loginPage }) => {
        await loginPage.doLogin(exceldata.userName, exceldata.password);
        expect(await loginPage.isInvalidErrorMessageDisplayed()).toBeTruthy();
    })

})

let jsonTestdata = JsonHelper.readJson('src/data/loginData.json');
jsonTestdata.forEach(data => {
    test(`Invalid login from json file email-${data.username} : password-${data.password} `, async ({ loginPage }) => {
        await loginPage.doLogin(data.username, data.password);
        expect(await loginPage.isInvalidErrorMessageDisplayed()).toBeTruthy();
    })
})
