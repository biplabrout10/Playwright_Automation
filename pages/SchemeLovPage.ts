import { Page, Locator, BrowserContext, expect } from "@playwright/test"
import { Context } from "vm";

export class SchemeLovPage {
    private readonly page: Page;
    // private readonly TopFrame: Locator;
    // private readonly BodyFrame: Locator;
    // private readonly ButtonFrame: Locator;
    private readonly SchemeIdSearchField: Locator;
    private readonly SchemeIdSearchButton: Locator;
    private readonly FirstScheme: Locator;
    private readonly SelectScheme: Locator;
    

    constructor(page: Page) {
        this.page = page;
        const topframe=this.page.frameLocator('#topFrame');
        const bodyframe=this.page.frameLocator('#bodyFrame');
        const buttonframe=this.page.frameLocator('#bottomFrame');
        this.SchemeIdSearchField=topframe.locator('#txtSearch');
        this.SchemeIdSearchButton=topframe.locator('#btnsubmit');
        this.FirstScheme=bodyframe.locator('#row0');
        this.SelectScheme=buttonframe.locator('#select');


    }

    async ChooseScheme(id:string){
        await this.SchemeIdSearchField.fill(id);
        await this.SchemeIdSearchButton.click();
        await this.FirstScheme.click();
        await this.SelectScheme.click();

    }
    async ChooseFirstScheme(){
        await this.SchemeIdSearchField.fill('%1');
        await this.SchemeIdSearchButton.click();
        await this.FirstScheme.click();
        await this.SelectScheme.click();

    }





}