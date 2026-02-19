import { Page, Locator, BrowserContext, expect } from "@playwright/test"
import { Context } from "vm";

export class SanctionPurposeLovPage{
    private readonly page: Page;
    private readonly FirstPurpose: Locator;
    private readonly SelectPurpose: Locator;


    constructor(page: Page) {
        this.page = page;
        const topframe = this.page.frameLocator('#topFrame');
        const bodyframe = this.page.frameLocator('#bodyFrame');
        const buttonframe = this.page.frameLocator('#bottomFrame');
        this.FirstPurpose=bodyframe.locator('#row0');
        this.SelectPurpose=buttonframe.locator('#select');

    }

    async ChoosePurpose(){
       await this.page.waitForTimeout(2000);
        await this.FirstPurpose.click();
        await this.SelectPurpose.click(); 
    }


 
}