import { test, expect } from "@playwright/test";
import { DataProvider } from "../utils/dataProvider";

const excelPath = "testdata/data.xlsx";
const loginData = DataProvider.getTestDataFromExcel(excelPath);

test.describe.skip('Login data driven test', async () => {

    for (const { userName, passWord, Validity } of loginData) {

        test(`IFMS login XLS test for ${userName} and ${passWord}`, async ({ page }) => {
            await page.goto('https://uat.odishatreasury.gov.in/edeposits');
            await page.locator('#username').fill(userName);
            await page.locator('#password').fill(passWord);
            await page.locator("input[value='LOGIN']").click();

            if (Validity.toLowerCase() === 'valid') {
                const PLDepositsTab = page.locator('#i_txt0_1');
                await expect(PLDepositsTab).toBeVisible({ timeout: 3000 });

            } else {
                const msg = page.locator('#msg');
                await expect(msg).toBeVisible({ timeout: 3000 });
                await expect(page.locator("input[value='LOGIN']")).toBeVisible();
            }
            await page.waitForTimeout(2000);
        });
    }



});
