const userData = require("../../staticData/userData.json");
const orderData = require("../../staticData/orderData.json");
const mongoose = require('mongoose');
const userSchema = require("../../schema/userSchema");
const orderSchema = require("../../schema/orderSchema");

const PopulateUsers = (req,res) => {
    try{
        const userModal = mongoose.model('Users',userSchema);
        //Looping over the user data json and pushing it to MongoDB
        userData.forEach((user) => {
            new userModal({
                _id: user.userId,
                name: user.name
            }).save((err,result) => {
                if(err) throw err;
                if(result){
                    console.log(result);
                }
            } )
        })
        return res.status(200).send({msg: "Database Uploaded"})
    }catch(err){
        console.log(err);
        return res.status(500).send({msg: `${err}`})
    }
}

const PopulateOrders = (req,res) => {
    try{
        const orderModal = mongoose.model('Orders',orderSchema);
        //Looping over the orders data json and pushing it to MongoDB
        orderData.forEach((order) => {
            new orderModal({
                _id: order.orderId,
                userId: order.userId,
                subTotal: order.subTotal,
                date: order.date,
            }).save((err,result) => {
                if(err) throw err;
                if(result){
                    console.log(result);
                }
            })
        })
        return res.status(200).send({msg: "Orders Table Populated"});
    }catch(err){
        console.log(err);
        return res.status(200).send({msg: `${err}`})
    }
}

module.exports = {
    PopulateUsers,
    PopulateOrders
};