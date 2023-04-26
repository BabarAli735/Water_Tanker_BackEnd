const mongoose = require("mongoose");
const validator = require("validator");
const bycrypt = require("bcryptjs");
const orderSchema = new mongoose.Schema({
  user: Object,
  driver: Object,
  from: Object,
  to: Object,
  amount: Number,
  discount:Number,
  total:Number,
  orderStatus:String
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
