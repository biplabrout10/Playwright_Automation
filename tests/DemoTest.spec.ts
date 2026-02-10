import { test, expect } from "@playwright/test";



test("Client App login", async ({ page }) => {
   //js file- Login js, DashboardPage
   const emailID = page.locator("#userEmail");
   const Pwd = page.locator("#userPassword");
   const LoginBtn = page.locator("[value='Login']");
   //const email = "subha7070@gmail.com";

   //const productName = 'zara coat 3';
   const products = page.locator(".card-body b");
   await page.goto("https://rahulshettyacademy.com/client");
   await emailID.fill("subha7070@gmail.com");
   await Pwd.fill("Suvendu@123");
   await LoginBtn.click();

   //console.log(await products.first().textContent());
   await page.waitForLoadState("networkidle");
   console.log(await products.allTextContents());

   //await page.waitForLoadState('networkidle');
   //await page.locator(".card-body b").first().waitFor();
   //const titles = await page.locator(".card-body b").allTextContents();
   //console.log(titles); 

});

test("UI test", async ({ page }) => {
   const UserName = page.locator('input#username');
   const PassWord = page.locator('#password');
   const SignIn = page.locator('#signInBtn');
   const documentLink = page.locator("[href*='documents-request']");

   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   await UserName.fill('rahulshettyacademy');
   await PassWord.fill('learning');

   const dropdowns = page.locator('select.form-control');
   await dropdowns.selectOption("consult");
   await page.locator('.radiotextsty').last().click();
   await page.locator('button#okayBtn').click();
   expect(page.locator('.radiotextsty').last()).toBeChecked();
   await page.locator('#terms').click();
   expect(page.locator('#terms')).toBeChecked();
   expect(documentLink).toHaveAttribute("class", "blinkingTexts");
   //await page.pause();
   //await SignIn.click();


});

test("Child Window", async ({ browser }) => {

   const context = await browser.newContext();
   const page1 = await context.newPage();
   const page2 = await context.newPage();
   console.log("Number os pages created :" + context.pages().length)//count number of pages opened

   const documentLink = page1.locator("[href*='documents-request']");
   await page1.goto("https://rahulshettyacademy.com/loginpagePractise/");
   await page2.goto("https://playwright.dev/");
   documentLink.click();
   const NewPage = context.waitForEvent('page');


});

//page--->New tab/window/popup

