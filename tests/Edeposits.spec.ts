import { test, expect, Page } from "@playwright/test";
import fs from 'fs';

import { PortalPage } from '../pages/PortalPage';
import { IfmsHomePage } from '../pages/IfmsHomePage';
import { eDepositPage } from "../pages/eDepositPage";
import { TestConfig } from "../test.config";
import { SchemeLovPage } from "../pages/SchemeLovPage";

let portalPage: PortalPage;
let ifmshomepage: IfmsHomePage;
let eDepositpage: eDepositPage;
let schemelovpage: SchemeLovPage;
let config: TestConfig;


test.skip("PL operator flow", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    config = new TestConfig();
    await page.goto(config.appUrl);

    portalPage = new PortalPage(page, context);
    ifmshomepage = await portalPage.getIfmsHomePage();
    await ifmshomepage.PerformLogin(config.PLApprover_USER, config.PLApprover_PWD);
    eDepositpage = await ifmshomepage.navigateToeDeposit();
    await eDepositpage.MoveToChequeEntry();
    await eDepositpage.ClickInsertButton();
    await eDepositpage.SelectChequeType();
    schemelovpage = await eDepositpage.openLovPage();
    await schemelovpage.ChooseFirstScheme();
    await eDepositpage.GenerateChequeReferenceNumber(config.amount);
    await eDepositpage.ClickTaskListFirstRow();
    await eDepositpage.EnterBeneficiaryDetails(config.benfAcNo, config.amount);
    await eDepositpage.ApproveCheque();
    await eDepositpage.SubmitCheque();
    await eDepositpage.ShowChequeNumber();

    await page.waitForTimeout(4000);


});
