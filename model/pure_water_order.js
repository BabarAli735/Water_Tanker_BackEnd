const mongoose = require("mongoose");
const validator = require("validator");
const bycrypt = require("bcryptjs");
const pure_water_Schema = new mongoose.Schema({
  name:String,
  address:String,
  city:String,
  zipcode:String,
  quantity:String,
  company:String,
  email:String,
  phone:String,
  userId:String
});

const Pure_Water_Order = mongoose.model("pure_water_order", pure_water_Schema);

module.exports = Pure_Water_Order;
