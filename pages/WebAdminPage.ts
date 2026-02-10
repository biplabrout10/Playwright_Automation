import { Page, Locator, BrowserContext, expect } from "@playwright/test"
import { Context } from "vm";

import { PortalPage } from "./PortalPage";
import { IfmsHomePage } from "./IfmsHomePage";

export class WebAdminPage {
    private readonly page: Page;
    private readonly AdministrationButton: Locator;
    private readonly UserMaasterButton: Locator;



    constructor(page: Page) {
        this.page = page;
        const Frame = this.page.frameLocator('#mainFrame');
        this.AdministrationButton = page.locator('#i_txt0_0');
        this.UserMaasterButton = page.locator('#i_txt0_1');

    }


    async waitForLoaded(): Promise<void> {
        await expect(this.AdministrationButton).toBeVisible({ timeout: 10000 });
    }
    
    async ClickOnUserMaster(){
        await this.UserMaasterButton.click();
    }



}