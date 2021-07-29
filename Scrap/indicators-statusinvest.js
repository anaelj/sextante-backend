import puppeteer from "puppeteer";

export async function getIndicatorsStatusInvest(pTicker, showBrowser) {
  try {
    // if (showBrowser) {
    //   console.log('1')
    const browser = await puppeteer.launch({ headless: false });
    // } else {
    // const browser = await puppeteer.launch();
    // }

    const page = await browser.newPage();

    // console.log('1')
    await page.goto(`https://statusinvest.com.br/acoes/${pTicker}`);
    // console.log('2')
    //    await page.waitFor(15000);
    // console.log('3')
    // await page.waitForNavigation({ timeout: 5000 });
    // page.waitForNavigation({ waitUntil: 'networkidle0' })

    return await page
      .evaluate(() => {
        //const teste = getValue(document);

        let dividendYeld = "0";
        let precoLucro = "0";
        let dividaLiquidaEbitda = "0";
        let margemLiquida = "0";
        let returnOverInvestedCapital = "0";
        let precoSobreValorPatrimonial = "0";
        let lucroPorAcao = "0";
        let returnOnEquity = "0";
        let evebit = "0"; //ev/ebit
        let valorPatrimonialAcao = "0";

        try {
          evebit = document
            .querySelector(".indicator-today-container")
            .getElementsByTagName("div")[24]
            .getElementsByTagName("strong")[0].textContent;
             console.log(evebit);
        } catch (error) {
          evebit = "0";
        }
        try {
          valorPatrimonialAcao = document
            .querySelector(".indicator-today-container")
            .getElementsByTagName("div")[36]
            .getElementsByTagName("strong")[0].textContent;
          console.log(valorPatrimonialAcao);
        } catch (error) {
          valorPatrimonialAcao = "0";
        }

        try {
          returnOnEquity = document
            .querySelector(".indicator-today-container")
            .getElementsByTagName("div")[106]
            .getElementsByTagName("strong")[0].textContent;
          // console.log(returnOnEquity);
        } catch (error) {
          returnOnEquity = "0";
        }

        try {
          lucroPorAcao = document
            .querySelector(".indicator-today-container")
            .getElementsByTagName("div")[44]
            .getElementsByTagName("strong")[0].textContent;
        } catch (error) {
          lucroPorAcao = "0";
        }

        try {
          dividendYeld = document
            .querySelector(".top-info")
            .getElementsByTagName("div")[14]
            .getElementsByTagName("strong")[0].textContent;
        } catch (error) {
          dividendYeld = "0";
        }

        try {
          precoLucro = document
            .querySelector(".indicator-today-container")
            .getElementsByTagName("div")[9]
            .getElementsByTagName("strong")[0].textContent;
        } catch (error) {
          precoLucro = "0";
        }

        try {
          dividaLiquidaEbitda = document
            .querySelector(".indicator-today-container")
            .getElementsByTagName("div")[65]
            .getElementsByTagName("strong")[0].textContent;
        } catch (error) {
          dividaLiquidaEbitda = "0";
        }

        try {
          margemLiquida = document
            .querySelector(".indicator-today-container")
            .getElementsByTagName("div")[99]
            .getElementsByTagName("strong")[0].textContent;
        } catch (error) {
          margemLiquida = "0";
        }

        try {
          returnOverInvestedCapital = document
            .querySelector(".indicator-today-container")
            .getElementsByTagName("div")[113]
            .getElementsByTagName("strong")[0].textContent;
        } catch (error) {
          returnOverInvestedCapital = "0";
        }

        try {
          precoSobreValorPatrimonial = document
            .querySelector(".indicator-today-container")
            .getElementsByTagName("div")[15]
            .getElementsByTagName("strong")[0].textContent;
        } catch (error) {
          precoSobreValorPatrimonial = "0";
        }

        // tagalong, preço sobre valor patrimonial

        const indicators = {
          precoLucro,
          dividaLiquidaEbitda,
          margemLiquida,
          returnOverInvestedCapital,
          dividendYeld,
          precoSobreValorPatrimonial,
          lucroPorAcao,
          returnOnEquity,
          evebit,
          valorPatrimonialAcao
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

// const teste = await getIndicatorsStatusInvest("TAEE3", true);
// console.log(teste);

// await page.$eval('#username', (el, setting) => el.value = setting.username, setting);
