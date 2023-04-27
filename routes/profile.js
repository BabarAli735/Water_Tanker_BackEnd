const express = require("express");
const {EditProfile,getProfile} = require("../controller/profileController");
const router=express.Router()


  //3 ROUTS
  router.route("/").patch(EditProfile).get(getProfile)

  module.exports=router