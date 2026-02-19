import { Page, Locator, BrowserContext, expect, FrameLocator } from "@playwright/test"
import { Context } from "vm";

export class SanctioningDepartmentLovPage {
    private readonly page: Page;
    private readonly DepartmentCodeSearchField: Locator;
    private readonly DepartmentCodeSearchButton: Locator;
    private readonly FirstDepartmentCode: Locator;
    private readonly SelectDepartmentCode: Locator;
    private readonly DepartmentCodeInput: Locator;
    private readonly DepartmentNameInput: Locator;
    //private readonly DepartmentLovCancel: Locator;

    constructor(page: Page) {
        this.page = page;
        const topframe = this.page.frameLocator('#topFrame');
        const bodyframe = this.page.frameLocator('#bodyFrame');
        const buttonframe = this.page.frameLocator('#bottomFrame');
        const Frame = this.page.frameLocator('#mainFrame');
        this.DepartmentCodeSearchField = topframe.locator('#txtSearch');
        this.DepartmentCodeSearchButton = topframe.locator('#btnsubmit');
        this.FirstDepartmentCode = bodyframe.locator('#row0');
        this.SelectDepartmentCode = buttonframe.locator('#select');
        this.DepartmentCodeInput = Frame.locator('input#department_code');
        this.DepartmentNameInput = Frame.locator('input#department_name');




    }

    async ChooseDepartment() {
        await this.DepartmentCodeSearchField.fill('%fin');
        await this.DepartmentCodeSearchButton.click();
        await this.page.waitForTimeout(4000);
        await this.FirstDepartmentCode.click();
        await this.SelectDepartmentCode.waitFor({ state: 'visible' });
        await this.SelectDepartmentCode.click({ force: true });
        await this.page.waitForTimeout(100); // short delay
        await this.SelectDepartmentCode.click({ force: true });


    }


    async ChooseSanctionPurpose() {
        await this.page.waitForTimeout(2000);
        await this.FirstDepartmentCode.click();
        await this.SelectDepartmentCode.click();
    }

}