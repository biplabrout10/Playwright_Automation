import { Page, Locator, BrowserContext, expect } from "@playwright/test"
import { Context } from "vm";

import { PortalPage } from "./PortalPage";
import { IfmsHomePage } from "./IfmsHomePage";
import { TestConfig } from "../test.config";
import { RandomDataUtil } from "../utils/randomDataGenerator";
import { eDepositPage } from "./eDepositPage";

export class esbmsPage {
    private readonly page: Page;
    private readonly SchemePaymentSystemButton: Locator;
    private readonly SNA_SPARSHButton: Locator;
    private readonly JIT_FSButton: Locator;
    private readonly UserDropDownButton: Locator;
    private readonly JITFSDDOApproverButton: Locator;
    private readonly SBMSDDOApproverButton: Locator;
    private readonly IADetailsCaptureButton: Locator;
    private readonly VirtualAllotmentButton: Locator;
    private readonly VirtualAllotmentInboxButton: Locator;
    private readonly ViewVirtualAllotmentButton: Locator;
    private readonly AddWithdrawSnaSparshButton: Locator;
    private readonly IAdetailsCaptureEntryButton: Locator;
    private readonly VirtualAllotmentInboxSearch: Locator;
    private readonly FirstVirtualAllotment: Locator;
    private readonly AddFromListButton: Locator;
    private readonly SelectIA: Locator;
    private readonly AddIA: Locator;
    private readonly BalanceAfterDistribution: Locator;
    private readonly DistributeVirtualAmountInputBox: Locator;
    private readonly SaveVirtualAllotmentButton: Locator;
    private readonly VirtualAllotmentSaveSuccessfulMsg: Locator;
    private readonly VirtualAllotmentSubmitButton: Locator;
    private readonly DsignButton: Locator;
    private readonly DsignDropDownButton: Locator;
    private readonly SignButton: Locator;




    constructor(page: Page) {
        this.page = page;
        const Frame = this.page.frameLocator('#mainFrame');
        this.SchemePaymentSystemButton = page.locator('#i_txt0_0');
        this.SNA_SPARSHButton = page.locator('#i_txt0_1');
        this.JIT_FSButton = page.locator('#i_txt0_1');
        this.UserDropDownButton = page.locator('#userDropdownMenuLink');
        this.JITFSDDOApproverButton = page.locator("a[class='btn btn-light btn-sm ']");
        this.SBMSDDOApproverButton = page.locator("a[class='btn btn-light btn-sm ']");
        this.IADetailsCaptureButton = page.locator('#i_txt0_2');
        this.IAdetailsCaptureEntryButton = page.locator('#i_txt0_3');
        this.VirtualAllotmentButton = page.locator('#i_txt0_5');
        this.VirtualAllotmentInboxButton = page.locator('#i_txt0_6');
        this.ViewVirtualAllotmentButton = page.locator('#i_txt0_7');
        this.AddWithdrawSnaSparshButton = page.locator('#i_txt0_8');
        this.VirtualAllotmentInboxSearch = Frame.locator("input[type='search']");
        this.FirstVirtualAllotment = Frame.locator('#desc');
        this.AddFromListButton = Frame.locator("input[value='Add From List']");
        this.SelectIA = Frame.locator('#check_88');
        this.AddIA = Frame.locator('#ssuListModalSaveId');
        this.BalanceAfterDistribution = Frame.locator('#ddoVaBalance');
        this.DistributeVirtualAmountInputBox = Frame.locator('#allotmentAmountHid0');
        this.SaveVirtualAllotmentButton = Frame.locator('#saveAllocatedAmt');
        this.VirtualAllotmentSaveSuccessfulMsg = Frame.locator("div[id='successMsg'] strong");
        this.VirtualAllotmentSubmitButton = Frame.locator('#SignSubmit');
        this.DsignButton = Frame.locator("div[class='jconfirm jconfirm-bootstrap jconfirm-open'] button:nth-child(1)");
        this.DsignDropDownButton = Frame.locator('select#dscType');
        this.SignButton = Frame.locator('button#btnSign');



    }

    async LoginToesbms(userId:string,password:string){
        const ifmshomeObj=new IfmsHomePage(this.page);
        await ifmshomeObj.PerformLogin(userId,password);
    }

    async waitForLoaded(): Promise<void> {
        await expect(this.SchemePaymentSystemButton).toBeVisible({ timeout: 10000 });
    }

    async SwichToSnaSparsh() {
        const text = await this.SNA_SPARSHButton.innerText();
        if (text == 'SNA-SPARSH') {
            await this.SNA_SPARSHButton.click();
        } else {
            await this.UserDropDownButton.click();
            await this.SBMSDDOApproverButton.click();
        }
    }

    async SwitchToJitFs() {
        const text = await this.JIT_FSButton.innerText();
        if (text == 'JIT-FS') {
            await this.JIT_FSButton.click();
        } else {
            await this.UserDropDownButton.click();
            await this.JITFSDDOApproverButton.click();
        }
    }

    async EnterIAallotment(MinAmt: number, MaxAmt: number) {
        const amt = RandomDataUtil.getIntegerAmount(MinAmt, MaxAmt);
        await this.DistributeVirtualAmountInputBox.clear();
        await this.DistributeVirtualAmountInputBox.fill(amt);
    }

    async SubmitVirtualAllotment() {
        await this.page.waitForTimeout(2000);
        await this.DsignButton.click({ force: true });
        await this.DsignDropDownButton.waitFor({ state: 'visible' });
        await this.DsignDropDownButton.selectOption('Microsoft Windows Store');
        await this.SignButton.click();
        await this.page.waitForTimeout(4000);
    }


    async GenerateSnaSparshVirtualAllotment(SanctionNum: string) {
        await this.SNA_SPARSHButton.click();
        await this.VirtualAllotmentButton.click();
        await this.VirtualAllotmentInboxButton.click();
        await this.page.waitForTimeout(4000);
        await this.VirtualAllotmentInboxSearch.fill(SanctionNum);
        await this.FirstVirtualAllotment.click();
        await this.BalanceAfterDistribution.waitFor({ state: 'visible' });
        const Amt = await this.BalanceAfterDistribution.inputValue();
        const amount: number = Number(Amt);
        console.log(amount);
        await this.page.waitForTimeout(2000);
        await this.AddFromListButton.nth(1).click();
        await this.page.waitForTimeout(3000);
        await this.SelectIA.click();
        await this.AddIA.click();
        if (amount > 1) {
            await this.EnterIAallotment(1, amount);
        }
        await this.SaveVirtualAllotmentButton.click();
        const MSG = await this.VirtualAllotmentSaveSuccessfulMsg.innerText();
        await expect(this.VirtualAllotmentSaveSuccessfulMsg).toHaveText(MSG);
        await this.VirtualAllotmentSubmitButton.click();
        await this.SubmitVirtualAllotment();


    }


}