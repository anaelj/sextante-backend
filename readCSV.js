
import csv from 'csvtojson';
const csvFilePath = './assets/IBOV.csv';

export async function readCSVFile (fileName)  {

    return await csv({delimiter: ';'}).fromFile(fileName);
} 
