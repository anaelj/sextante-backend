import puppeteer from "puppeteer";

export async function getSelicBancoCentral(showBrowser) {
  try {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    await page.goto(`https://www.bcb.gov.br`);

    return await page
      .evaluate(() => {
        let selic = "0";

        try {
          selic = document
            .getElementsByTagName("bcb-selic")[0]
            .getElementsByTagName("div")[6].innerText;
          console.log(selic);
        } catch (error) {
          selic = "0";
        }

        return selic;
      })
      .then((res) => {
        !showBrowser && browser.close();
        return res;
      });
  } catch (error) {
    return error;
  }
}

// const teste = await getSelicBancoCentral(false);
// console.log(teste);
