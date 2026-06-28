import { Routes } from "../constants/routes";
import { test } from "../src/fixctures/pagefixcture";
import { CsvHelper } from "../utils/CsvHelper";
import { config } from "../config/env";

test.beforeEach(async ({ registerPage }) => {
    console.log('Base URL:', config.baseUrl);
    console.log('Navigating to:', Routes.REGISTER_PAGE);
    await registerPage.gotoRegisterPage();
}
)
let registerData = CsvHelper.readCsv('src/data/registerData.csv');
registerData.forEach(data => {
    test(`verify user is able to fill the register form test:${data.First_Name} and ${data.Last_Name}`, async ({ registerPage }) => {
        await registerPage.fillRegisterForm(data.First_Name, data.Last_Name, data.EMail, data.Telephone, data.Password, data.Password, data.Subscribe);

    })
})