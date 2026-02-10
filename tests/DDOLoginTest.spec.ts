import { test, expect, chromium } from "@playwright/test";
import { PortalPage } from '../pages/PortalPage';
import { IfmsHomePage } from '../pages/IfmsHomePage';
import { WebAdminPage } from "../pages/WebAdminPage";
import { esbmsPage } from "../pages/esbmsPage";


import { TestConfig } from "../test.config";
import { SanctionOrderPage } from "../pages/SanctionOrderPage";
import { SanctioningDepartmentLovPage } from "../pages/SanctioningDepartmentLovPage";
let ifmshomepage: IfmsHomePage;


test('Verify DDO Login', async ({}) => {
    const browser=await chromium.launch();
    const context = await browser.newContext();
    const context1=await browser.newContext();
    const page = await context.newPage();
    const config = new TestConfig();
    await page.goto(config.appUrl);
    const portalPage = new PortalPage(page, context);
    ifmshomepage = await portalPage.getIfmsHomePage();
    await ifmshomepage.PerformLogin(config.SANC_OPR_USER, config.SANC_OPR_PWD);
    await ifmshomepage.ShowApplicationList(); 
    // await ifmshomepage.navigateToOnlineBillSubmission();
    // const webadminpage=await ifmshomepage.navigateToAdministration();
    // await webadminpage.ClickOnUserMaster();
    // const eDepositpage=await ifmshomepage.navigateToeDeposit();
    // await eDepositpage.ClickPlDepositTab();
    // const esbmspage = await ifmshomepage.navigateToSchemePaymentSystem();
    // await esbmspage.SwitchToJitFs();
    const sanctionpage = await ifmshomepage.navigateToSanctionOrderDatabase();
    await sanctionpage.ClickOnSanctionOrderButton();
    await sanctionpage.EnterFileNumber();
    //await page.waitForTimeout(3000);
    // await sanctionpage.ClickSanctionLogout();
    // await page.close();
    // const page1 = await context.newPage();
    // const esbms = new esbmsPage(page1);
    // await page1.goto(config.esbmsUrl);
    // await esbms.LoginToesbms(config.DDO1_USER, config.DDO1_PWD);
    //await esbms.SwitchToJitFs();
    //await esbms.GenerateSnaSparshVirtualAllotment('202514879329');
    await sanctionpage.SelectEmployeeType();
    await sanctionpage.SelectSanctionType();
    await sanctionpage.SelectSanctionSubType();
    const sancdeplovpage = await sanctionpage.openSancDepLovPage();
    await sancdeplovpage.ChooseDepartment();
    // await sanctionpage.SelectSanctionAuthorityLevel();
    // const sanctioningofc=await sanctionpage.openSancOfcLovPage();
    // await sanctioningofc.ChooseSanctioningOffice();
    //const sanctionpurpose=await sanctionpage.openSancPurposeLovPage();
    // await sanctionpurpose.ChoosePurpose();
    // await sanctionpage.EnterOtherPurpose();


    await page.waitForTimeout(5000);




});
    