const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const populate = require("./src/api/populateDb/index");
const common = require("./src/api/common/index");

app.use(express.urlencoded({extended:false}));
app.use(express.json());

const PORT = process.env.PORT || 4000;

const connectToDb = async() => {
    try{
        await mongoose.connect(`mongodb+srv://anchit:${process.env.MONGO_PASSWORD}@cluster0.lpn0o.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`,{
           useNewUrlParser:true,
           useUnifiedTopology:true,
        });
        } catch(err){
           throw err;
        }
}

connectToDb();
// API to populate data on MongoDB from json file
app.use("/api",populate);

//API to fetch requested data
app.use("/api",common);

app.listen(PORT, () => console.log(`App is running on port ${PORT}`));