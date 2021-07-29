import puppeteer from "puppeteer";

export async function getIndicatorsFundamentus(pTicker, showBrowser) {
  try {
    // const browser = await puppeteer.launch({ headless: false });
    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    await page.goto(
      `https://www.fundamentus.com.br/detalhes.php?papel=${pTicker}`
    );

    return await page
      .evaluate(() => {
        let crescimento5a = "0";

        try {
          crescimento5a = document
            .getElementsByTagName("table")[2]
            .getElementsByTagName("tr")[11]
            .getElementsByTagName("td")[3]
            .getElementsByTagName("span")[0].innerText;
         // console.log(crescimento5a);
        } catch (error) {
          crescimento5a = "0";
        }

        const indicators = {
          crescimento5a : crescimento5a?.replace(',','.').replace('%',''),
        };

        return indicators;
      })
      .then((res) => {
        !showBrowser && browser.close();
        return res;
      });
  } catch (error) {
    return error;
  }
}

// const teste = await getIndicatorsSuno("TAEE11", false);
// console.log(teste);
