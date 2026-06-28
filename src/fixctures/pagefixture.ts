/* import {test as base} from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";


type pageFixture={
    loginPage:LoginPage;
    homePage:HomePage;
    registerPage:RegisterPage;
    testData:Record<string,string>;
}

export const test=base.extend<pageFixture>({
    loginPage:async({page},use)=>{
        let loginPage1=new LoginPage(page);
        use(loginPage1);
    }
}); */