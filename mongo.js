import mongoose from "mongoose";

const Database = "mongodb+srv://jaspion:PkJ_e_A4mX6-8Bf@cluster0.7jfyn.mongodb.net/bitFinance?retryWrites=true&w=majority";

mongoose.connect( Database , { useNewUrlParser: true, useUnifiedTopology: true } );

const db = mongoose.connection;

const tikerSchema = new mongoose.Schema({
  code: String,
  name: String,
  tipe: String,
  quantity: String,
  part: String
});

const tickerOwnersSchema = new mongoose.Schema({
  code: String,
  ownername: String,
});

db.on("error", console.error.bind(console, "connection error:"));


export async function newTicker (pTicker) {
    await mongoose.connect(Database);
    console.log('connected');
    const Tiker = mongoose.model("ticker", tikerSchema);
    const result = new Tiker(pTicker);
    result.save();
};

export async function newTickerOwners (pTicker) {
    await mongoose.connect(Database);
    console.log('connected')
    const TikerOwner = mongoose.model("TickerOwners", tickerOwnersSchema);
    const result = new TikerOwner(pTicker);
    result.save();
    console.log('disconnected')
//    mongoose.disconnect();
};

export async function getTickers () {
    await mongoose.connect(Database);
    console.log('connected')
    const tikersModel = mongoose.model("ticker", tikerSchema);
    const tikers = await tikersModel.find({}).sort({ code: 1 });
    console.log('disconnected')
    mongoose.disconnect();
    return tikers;

};

export async function getOwners () {
    await mongoose.connect(Database);
    console.log('connected')
    const tickerOwnersModel = mongoose.model("TickerOwners", tickerOwnersSchema);
    const tickerOwners = await tickerOwnersModel.find({}).sort({ code: 1 });
    console.log('disconnected')
    return tickerOwners;
};


