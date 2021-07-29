import fs from "fs";
import { getIndicatorsFundamentus } from "../Scrap/indicators-fundamentus.js";

console.log("iniciado");

const rawdata = fs.readFileSync("../Data/tickers-price.json");
const tickers = JSON.parse(rawdata);

const trickerIndicatorPath = "../Data/tickers-indicators.json";
const tickerIndicatorFile = fs.readFileSync(trickerIndicatorPath);
const tickersIndicators = JSON.parse(tickerIndicatorFile);

const now = new Date();
const dataAtual = `${now.getDay()}/${now.getMonth()}/${now.getFullYear()}`;

// atualiza lista de papeis no arquivo de papeis e precos
if (tickersIndicators.length != tickers.length) {
  tickers.map((ticker) => {
    //console.log(ticker.code);
    const temp = tickersIndicators.find(
      (tickerIndicator) => ticker.code === tickerIndicator.code
    );
    if (!temp) {
      tickersIndicators.push({
        code: ticker.code,
        price: ticker.price,
        date: "",
      });
    }
  });
}
fs.writeFileSync(trickerIndicatorPath, JSON.stringify(tickersIndicators));

//console.log(tickersIndicators.filter(item => item.date != dataAtual))

const tickerIndicatorPendding = tickersIndicators.filter(
  (item) => item.price > 0
);

for (const tickerIndicator in tickerIndicatorPendding) {
  const element = tickerIndicatorPendding[tickerIndicator];

  const indicators = await getIndicatorsFundamentus(element.code);

  if (indicators) {
    
    const newIndicators = {
      ...element?.indicators,
      ...indicators,
    };

    const objIndex = tickersIndicators.findIndex(
      (item) => item.code === element.code
    );

    console.log(
      `Atualizando ${element.code} ::: ${objIndex} de ${tickersIndicators.length}`
    );

    tickersIndicators[objIndex] = {
      code: element.code,
      price: element.price,
      date: dataAtual,
      indicators: newIndicators,
    };
    fs.writeFileSync(trickerIndicatorPath, JSON.stringify(tickersIndicators));
  } else {
    console.log(`${element.code} sem cotação!`);
  }
}

// console.log('terminado')
