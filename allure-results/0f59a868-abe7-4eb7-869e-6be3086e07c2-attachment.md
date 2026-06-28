# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: RegisterPage.spec.ts >> verify user is able to fill the register form test:nagaraju and dc
- Location: tests\RegisterPage.spec.ts:13:1

# Error details

```
Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
Call log:
  - navigating to "opencart/index.php?route=account/register", waiting until "load"

```

# Test source

```ts
  1  | import { Locator, Page } from "@playwright/test";
  2  | import { CsvHelper } from "../../utils/CsvHelper";
  3  | import { BasePage } from "./BasePage";
  4  | import { Routes } from "../../constants/routes";
  5  | 
  6  | export class RegisterPage extends BasePage {
  7  |     private readonly firstName: Locator;
  8  |     private readonly lastName: Locator;
  9  |     private readonly email: Locator;
  10 |     private readonly telephone: Locator;
  11 |     private readonly password: Locator;
  12 |     private readonly confirmPassword: Locator;
  13 |     //private readonly subscribe: Locator;
  14 | 
  15 |     constructor(page: Page) {
  16 |         super(page)
  17 |         this.firstName = page.getByRole('textbox', { name: 'First Name' })
  18 |         this.lastName = page.getByRole('textbox', { name: 'Last Name' })
  19 |         this.email = page.getByRole('textbox', { name: 'E-Mail' })
  20 |         this.telephone = page.getByRole('textbox', { name: 'Telephone' })
  21 |         this.password = page.getByRole('textbox', { name: 'Password' })
  22 |         this.confirmPassword = page.getByRole('textbox', { name: 'Password Confirm' })
  23 |         //this.subscribe = page.getByText('Subscribe')
  24 |     }
  25 |     async gotoRegisterPage():Promise<void>
  26 |     {
> 27 |         await this.page.goto(Routes.REGISTER_PAGE);
     |                         ^ Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
  28 |     }
  29 | 
  30 |     async fillRegisterForm(firstName: string, lastName: string, email: string, telephone: string, password: string, confirmPassword: string, subscribe: string) {
  31 |         await this.firstName.fill(firstName);
  32 |         await this.lastName.fill(lastName);
  33 |         await this.email.fill(email);
  34 |         await this.telephone.fill(telephone);
  35 |         await this.password.fill(password);
  36 |         await this.confirmPassword.fill(confirmPassword);
  37 |         //await this.subscribe.fill(subscribe);
  38 |     }
  39 | }
```