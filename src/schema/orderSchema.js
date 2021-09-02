const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    _id: Number,
    userId: Number,
    subTotal: Number,
    date: Date
});

module.exports = orderSchema;