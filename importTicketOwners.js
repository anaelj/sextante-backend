import { getOwners } from "./Scrap/owner.js";
import {getTickers, newTickerOwners } from './mongo.js';

const tickers  = await getTickers();

tickers.map( async ticker => {
    const owners = await getOwners(ticker.code); 

    for (let i = 0; i < owners.length; i++) {
        const element = owners[i];
        const newTickerOwner = {code: ticker.code, ownername: element};
//        console.log(newTickerOwner);
        newTickerOwners(newTickerOwner);
//        console.log(element)
    }
})


// const owners = await getOwners('BBDC4');



// console.log(owners);
//console.log(owners[0]);
