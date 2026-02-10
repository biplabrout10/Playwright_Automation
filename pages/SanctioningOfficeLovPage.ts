import { Page, Locator, BrowserContext, expect } from "@playwright/test"
import { Context } from "vm";

export class SanctioningOfficeLovPage{
    private readonly page: Page;
    private readonly OfficeCodeSearchField: Locator;
    private readonly OfficeCodeSearchButton: Locator;
    private readonly FirstOffice: Locator;
    private readonly SelectOffice: Locator;


    constructor(page: Page) {
        this.page = page;
        const topframe = this.page.frameLocator('#topFrame');
        const bodyframe = this.page.frameLocator('#bodyFrame');
        const buttonframe = this.page.frameLocator('#bottomFrame');
        this.OfficeCodeSearchField=topframe.locator('#txtSearch');
        this.OfficeCodeSearchButton=topframe.locator('#btnsubmit');
        this.FirstOffice=bodyframe.locator('#row0');
        this.SelectOffice=buttonframe.locator('#select');

    }

    async ChooseSanctioningOffice(){
        await this.OfficeCodeSearchField.fill('%12');
        await this.OfficeCodeSearchButton.click();
        await this.page.waitForTimeout(3000);
        await this.FirstOffice.click();
        await this.SelectOffice.click();
    }

}