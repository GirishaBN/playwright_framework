import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Routes } from "../../constants/routes";

export class LoginPage extends BasePage {
    private readonly email: Locator;
    private readonly password: Locator;
    private readonly loginbutton: Locator;
    private readonly forgottonPassword: Locator;
    private readonly loginErrorMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.email = page.getByRole('textbox', { name: 'E-Mail Address' });
        this.password = page.getByRole('textbox', { name: 'Password' });
        this.loginbutton = page.getByRole('button', { name: 'Login' });
        this.forgottonPassword = page.getByRole('link', { name: 'Forgotten Password' }).first();
        this.loginErrorMessage=page.locator('div.alert-dismissible');
    }
    async goToLoginPage(): Promise<void> {
        await this.page.goto(Routes.LOGIN);
    };
    async getLoginPageTitle(): Promise<string> {
        return await this.page.title();
    };
    async isForgotPasswordLinkExistsOrNot(): Promise<boolean> {
        return this.forgottonPassword.isVisible();
    };
    async doLogin(userName: string, password: string) {
        console.log(`user name: ${userName} and password: ${password}`);
        await this.email.fill(userName);
        await this.password.fill(password);
        await this.loginbutton.click();
    }
    async isInvalidErrorMessageDisplayed() {
        return await this.loginErrorMessage.isVisible();
    }
}