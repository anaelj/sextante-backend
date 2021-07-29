import {getOwners} from '../mongo.js';
import { saveFile } from './../Utils/saveFile.js';

const owners =  await getOwners();
//const tickers =  await getTickers();

const arrayOwnerTotal = [];

const resultado = owners.map(owner => {
    const name = owner.ownername.replace(',','').replace('.','');
    const temp = arrayOwnerTotal.find( item =>  item.ownername === name) ;
    if (temp) {
        const idx = arrayOwnerTotal.indexOf(temp);
        temp.quantity++;
        arrayOwnerTotal[idx] = temp;
    } else {
        arrayOwnerTotal.push({ownername: name, quantity: 1})
    }   
    return arrayOwnerTotal;
})

const tubas = resultado[0].filter(item => item.quantity > 2 & item.ownername != 'AcoesTesouraria' & item.ownername != 'Outros');

const tickersList = [];

tubas.map(tuba => {
    const tickersListTemp = owners.filter( item => item.ownername.replace(',','').replace('.','') === tuba.ownername )
        .map( item =>  ({code: item.code, ownername: item.ownername}) ) ;
    //console.log(tickersList);
    tickersList.push(tickersListTemp);
})

saveFile(tickersList, '../Data/tubas.json');




//console.log(teste);
//console.log(resultado);
// console.log(owners);
// console.log(tickers);