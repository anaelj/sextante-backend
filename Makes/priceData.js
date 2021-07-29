
import fs from 'fs';
import { getPrices } from '../Scrap/price.js';

console.log('iniciado')

const rawdata = fs.readFileSync('../Data/tickers-only.json');
const tickers = JSON.parse(rawdata);

const trickerPricePath = '../Data/tickers-price.json';
const tickerPriceFile = fs.readFileSync(trickerPricePath);
const tickersPrices = JSON.parse(tickerPriceFile);

const now = new Date
const dataAtual = `${now.getDay()}/${now.getMonth()}/${now.getFullYear()}`;

// atualiza lista de papeis no arquivo de papeis e precos
if (tickersPrices.length != tickers.length) {
    console.log(tickersPrices.length , tickers.length)
    tickers.map(ticker => {
        console.log(ticker.code);
        const temp = tickersPrices.find(tickerPrice => ticker.code === tickerPrice.code);
        if (!temp){
            tickersPrices.push({code: ticker.code, price: '0', date: ''})
        }
    });
}
fs.writeFileSync(trickerPricePath, JSON.stringify(tickersPrices));

//console.log(tickersPrices.filter(item => item.date != dataAtual))

const tickerPricePendding = tickersPrices.filter(item => item.date != dataAtual);

for (const tickerPrice in tickerPricePendding) {
    const element = tickerPricePendding[tickerPrice];
    console.log(`Atualizando ${element.code}`)
    
    const price = await getPrices(element.code);
    console.log(element.code, price);

    if(price != '0') {

        tickersPrices[tickerPrice] = {code: element.code, price: price, date: dataAtual};

         fs.writeFileSync(trickerPricePath, JSON.stringify(tickersPrices));

    } else {
        console.log(`${element.code} sem cotação!`);
    }
    
}


console.log('terminado')
