import {newTicker} from '../mongo.js';
import {readCSVFile} from '../readCSV.js';


const tickers = await readCSVFile('./assets/IBOV.csv');

// importa tickers no banco
tickers && tickers.map( ticker => newTicker(ticker));



