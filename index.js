const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const populate = require("./src/api/populateDb/index");
const common = require("./src/api/common/index");

app.use(express.urlencoded({extended:false}));
app.use(express.json());

mongoose.connect(`mongodb+srv://anchit:${process.env.MONGO_PASSWORD}@cluster0.lpn0o.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
}).then((_) => console.log("connected")).catch((err) => console.log(err));

// API to populate data on MongoDB from json file
app.use("/api",populate);

//API to fetch requested data
app.use("/api",common);

app.listen(4000, () => console.log("App is running on port 4000"));