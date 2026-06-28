import { Page } from "@playwright/test";
import { SearchComponent } from "./SearchComponent";

export class HeaderComponent
{
readonly search:SearchComponent;
constructor(page:Page)
{
    this.search=new SearchComponent(page);
}

}