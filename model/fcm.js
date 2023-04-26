const mongoose = require("mongoose");
const validator = require("validator");
const bycrypt = require("bcryptjs");
const fcmSchema = new mongoose.Schema({
    driverId:String,
  fcmToken: {
    type:String,
    require:[true,`Can't access driver device token`],
    unique:true,
},
});

const Fcm = mongoose.model("Fcm", fcmSchema);

module.exports = Fcm;
