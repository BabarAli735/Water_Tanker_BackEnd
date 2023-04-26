const express = require("express");
const { createOrder, updateOrderStatus, getOrder } = require("../controller/orderController");
const router=express.Router()


  //3 ROUTS
  router.route("/").post(createOrder).patch(updateOrderStatus).get(getOrder)

  module.exports=router