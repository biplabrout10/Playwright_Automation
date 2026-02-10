import { Expect, test, Locator, Page, expect } from "@playwright/test";


test('static web table', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
    const table: Locator = page.locator("table[name='BookTable'] tbody");

    //1.Row count
    const row: Locator = table.locator('tr'); //chaining of locators
    console.log('No. of rows :', await row.count());
    expect(await row.count()).toBe(7);

    //2.column/header count
    const column: Locator = row.locator('th'); //chaining of locators
    console.log('No. of columns :', await column.count());
    await expect(column).toHaveCount(4);

    //Printing headers name
    //converting the headers locators to locator type array
    const headerLoc: Locator[] = await column.all();
    for (let i in headerLoc) {
        console.log('Headers: ', await headerLoc[i].innerText());
    }

    //3.Read all the data from 2nd Row

    // const SecondRow:Locator=row.nth(2);
    // const SecondRowCells:Locator=SecondRow.locator('td');
    // const SecondRowData:Locator[]=await SecondRowCells.all();
    // for(let i in SecondRowData)
    // {
    //     console.log('SecondRowData: ',await SecondRowData[i].innerText());
    // }

    //OR 
    //const SecondRowCells: Locator = page.locator("table[name='BookTable'] tbody tr:nth-child(3) td")
    const SecondRowCells:Locator=row.nth(2).locator('td');
    const SecondRowData: string[] = await SecondRowCells.allInnerTexts();
    console.log('SecondRowTexts: ', SecondRowData);
    await expect(SecondRowCells).toHaveText([ 'Learn Java', 'Mukesh', 'Java', '500' ]);

    //Printing the data using looping statements
    // for(let data of SecondRowData){
    //     console.log(data);
    // }


    //4.Read all the data from table (excluding headers)
    const AllRowLoc:Locator[]=await row.all();
    for(const row of AllRowLoc.slice(1)){ //slice(1)--->will skip the header/1st row
        const texts:string[]=await row.locator('td').allInnerTexts();
        console.log(texts.join('\t'));
    }

    //5.Print Booknames where author is Mukesh
    const Authors=row.locator('td:nth-child(2)');
    const AuthorText:Locator[]=await Authors.all();
    for(const author of AuthorText){
        if(await author.innerText()==='Mukesh'){
            const BookName:string=await (row.locator('td:nth-child(1)')).innerText();
            console.log("BookNames whose author is Mukesh:",BookName);
        }

    }
    


})