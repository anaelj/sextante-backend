import puppeteer from 'puppeteer';
                         
export async function getOwners (pTicker) {

  const browser = await puppeteer.launch(); //{headless: false}
  const page = await browser.newPage();
  await page.goto(`https://fundamentus.com.br/acionistas.php?papel=${pTicker}`);
//  await page.pdf({ path: 'hn.pdf', format: 'a4' });


  return await page.evaluate(() => {

    const ownerList = [];

    const temp = document.querySelector('.my-menu ul li ul').getElementsByTagName('li');
    
    for (let i = 0; i < temp.length; i++) {
      const element = temp[i].children[0].childNodes[0].textContent;
      console.log(element);
      ownerList.push(element);
    }

    // temp && temp.map( item => {
    //   ownerList.push(item.children[0].childNodes[0].textContent);
    // })
    
    //console.log(temp[0].children[0].childNodes[0].textContent);
    return ownerList;

//    const retorno = document.querySelector('.my-menu ul li ul').getElementsByTagName('li');


  })

  await browser.close();
};