import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage
{
    private readonly logOut:Locator;
    private readonly headers:Locator;
    private readonly dummy:number;
    
    constructor(page:Page)
    {
        super(page);
        this.logOut= page.getByRole('link',{name:'Logout'}).first();
        this.headers=page.getByRole('heading',{level:2});
        
    }
    async getHomePageTitle():Promise<string>
    {
        return await this.page.title();
    }
    async isLogoutLinkExists(): Promise<boolean>
    {
        return this.logOut.isVisible();
    }
    async getHomePageHeaders():Promise<String[]>
    {
        return this.headers.allInnerTexts();
    }
    
    async searchProduct(product: string):Promise<void>
    {
        await this.header.search.doSearch(product);
    }
    
}