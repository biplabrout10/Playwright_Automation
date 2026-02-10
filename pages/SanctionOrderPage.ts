import { Page, Locator, BrowserContext, expect } from "@playwright/test"
import { Context } from "vm";

import { IfmsHomePage } from "./IfmsHomePage";
import { TestConfig } from "../test.config";
import { RandomDataUtil } from "../utils/randomDataGenerator";
import { SanctioningDepartmentLovPage } from "./SanctioningDepartmentLovPage";
import { SanctioningOfficeLovPage } from "./SanctioningOfficeLovPage";
import { SanctionPurposeLovPage } from "./SanctionPurposeLovPage";

export class SanctionOrderPage {
  private readonly page: Page;
  private readonly SanctionOrderButton: Locator;
  //private readonly Frame: Locator;
  private readonly SanctionOrderTaskList: Locator;
  private readonly FileNumberField: Locator;
  private readonly EmployeeTypeDropDown: Locator;
  private readonly SanctionTypeDropDown: Locator;
  private readonly SanctionSubTypeDropDown: Locator;
  //private readonly SanctioningDepartment: Locator;
  private readonly SearchDepartment: Locator;
  private readonly SanctioningAuthorityLevelDropDown: Locator;
  private readonly SearchSanctioningOffice: Locator;
  private readonly SearchSanctionPurpose: Locator;
  private readonly OtherPurpose: Locator;
  //private readonly DemandNumber: Locator ;
  // private readonly MajorHead: Locator;
  // private readonly SubMajorHead: Locator;
  // private readonly MinorHead: Locator;
  // private readonly SubHead: Locator;
  // private readonly DetailHead: Locator;
  // private readonly ObjectHead: Locator;
  // private readonly PlanStatus: Locator;
  // private readonly ChargeVoted: Locator;
  // private readonly SectorCode: Locator;
  // private readonly OfficeName: Locator;
  // private readonly SanctionAmountCash: Locator;
  private readonly SanctionLogout:Locator;


  constructor(page: Page) {
    this.page = page;
    this.SanctionOrderButton = page.locator('#i_txt0_2');
    const Frame = this.page.frameLocator('#mainFrame');
    this.SanctionOrderTaskList = page.locator('#i_txt0_1');
    this.FileNumberField = Frame.locator('#fileNumber');
    this.EmployeeTypeDropDown = Frame.locator('select#empTypeId');
    this.SanctionTypeDropDown = Frame.locator('select#sancTypeId');
    this.SanctionSubTypeDropDown = Frame.locator('select#subTypeId');
    this.SearchDepartment = Frame.locator('#btndeptnname');
    this.SanctioningAuthorityLevelDropDown = Frame.locator('select#authorityLevelId');
    this.SearchSanctioningOffice = Frame.locator('#sancAuthNameLov');
    this.SearchSanctionPurpose = Frame.locator('#purposeLov');
    this.OtherPurpose = Frame.locator('#other_purpose');
    this.SanctionLogout=page.locator("a[href='Logout.html']");
    

  }


  async waitForLoaded(): Promise<void> {
    await expect(this.SanctionOrderButton).toBeVisible({ timeout: 10000 });
  }

  async ClickOnSanctionOrderButton() {
    await this.SanctionOrderButton.click();
  }

  async EnterFileNumber() {
    const FileNo = RandomDataUtil.getFileNumber(8);
    await this.FileNumberField.fill(FileNo);
  }

  async ClickSanctionLogout(){
    await this.SanctionLogout.click();
  }

  async SelectEmployeeType() {
    await this.EmployeeTypeDropDown.waitFor({ state: 'visible' });
    await this.EmployeeTypeDropDown.selectOption('10');
  }

  async SelectSanctionType() {
    await this.SanctionTypeDropDown.waitFor({ state: 'visible' });
    await this.SanctionTypeDropDown.selectOption('8');
  }

  async SelectSanctionSubType() {
    await this.SanctionSubTypeDropDown.waitFor({ state: 'visible' });
    await this.SanctionSubTypeDropDown.selectOption('21');
  }

  async openSancDepLovPage(): Promise<SanctioningDepartmentLovPage> {
    const [DepLovpage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.SearchDepartment.click(),
    ]);
    await DepLovpage.waitForLoadState();
    return new SanctioningDepartmentLovPage(DepLovpage); // Return new page object
  }

  async SelectSanctionAuthorityLevel() {
    await this.SanctioningAuthorityLevelDropDown.waitFor({ state: 'visible' });
    await this.SanctioningAuthorityLevelDropDown.selectOption('1');
  }

  async openSancOfcLovPage(): Promise<SanctioningOfficeLovPage> {
    const [ofcLovpage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.SearchSanctioningOffice.click(),
    ]);
    await ofcLovpage.waitForLoadState();
    return new SanctioningOfficeLovPage(ofcLovpage);
  }

  async openSancPurposeLovPage(): Promise<SanctionPurposeLovPage> {
    const [sancpurpseLovpage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.SearchSanctionPurpose.click(),
    ]);
    await sancpurpseLovpage.waitForLoadState();
    return new SanctionPurposeLovPage(sancpurpseLovpage);
  }

  async EnterOtherPurpose() {
    await this.OtherPurpose.fill('TestingSnaSparsh');
  }

  











}
