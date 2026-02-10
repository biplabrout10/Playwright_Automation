import { Page, Locator, BrowserContext, expect } from "@playwright/test"
import { Context } from "vm";

import { PortalPage } from "./PortalPage";
import { IfmsHomePage } from "./IfmsHomePage";

export class WebbillPage {
    private readonly page: Page;
    private readonly OnlineBillButton: Locator;



    constructor(page: Page) {
        this.page = page;
        const Frame = this.page.frameLocator('#mainFrame');
        this.OnlineBillButton = Frame.locator('#i_txt0_0');
    }


    async waitForLoaded(): Promise<void> {
        await expect(this.OnlineBillButton).toBeVisible({ timeout: 10000 });
    }


}