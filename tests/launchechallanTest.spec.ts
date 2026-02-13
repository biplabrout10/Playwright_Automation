import { test, expect, Page } from "@playwright/test";
import { TestConfig } from "../test.config";
import { echallanPage } from "../pages/echallanPage";


let config: TestConfig;
let echallanpage: echallanPage;


test("Launch echallan", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    config = new TestConfig();
    await page.goto(config.echallanUrl);
    echallanpage=new echallanPage(page);
    await echallanpage.isOnlineChallanSubmissionTextPresent();

});