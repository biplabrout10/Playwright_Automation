import { Expect, test, Locator, Page, expect, chromium } from "@playwright/test";

/*Scenario
For Chrome process get value of CPU load.
Compare it with value in the yellow label.
*/

test.skip('Dynamic WebTable', async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://practice.expandtesting.com/dynamic-table');
    //Locating table tbody
    const table: Locator = page.locator("table.table tbody");
    await expect(table).toBeVisible();

    //step1--For Chrome process get value of CPU load.
    //Locating table rows excluding header
    const allrowsloc: Locator[] = await table.locator("tr").all(); //returns an array of locator
    console.log("No. of rows in the table: ", allrowsloc.length);
    expect(allrowsloc).toHaveLength(4);



    for (const row of allrowsloc) {
        const processName:string =await row.locator("td:nth-child(1)").innerText(); //row.locator('td').nth(0).innerText();
        if(processName==='Chrome'){
            let cpuLoad=await row.locator('td:has-text("%")').innerText();
            console.log("CPU Load of Chrome: ",cpuLoad);
            break; 
        }
    }
    //const rowsFirstCol: Locator =
    const yellowBoxText:string=await page.locator('#chrome-cpu').innerText();
    console.log("chrome cpu load from yellow box text: ",yellowBoxText);
    




})