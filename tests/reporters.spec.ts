import {test,expect} from '@playwright/test';

//test.beforeEach('launching app',async({page})=>{

//await page.goto("https://demowebshop.tricentis.com/")

//})

test.skip('logotest', async ({ page }) => {
    await expect(page.locator("img[alt='Tricentis Demo Web Shop']")).toBeVisible();
});

test.skip('title test', async ({ page }) => {
    expect(await page.title()).toContain("Demo Web Shop");
});

test.skip('search test', async ({ page }) => {
    await page.locator('#small-searchterms').fill("laptop");  // fill teh text in search box
    await page.locator("input[value='Search']").click();      // click on the button
    await expect.soft(page.locator('h2 a').nth(0)).toContainText("laptop", { ignoreCase: true });
});