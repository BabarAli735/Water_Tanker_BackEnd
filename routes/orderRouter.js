const express = require("express");
const { createOrder, updateOrderStatus, getOrder, getMyOrder } = require("../controller/orderController");
const router=express.Router()
  //3 ROUTS
  //router.route('/MyOrder').get(getMyOrder)
  router.get("/MyOrder",getMyOrder)
  router.route("/").post(createOrder).patch(updateOrderStatus).get(getOrder)
  module.exports=router