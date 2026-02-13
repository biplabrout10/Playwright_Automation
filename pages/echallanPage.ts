import { Page, Locator, BrowserContext, expect } from "@playwright/test"



export class echallanPage{
    private readonly page: Page;
    private readonly OnlineChallanSubmissionText: Locator; 



    constructor(page: Page) {
    this.page = page;
    this.OnlineChallanSubmissionText=page.locator("div[class='col-md-7 col-sm-12'] div:nth-child(1) div:nth-child(1) h4:nth-child(1)");
    }

    async isOnlineChallanSubmissionTextPresent(){
        await expect(this.OnlineChallanSubmissionText).toContainText('Online Challan Submission');
    }
}