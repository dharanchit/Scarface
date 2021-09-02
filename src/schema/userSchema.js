const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    _id: Number,
    name: String,
    noOfOrders: Number
});

module.exports = userSchema;