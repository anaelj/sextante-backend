import puppeteer from "puppeteer";

export async function getIndicatorsSuno(pTicker, showBrowser) {
  try {
    // if (showBrowser) {
    //   console.log('1')
    // const browser = await puppeteer.launch({ headless: false });
    // } else {
    const browser = await puppeteer.launch();
    // }

    const page = await browser.newPage();

    // console.log('1')
    await page.goto(`https://www.suno.com.br/acoes/${pTicker}`);
    // console.log('2')
    //    await page.waitFor(15000);
    // console.log('3')
    // await page.waitForNavigation({ timeout: 5000 });
    // page.waitForNavigation({ waitUntil: 'networkidle0' })

    return await page
      .evaluate(() => {
        //const teste = getValue(document);

        let payout = "0";
        let valorDividendos12Meses = '0'; 

        try { 
          payout = document
            .querySelector(".dividendosTituloAzul").textContent;
            // console.log(payout);
        } catch (error) {
          payout = "0";
        }
        try { 
          valorDividendos12Meses = document
            .querySelector(".dividendosTituloVerde").textContent;
            // console.log(valorDividendos12Meses);
        } catch (error) {
          valorDividendos12Meses = "0";
        }
        // tagalong, preço sobre valor patrimonial

        const indicators = {
          payout,
          valorDividendos12Meses
        };

        // console.log(indicators);
        // console.log(`---->>>${temp}<<<<----`);

        return indicators;

        //browser.close();
      })
      .then((res) => {
        !showBrowser && browser.close();
        return res;
      });
  } catch (error) {
    return error;
  }

  //await browser.close();
  //await page.waitForNavigation({ waitUntil: 'load' });
  //await page.waitFor(5000)
}

const teste = await getIndicatorsSuno("TAEE11", false);
console.log(teste);

// await page.$eval('#username', (el, setting) => el.value = setting.username, setting);
