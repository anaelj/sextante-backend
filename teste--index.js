import puppeteer from 'puppeteer';

import { reactCSVFile } from './readCSV.js';


(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://sistemaswebb3-listados.b3.com.br/indexPage/day/IBOV');
//  await page.pdf({ path: 'hn.pdf', format: 'a4' });
  const teste = await page.evaluate(() => {


    document.querySelector('#selectPage').click();
//    document.querySelector('#selectPage').value = '120';

     const retorno = document.querySelector('table tbody').getElementsByTagName('tr');


    for (let i = 0; i < retorno.length; i++) {
    
        console.log(retorno[i].childNodes[0].innerText);
      
    }

    return retorno;

  })

  console.log('teste:')
  console.log(teste);

  //await browser.close();
})();