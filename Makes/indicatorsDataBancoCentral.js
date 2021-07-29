import fs  from "fs";

import { getSelicBancoCentral } from "../Scrap/indicators-bancocentral.js";

console.log("iniciado");

const parametersPath = "../Data/parameters.json";
const fileExists = fs.existsSync(parametersPath);

let parameters = { params: { selic: { value: 0, date: "" } } };
if (!fileExists) {
  fs.writeFileSync(parametersPath, JSON.stringify(parameters));
}

const parametersFile = fs.readFileSync(parametersPath);

parameters = JSON.parse(parametersFile);

// console.log(parameters);

const now = new Date();
const today = new Date().toLocaleDateString();

const selicValue = await getSelicBancoCentral();

parameters.params.selic.value = selicValue;
parameters.params.selic.date = today;

fs.writeFileSync(parametersPath, JSON.stringify(parameters));

// fs.writeFileSync(trickerIndicatorPath, JSON.stringify(tickersIndicators));

console.log("terminado");
