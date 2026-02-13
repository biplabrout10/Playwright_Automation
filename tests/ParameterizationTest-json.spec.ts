import { test, expect } from "@playwright/test";
import fs from 'fs';
import { DataProvider } from "../utils/dataProvider";

// const LoginDATA:String[][]=[
//     ["bash_ap","Changeme@123","valid"],
//     ["bash_op","Changeme@123","valid"],00   
//     ["bash_ap","Changeme@321","invalid"],
//     ["abcxyz","AbcXyz@123","invalid"],
// ];


const jsonPath = "testdata/data.json";
const logindata=DataProvider.getTestDataFromJson(jsonPath);

test.describe.skip('Login data driven test', async () => {

    for (const { username, password, validity } of logindata) {

        test(`IFMS login test for ${username} and ${password}`, async ({ page }) => {
            await page.goto('https://uat.odishatreasury.gov.in/edeposits');
            await page.locator('#username').fill(username);
            await page.locator('#password').fill(password);
            await page.locator("input[value='LOGIN']").click();

            if (validity.toLowerCase() === 'valid') {
                const PLDepositsTab = page.locator('#i_txt0_1');
                await expect(PLDepositsTab).toBeVisible({ timeout: 3000 });

            } else {
                const msg = page.locator('#msg');
                await expect(msg).toBeVisible({ timeout: 3000 });
                await expect(page.locator("input[value='LOGIN']")).toBeVisible();
            }

        });
    }

});
