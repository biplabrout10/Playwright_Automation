import { Page, Locator, BrowserContext, expect } from "@playwright/test"
import { Context } from "vm";

import { PortalPage } from "./PortalPage";
import { eDepositPage } from "./eDepositPage";
import { WebbillPage } from "./WebbillPage";
import { WebAdminPage } from "./WebAdminPage";
import { esbmsPage } from "./esbmsPage";
import { SanctionOrderPage } from "./SanctionOrderPage";

export class IfmsHomePage {
  [x: string]: any;

  private readonly page: Page;
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly SkipButton: Locator;
  private readonly eDipositsButton: Locator;
  private readonly ApplicationList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator("input[value='LOGIN']");
    this.SkipButton = page.locator('.btn.btn-secondary');
    this.eDipositsButton = page.locator('.text-dark.text-decoration-none.d-flex.justify-content-between.align-items-center');
    this.ApplicationList = page.locator('.list-group-item a');
  }

  async waitForLoaded(): Promise<void> {
    await expect(this.usernameInput).toBeVisible({ timeout: 10000 });
    await expect(this.passwordInput).toBeVisible({ timeout: 10000 });
  }

  async enterUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  async enterPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async ClickOnSkipButton() {
    try {
      await this.SkipButton.waitFor({ state: 'visible', timeout: 2000 });
      await this.SkipButton.click();
    } catch (error) {
      // Skip button did not appear — no action needed
      //console.log('Skip button not found',error);
    }
  }

  async ClickOnloginButton() {
    await this.loginButton.click();
    await this.ClickOnSkipButton();
  }

  async PerformLogin(username: string, password: string) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.ClickOnloginButton();
  }

  async ShowApplicationList() {
    await this.page.waitForSelector('.list-group-item a', { timeout: 10000 });
    const ApplicationCount = await this.ApplicationList.count();
    console.log('No of applications are :', ApplicationCount);
    for (let i = 0; i < ApplicationCount; i++) {
      const item = this.ApplicationList.nth(i);
      const text = await item.innerText();
      console.log(`Application ${i + 1}: ${text}`);
    }
  }

  async navigateToOnlineBillSubmission(): Promise<WebbillPage> {
    await this.page.waitForSelector('.list-group-item a', { timeout: 10000 });
    const ApplicationCount = await this.ApplicationList.count();
    for (let i = 0; i < ApplicationCount; i++) {
      const item = this.ApplicationList.nth(i);
      const text = await item.innerText();
      if (text == 'Online Bill Submission') {
        const [webbillpage] = await Promise.all([
          this.page.context().waitForEvent('page'),
          this.ApplicationList.nth(i).click(),
        ]);
        return new WebbillPage(webbillpage);
      }
    }
    throw new Error("Online Bill Submission application not found.");
  }

  // async navigateToPLDeposit(): Promise<PLOperatorPage> {
  //   await this.eDipositsButton.waitFor({ state: 'visible', timeout: 10000 });
  //   const [plPage] = await Promise.all([
  //     this.page.context().waitForEvent('page'), // wait for new tab if PL opens in new page
  //     this.eDipositsButton.click()
  //   ]);
  //   return new PLOperatorPage(plPage);
  // }

  async navigateToAdministration(): Promise<WebAdminPage> {
    await this.page.waitForSelector('.list-group-item a', { timeout: 10000 });
    const ApplicationCount = await this.ApplicationList.count();
    for (let i = 0; i < ApplicationCount; i++) {
      const item = this.ApplicationList.nth(i);
      const text = await item.innerText();
      if (text == 'Administration') {
        const [webadmin] = await Promise.all([
          this.page.context().waitForEvent('page'),
          this.ApplicationList.nth(i).click(),
        ]);
        return new WebAdminPage(webadmin);
      }
    }
    throw new Error("Administration application not found.");
  }

  async navigateToeDeposit(): Promise<eDepositPage> {
    await this.page.waitForSelector('.list-group-item a', { timeout: 10000 });
    const ApplicationCount = await this.ApplicationList.count();
    for (let i = 0; i < ApplicationCount; i++) {
      const item = this.ApplicationList.nth(i);
      const text = await item.innerText();
      if (text == 'e Deposit') {
        const [plPage1] = await Promise.all([
          this.page.context().waitForEvent('page'),
          this.ApplicationList.nth(i).click(),
        ]);
        return new eDepositPage(plPage1);
      }
    }
    throw new Error("e Deposit application not found ");

  }

  async navigateToSchemePaymentSystem(): Promise<esbmsPage> {
    await this.page.waitForSelector('.list-group-item a', { timeout: 10000 });
    const ApplicationCount = await this.ApplicationList.count();
    for (let i = 0; i < ApplicationCount; i++) {
      const item = this.ApplicationList.nth(i);
      const text = await item.innerText();
      if (text == 'SCHEME PAYMENT SYSTEM') {
        const [esbms] = await Promise.all([
          this.page.context().waitForEvent('page'),
          this.ApplicationList.nth(i).click(),
        ]);
        return new esbmsPage(esbms);
      }
    }
    throw new Error("Scheme Payment System application not found.");

  }

  async navigateToSanctionOrderDatabase(): Promise<SanctionOrderPage>{
    await this.page.waitForSelector('.list-group-item a', { timeout: 10000 });
    const ApplicationCount = await this.ApplicationList.count();
    for (let i = 0; i < ApplicationCount; i++) {
      const item = this.ApplicationList.nth(i);
      const text = await item.innerText();
      if (text == 'Sanction Order Database') {
        const [sanction] = await Promise.all([
          this.page.context().waitForEvent('page'),
          this.ApplicationList.nth(i).click(),
        ]);
        return new SanctionOrderPage(sanction);
      }
    }
    throw new Error("Sanction Order Database application not found.");

  }

  

}