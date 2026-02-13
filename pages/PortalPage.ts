import { Page, Locator, BrowserContext, expect } from "@playwright/test"
import { Context } from "vm";

import { IfmsHomePage } from './IfmsHomePage';

export class PortalPage {

  //define the variables : private and readonly
  private readonly page: Page;
  private readonly context: Context;
  private readonly DDOInterface: Locator;
  private readonly PageTitle: Locator;
  private readonly ModalPopup: Locator;

  //constructor
  constructor(page: Page, context: BrowserContext) {
    this.page = page;
    this.context = context;
    this.DDOInterface = page.locator('tbody tr:nth-child(3) td:nth-child(4) a:nth-child(1)');
    this.PageTitle = page.getByTitle('iFMS :: Integrated Financial Management System, Odisha');
    this.ModalPopup = page.locator('.modal-close');
  }

  //action methods 
  async getIfmsHomePage(): Promise<IfmsHomePage> {
    const [ifmshome] = await Promise.all(
      [this.page.context().waitForEvent('page'),
      this.DDOInterface.click(),
      ])
    const ifmshomepage = new IfmsHomePage(ifmshome);
    await ifmshomepage.waitForLoaded();
    return ifmshomepage;
  }

  async verifyPageTitle(title: string) {
    await expect(this.page).toHaveTitle(title);
  }

  async closeModalPopup() {
    await this.ModalPopup.click();
  }

}