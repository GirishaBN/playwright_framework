import { Page } from "@playwright/test";
import { HeaderComponent } from "../components/HeaderComponent";

export class BasePage{
protected readonly page:Page;
protected readonly header:HeaderComponent;
constructor(page:Page){
    this.page=page;
    this.header=new HeaderComponent(page);
}
}