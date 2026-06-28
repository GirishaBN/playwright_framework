import { Locator, Page } from "@playwright/test";

export class SearchComponent {
    private readonly searchBox: Locator;
    private readonly searchButton: Locator;

    constructor(page: Page) {
        this.searchBox = page.getByRole('textbox', { name: 'Search' });
        this.searchButton = page.locator('div#search button')
    }

    async doSearch(searchKey: string): Promise<void> {
        await this.searchBox.fill(searchKey);
        await this.searchButton.click();
    }
}