const express = require("express");
const { getAllUsers, createUser, getUser, updateUser, deleteUser, getAllDrivers } = require("../controller/userController");
const { signUp,signIn, sendOpt,VarifyOtp, SaveFcm ,signOut} = require("../controller/authContoller");
const router=express.Router()


  //3 ROUTS
  router.post('/signup',signUp)
  router.post('/signIn',signIn)
  router.post('/signOut',signOut)
  router.post('/otp',sendOpt)
  router.post('/saveFcm',SaveFcm)
  router.post('/varify_otp',VarifyOtp)
  router.get('/getAllDrivers',getAllDrivers)
  router.route("/").get(getAllUsers).post(createUser);
  router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

  module.exports=router