const CatchAsync = require("../utills/catcAsync");
const Users = require("../model/userModel");
const Order = require("../model/order");
const Fcm = require("../model/fcm");
const { admin } = require("../firebase-config");
exports.createOrder = CatchAsync(async (req, res) => {
  const notification_options = {
    priority: "high",
    timeToLive: 60 * 60 * 24,
  };
  const { userId, driverId, from, to } = req.body;
  const user = await Users.findOne({ _id: userId });
  const driver = await Users.findOne({ _id: driverId });
  const fcm = await Fcm.findOne({ driverId: driverId });
   Order.create({
    user: user,
    driver: driver,
    from: from,
    to: to,
    amount: 2000,
    discount: 300,
    total: 1800,
    orderStatus: "pending",
  }).then(async resp=>{
     const message = {
    notification: {
      title: "Order",
      body: "Order Notification",
    },
    data: {
      orderData: resp._id.toString(),
    },
  };
  const options = notification_options;

 await  admin
    .messaging()
    .sendToDevice(fcm.fcmToken, message, options)
    .then((response) => {
      console.log("response", response);
      res.status(201).json({
        status: "Success",
        Order: resp,
      });
    })
    .catch((error) => {
      console.log("error", error);
    });
  }).catch(error=>{
    console.log('Post Order Error',error);
  })
  console.log('driverId',driverId);

});
exports.updateOrderStatus = async (req, res) => {
  console.log(req.body.status);
  try {
    const orderdata = await Order.findOne({ _id: req.body.id });
    const fcm = await Fcm.findOne({ driverId: orderdata.user._id });
    console.log('fcm===',fcm);
    const notification_options = {
      priority: "high",
      timeToLive: 60 * 60 * 24,
    };
    console.log("orderdata", orderdata);
    const order = await Order.updateOne(
      { _id: req.body.id },
      {
        $set: { orderStatus: req.body.status },
      }
    );
    if (req.body.status === "accepted") {
      const message = {
        notification: {
          title: "Order",
          body: "Your Order has been accepted by Driver",
        },
      };
      const options = notification_options;

      await admin
        .messaging()
        .sendToDevice(fcm.fcmToken, message, options)
        .then((response) => {
          console.log("response", response);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
    if (req.body.status === "reject") {
      const message = {
        notification: {
          title: "Order",
          body: "Your Order has been rejected by Driver",
        },
      };
      const options = notification_options;

      await admin
        .messaging()
        .sendToDevice(fcm.fcmToken, message, options)
        .then((response) => {
          console.log("response", response);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
    if (req.body.status === "completed") {
      const message = {
        notification: {
          title: "Order",
          body: "Order has been Completed",
        },
      };
      const options = notification_options;

      await admin
        .messaging()
        .sendToDevice(fcm.fcmToken, message, options)
        .then((response) => {
          console.log("response", response);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
    //Tour.findOne({id:req.params.id})
    res.status(200).json({
      status: "Success",
      order: order,
    });
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: err,
    });
  }
};
exports.getOrder = CatchAsync(async (req, res) => {
  console.log('req.params.id', );
  const id=req.query.id
  const OrderData = await Order.findOne({_id:id});
  res.status(200).json({
    status: "Success",
    OrderData,
  });
});
