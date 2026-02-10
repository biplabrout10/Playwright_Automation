import { Page, Locator, BrowserContext, expect } from "@playwright/test"
import { Context } from "vm";
import { SchemeLovPage } from "./SchemeLovPage";


export class eDepositPage {
  private readonly page: Page;
  private readonly PLDepositsTab: Locator;
  private readonly PaymentButton: Locator;
  private readonly ChequeEntryButton: Locator;
  private readonly Frame!: Locator;
  private readonly InsertButton: Locator;
  private readonly ChequeTypeDropdown: Locator;
  private readonly SearchSchemeButton: Locator;
  private readonly SchemeLovPage!: Page;
  private readonly ChequeGrossAmount: Locator;
  private readonly SaveButton: Locator;
  private readonly SaveSuccessMsg: Locator;
  private readonly TaskListButton: Locator;
  private readonly TaskListSearchField: Locator;
  private readonly TaskListFirstRow: Locator;
  private readonly BeneficiaryButton: Locator;
  private readonly BeneficiaryAccountNumber: Locator;
  private readonly BeneficiaryIfscCode: Locator;
  private readonly BeneficiaryAmount: Locator;
  private readonly BackButton: Locator;
  private readonly ApproveButton: Locator;
  private readonly DsignButton: Locator;
  private readonly DsignDropDownButton: Locator;
  private readonly SignButton: Locator;
  private readonly AttachmentButton: Locator;
  private readonly BeneficiaryAttachment: Locator;
  private readonly AttachmentDsignButton: Locator;
  private readonly ConfirmAttachmentDsignButton: Locator;
  private readonly AttachmentBackButton: Locator;
  private readonly ChequeSubmitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.PLDepositsTab = page.locator('#i_txt0_1');
    this.PaymentButton = page.locator('#i_txt0_8');
    this.ChequeEntryButton = page.locator('#i_txt0_9');
    const Frame = this.page.frameLocator('#mainFrame');
    this.InsertButton = Frame.locator('#insert');
    this.ChequeTypeDropdown = Frame.locator('select#chequeType');
    this.SearchSchemeButton = Frame.locator('img#LovScheme');
    this.ChequeGrossAmount = Frame.locator('#chequeGrossAmount');
    this.SaveButton = Frame.locator('#save');
    this.SaveSuccessMsg = Frame.locator('.success');
    this.TaskListButton = page.locator('#i_txt0_2');
    this.TaskListSearchField = Frame.locator("input[type='search']");
    this.TaskListFirstRow = Frame.locator("[role='row'] a");
    this.BeneficiaryButton = Frame.locator('#beneficiary');
    this.BeneficiaryAccountNumber = Frame.locator('#benfAccountNo0');
    this.BeneficiaryIfscCode = Frame.locator('#benfBankIFSCCode0');
    this.BeneficiaryAmount = Frame.locator('#amount0');
    this.BackButton = Frame.locator('#back');
    this.ApproveButton = Frame.locator('#approve');
    this.DsignButton = Frame.locator('button:nth-child(1)');
    this.DsignDropDownButton = Frame.locator('select#dscType');
    this.SignButton = Frame.locator('button#btnSign');
    this.AttachmentButton = Frame.locator('#attachment');
    this.BeneficiaryAttachment = Frame.locator('a:has-text("ifms_cheque_wise_captured_beneficiaries")');
    this.AttachmentDsignButton = Frame.locator('#dSign');
    this.ConfirmAttachmentDsignButton = Frame.locator('.ajs-button.btn.btn-primary');
    this.AttachmentBackButton = Frame.locator('#backTo');
    this.ChequeSubmitButton = Frame.locator('#submitCheque');


  }
  async waitForLoaded(): Promise<void> {
    await expect(this.PLDepositsTab).toBeVisible({ timeout: 10000 });
  }
  async ClickPlDepositTab() {
    await this.PLDepositsTab.click();
  }
  async ClickPaymentButton() {
    await this.PaymentButton.click();
  }
  async ClickChequeEntryButton() {
    await this.ChequeEntryButton.click();
  }
  async MoveToChequeEntry() {
    await this.ClickPlDepositTab();
    await this.ClickPaymentButton();
    await this.ClickChequeEntryButton();
  }
  async ClickInsertButton() {
    await this.InsertButton.click();
  }
  async SelectChequeType() {
    await this.ChequeTypeDropdown.waitFor({ state: 'visible' });
    await this.ChequeTypeDropdown.selectOption('1');
  }
  async openLovPage(): Promise<SchemeLovPage> {
    // Wait for the LOV popup to open
    const [Lovpage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.SearchSchemeButton.click(),
    ]);
    await Lovpage.waitForLoadState(); // Ensure it's ready
    return new SchemeLovPage(Lovpage); // Return new page object
  }

  async EnterChequeAmount(amount: string) {
    await this.ChequeGrossAmount.fill(amount);
  }
  async ClickChequeSaveButton() {
    await this.SaveButton.click();
  }
  async ShowChequeReferenceNo() {
    const msg = await this.SaveSuccessMsg.textContent();
    console.log('status msg :' + msg);
    const words = msg?.split(" ");
    if (words && words.length > 8) {
      console.log('Ref no is: ' + words[8]);
      await this.TaskListButton.click();
      await this.TaskListSearchField.fill(words[8]);
    } else {
      console.log('Ref no not found or message is undefined');
    }
    await this.page.waitForTimeout(2000);
  }
  //Modified
  async GenerateChequeReferenceNumber(amount: string) {
    await this.EnterChequeAmount(amount);
    await this.ClickChequeSaveButton();
    await this.ShowChequeReferenceNo();

  }

  async ClickTaskListFirstRow() {
    await this.TaskListFirstRow.click();
  }
  async EnterBeneficiaryDetails(accountNo: string, Amount: string) {
    await this.BeneficiaryButton.click();
    await this.ClickInsertButton();
    await this.BeneficiaryAccountNumber.fill(accountNo);
    await this.BeneficiaryIfscCode.click();
    await this.page.waitForTimeout(1000);
    await this.BeneficiaryAmount.fill(Amount);
    await this.SaveButton.click();
    console.log('BenefAddSuccessMsg :' + await this.SaveSuccessMsg.textContent());
    await this.BackButton.click();
  }

  async ApproveCheque() {
    await this.ApproveButton.click();
    await this.page.waitForTimeout(3000);
    await this.DsignButton.click({ force: true });
    await this.DsignDropDownButton.waitFor({ state: 'visible' });
    await this.DsignDropDownButton.selectOption('Microsoft Windows Store');
    await this.SignButton.click();
    await this.page.waitForTimeout(2000);
  }

  async DsignBeneficiaryAttachment() {
    await this.AttachmentButton.click();
    await this.BeneficiaryAttachment.click();
    await this.AttachmentDsignButton.click({ force: true });
    await this.ConfirmAttachmentDsignButton.click();
    await this.DsignDropDownButton.waitFor({ state: 'visible' });
    await this.DsignDropDownButton.selectOption('Microsoft Windows Store');
    await this.SignButton.click();
    await this.page.waitForTimeout(4000);
    await this.AttachmentBackButton.click();
  }

  async SubmitCheque() {
    await this.DsignBeneficiaryAttachment();
    await this.ChequeSubmitButton.click();
  }

  async ShowChequeNumber() {
    const ChequeNumberMessage = await this.SaveSuccessMsg.textContent();
    console.log('Cheque msg :' + ChequeNumberMessage);
    const parts = ChequeNumberMessage?.split(" ");
    if (parts && parts.length > 6) {
      console.log('Cheque No is: ' + parts[6]);
    } else {
      console.log('Cheque Number not found');
    }
  }

}