import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Routes } from "../../constants/routes";

export class RegisterPage extends BasePage {
    private readonly firstName: Locator;
    private readonly lastName: Locator;
    private readonly email: Locator;
    private readonly telephone: Locator;
    private readonly password: Locator;
    private readonly confirmPassword: Locator;

    constructor(page: Page) {
        super(page)
        this.firstName = page.getByRole('textbox', { name: 'First Name' })
        this.lastName = page.getByRole('textbox', { name: 'Last Name' })
        this.email = page.getByRole('textbox', { name: 'E-Mail' })
        this.telephone = page.getByRole('textbox', { name: 'Telephone' })
        this.password = page.getByRole('textbox', { name: '* Password', exact: true })
        this.confirmPassword = page.getByRole('textbox', { name: '* Password Confirm', exact: true })

    }
    async gotoRegisterPage(): Promise<void> {
        await this.page.goto(Routes.REGISTER_PAGE);
    }

    async fillRegisterForm(firstName: string, lastName: string, email: string, telephone: string, password: string, confirmPassword: string, subscribe: string) {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.email.fill(email);
        await this.telephone.fill(telephone);
        await this.password.fill(password);
        await this.page.pause();
        await this.confirmPassword.fill(confirmPassword);
        let subscribevalue = subscribe.toLowerCase() == 'yes' ? '1' : '0';
        await this.page.locator(`input[name='newsletter'][value='${subscribevalue}']`).check();

    }
}