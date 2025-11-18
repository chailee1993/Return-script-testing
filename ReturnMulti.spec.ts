import { test, expect } from '@playwright/test';


test.use({
    headless: false, // Set to false for headed mode
    slowMo: 500, // 500ms delay between operations
  ignoreHTTPSErrors: true,
   
   });

   //IMPORTANT; SET VARIABLE BEFORE TESTING!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
let RetailerID = 301077
let GameID: number = '9906' 
let PackID1 = 107
let StartRange: number= '50'
let EndRange: number=99
let Rangetype = 'End' //Options: Full, Front, End, Mid
let Multipack = 'No' // Options: Yes, No
//If Multipack, make sure to run Markshipments


   //#############################################

test('test', async ({ page }) => {
  // Navigate to dashboard 
   await page.goto('https://mnscat1.mnscat.lott/admin/portal.do#');
  await page.locator('input[name="username"]').fill('administrator');
  await page.locator('input[name="password"]').fill('password');
  await page.getByRole('button', { name: 'Go' }).click();
  await page.getByRole('button', { name: 'Continue' }).click();
//##### if i < 10 then repeat +1
//####
  let i = 0;
  //Change i < # to be how many returns you want to do
  while (i < 8) {
    console.log(`Iteration: ${i + 1}`);
//#############################################################################################Putting Tickets into Settle#################################################################################################
//Select Game and Pack ID
await page.getByRole('link', { name: 'Manage Inventory Status' }).click();
await page.getByRole('button', { name: 'By Pack' }).click();
await page.getByRole('cell', { name: 'Select Game', exact: true }).getByRole('textbox').click();
await page.getByRole('cell', { name: 'Select Game', exact: true }).getByRole('textbox').fill(GameID);
await page.locator('input[name="bookId"]').fill(PackID1.toString());
await page.getByRole('button', { name: 'Go >' }).click();

//Chai's Personal Test Block
await page.locator('select[name="menu3"]').click();
await page.locator('input[name="bookId"]').dblclick();
await page.locator('input[name="bookId"]').click();
await page.locator('input[name="bookId"]').fill(PackID1.toString());
await page.locator('input[name="bookId"]').press('Enter');
await page.getByRole('button', { name: 'Go >' }).click();
await page.locator('input[name="bookDetailsList[0].selected"]').check();
await page.getByRole('listbox').selectOption('1');
await page.locator('input[name="newLocationId"]').click();
await page.locator('input[name="newLocationId"]').click();

//Selected Retailer to assign and Settle Pack
await page.locator('input[name="newLocationId"]').fill(RetailerID.toString());
await page.getByRole('button', { name: 'Submit' }).click();
const page1Promise = page.waitForEvent('popup');
  const page1 = await page1Promise;
await page1.getByRole('button', { name: 'Close' }).click();
await page.locator('input[name="bookDetailsList[0].selected"]').check();
await page.getByRole('listbox').selectOption('1');
await page.getByRole('button', { name: 'Submit' }).click();
const page2Promise = page.waitForEvent('popup');
  const page2 = await page2Promise;
await page.locator('input[name="bookDetailsList[0].selected"]').check();
await page.getByRole('listbox').selectOption('1');
await page.locator('input[name="bookDetailsList[0].selected"]').check();


// Select Start Range and End Range to return to warehouse + Submit Warehouse received
await page.getByRole('listbox').selectOption('0');
await page.locator('input[name="isPartialTicketRange"]').check();
await page.locator('input[name="partialTicketRangeFrom"]').click();
await page.locator('input[name="partialTicketRangeFrom"]').fill(StartRange.toString());
await page.locator('input[name="partialTicketRangeTo"]').click();
await page.locator('input[name="partialTicketRangeTo"]').fill(EndRange.toString());
const page3Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Submit' }).click();
  const page3 = await page3Promise;
await page3.getByRole('button', { name: 'Close' }).click();


if (Rangetype === 'Full')
{
await page.locator('input[name="bookDetailsList[0].selected"]').check();
}

else if (Rangetype ==='Front' ){
await page.locator('input[name="bookDetailsList[1].selected"]').check();
}

else if (Rangetype === 'End') {
await page.locator('input[name="bookDetailsList[1].selected"]').check();
}
else if (Rangetype === 'Mid' ){
await page.locator('input[name="bookDetailsList[2].selected"]').check();
}

//

if (Multipack === 'No'){
await page.getByRole('listbox').selectOption('1');
const page4Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Submit' }).click();
  const page4 = await page4Promise;
await page4.getByRole('button', { name: 'Close' }).click();

}

else if (Multipack === 'Yes'){

}

// Back to home
await page.getByRole('img').nth(1).click();
   await page.getByRole('img').nth(1).click();

//##########################################################################################################################################################################################################################
// If arguement loop    
i++;
PackID1++;
  }

//###Testing Zone


//################


  // Close the browser after a delay (optional, for observation)
  await page.waitForTimeout(2000);


});
