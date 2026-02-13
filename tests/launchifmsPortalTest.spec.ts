import { test, expect, Page } from "@playwright/test";
import { TestConfig } from "../test.config";
import { PortalPage } from "../pages/PortalPage";


let config: TestConfig;



test("Launch Ifms portal", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    config = new TestConfig();
    await page.goto(config.prodPortalUrl);
    const ifmsportalpage=new PortalPage(page,context);
    await ifmsportalpage.closeModalPopup();
    
});



