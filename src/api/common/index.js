const express = require('express');
const { fetchAllData, updateUsersDB } = require('./fetchData');

const router = express.Router();

router.get("/fetchTransactionData",(req,res) => {
    fetchAllData(req,res);
})

router.post("/updateUserData",(req,res) => {
    updateUsersDB(req,res);
})

module.exports = router;