const puppeteer = require("puppeteer");
const { formatMessage } = require("./utils");

const getMessages = async ({ url, msg, id }) => {

   //incia la pagina
   const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
   const page = await browser.newPage();
   await page.goto(url);
   
   //Espera mientras carga
   await page.waitForTimeout(20000);
   
   //click en input select
   const selectQuiantity = await page.$('span[class="js-select-display"]');
   await selectQuiantity.click();
   
   //click en cantidad de tickets
   const selectPass = await page.$('div[data-q-val="1"]');
   await selectPass.click();
   
   //Click en continuar
   const continueButton = await page.$('button[data-trackingdatavaluename="TFQContinue"]');
   await continueButton.click();
   
   //Espera a que cargen los precios
   await page.waitForTimeout(10000);
   
   //obtener precios
   const prices = await page.$$('span[class="t-b fs16"]');

   //obtener price de elementos
   const priceOne = await (await prices[0].getProperty("textContent")).jsonValue();
   const priceTwo = await ( await prices[1].getProperty("textContent")).jsonValue();
   const priceThree = await (await prices[2].getProperty("textContent")).jsonValue();
   
   const priceList = [priceOne, priceTwo, priceThree];

   //cierra el browser
   await browser.close();

   console.log(priceList, id);

   return Promise.resolve(formatMessage(priceList, msg, id));
}

module.exports = getMessages;

