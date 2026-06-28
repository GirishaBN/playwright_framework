import path from "path";
import { expect, test } from "../src/fixctures/pagefixcture";
import { CsvHelper } from "../utils/CsvHelper";
import { config } from "../config/env";

test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLoginPage();
    await loginPage.doLogin(config.username,config.password);
});

const productData=CsvHelper.readCsv(path.join(process.cwd(),'src','data','product.csv'))
test.describe('Product Search', ()=>{
productData.forEach(prodata=>{
test(`verify search results count for ${prodata.searchKey}-${prodata.productName} test`,async({homePage,searchResultPage})=>{
    await homePage.searchProduct(prodata.searchKey);
    const searchCount =await searchResultPage.getProductSearchResultCount();
    expect(await searchResultPage.getProductSearchResultCount()).toBe(Number(prodata.resultcount));
})


test(`verify user is able to land on the product page:${prodata.productName} test`,async({page,homePage,searchResultPage})=>{
    await homePage.searchProduct(prodata.searchKey);
    await searchResultPage.selectProduct(prodata.productName);
    await expect(page).toHaveTitle(prodata.productName);
})
});
})
