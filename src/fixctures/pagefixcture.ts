import { test as base } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage"
import { CsvHelper } from "../../utils/CsvHelper";
import { RegisterPage } from "../pages/RegisterPage";
import { SearchResultsPage } from "../pages/SearchResultsPage";

type pageFixture = {
    loginPage: LoginPage;
    homePage: HomePage;
    testData: Record<string, string>[];
    registerPage: RegisterPage;
    searchResultPage:SearchResultsPage
}
export const test = base.extend<pageFixture>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    testData: async ({ }, use) => {
        await use(CsvHelper.readCsv('src/data/loginData.csv'));
    },
    registerPage: async ({ page }, use) => {
        await use(new RegisterPage(page));
    },
    searchResultPage:async({page},use)=>{
        await use(new SearchResultsPage(page))
    }
});
export { expect } from 'playwright/test';