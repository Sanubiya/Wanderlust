const mongoose = require('mongoose');
const MONGO_URL="mongodb://127.0.0.1:27017/Wanderlust";
const initData=require("../init/data.js");
const Listing = require('../models/listing.js');
main().then(()=>{
    console.log("Connect with DB");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
};

const initDB=async()=>{
    await Listing.deleteMany({})
    initData.data=initData.data.map((obj)=>({...obj,owner:"686f9a01942c8e9558f5ce73"}))
    await Listing.insertMany(initData.data);
}
initDB();