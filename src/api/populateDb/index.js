const express = require("express");
const { PopulateUsers, PopulateOrders } = require("./populate");


const router = express.Router();

router.post("/populateUsers",(req,res) => {
    PopulateUsers(req,res);
})

router.post("/populateOrders",(req,res) => {
    PopulateOrders(req,res);
})

module.exports = router;