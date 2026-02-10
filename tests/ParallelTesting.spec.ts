import { test,expect } from '@playwright/test';

//test.describe.configure({mode:'serial'})
//test.describe.configure({mode:'parallel'})
//npx playwright test tests/ParallelTest.spec.ts --project firefox
//npx playwright test tests/ParallelTest.spec.ts --project chromium
//npx playwright test tests/ParallelTest.spec.ts --workers 4(It will run the tests using 4 workers by ignoring the global config file settings)

test.describe('group1', () => {

    test('Test1', async ({ page }) => {
        console.log(" this is Test1 ......")
     });

    test('Test2', async ({ page }) => {
        console.log(" this is Test2 ......")
     });

    test('Test3', async ({ page }) => {
        console.log(" this is Test3 ......")
    });

    test('Test4', async ({ page }) => {
        console.log(" this is Test4 ......")
    });


    test('Test5', async ({ page }) => {
        console.log(" this is Test5 ......")
    });


});




