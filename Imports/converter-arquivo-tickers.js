// este aquivo aqui eu criei para converter um json com a lista de papeis em um json limpo, só para melhorar performance
import fs from 'fs';

let rawdata = fs.readFileSync('../Data/tickers.json');
let tickers = JSON.parse(rawdata);

const resume = tickers.filter( item => item.cd_acao.trim() != '').map(item => item.cd_acao);

const jsonFinal = [];

resume.map(item => {
    item.split(',').map(subitem => 
        jsonFinal.push({code : subitem.trim()})
    )
})

fs.writeFileSync('../Data/tickers-only.json', JSON.stringify(jsonFinal));
//console.log(jsonFinal);

//console.log(tickers);