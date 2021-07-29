import puppeteer from "puppeteer";


export async function getPrices(pTicker, showBrowser) {
  try {
    // if (showBrowser) {
    //   console.log('1')
    // const browser = await puppeteer.launch({ headless: false });
    // } else {
    const browser = await puppeteer.launch();
    // }

    const page = await browser.newPage();
    
    // console.log('1')
    await page.goto(`https://finance.yahoo.com/quote/${pTicker}.SA`);
    // console.log('2')
    // await page.waitFor(2000);
    // console.log('3')
    // await page.waitForNavigation({ timeout: 5 });
    //page.waitForNavigation({ waitUntil: 'networkidle2' })
    // await waitTillHTMLRendered(page);

    return await page.evaluate(() => {
        //const teste = getValue(document);
        const temp = document
        .querySelector("#quote-header-info")
        .getElementsByTagName("div")[13]
        .getElementsByTagName("span")[0].childNodes[0].data;
  
      // if (!temp) {
      //   temp = document
      //     .querySelector("#quote-header-info")
      //     .getElementsByTagName("div")[13]
      //     .getElementsByTagName("span")[0].textContent;
      // }
      console.log(`---->>>${temp}<<<<----`);
  
      return temp;
  
        //browser.close();
    }).then( res =>  {browser.close();  return res;});

  } catch (error) {
    return "0";
  }

  //await browser.close();
  //await page.waitForNavigation({ waitUntil: 'load' });
  //await page.waitFor(5000)
}


getPrices("OIBR3", true);

// await page.$eval('#username', (el, setting) => el.value = setting.username, setting);
