const express = require("express");
const morgan = require("morgan");
const cors=require('cors')
const app = express();
//1 MIDDELE_WARE
app.use(cors({
  origin:'http://127.0.0.1:3000/'
}))
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.static(`${__dirname}/public`));

//2 METHOOD

//3 Routers
const userRouter = require("./routes/userRouters");
const orderRouter = require("./routes/orderRouter");
const profileRouter = require("./routes/profile");
const globalErrorHandler = require("./controller/errorController");

app.use("/api/v1/user", userRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/profile", profileRouter);
app.use("/", (req,res)=>{
  res.send('Hellow world')
})

app.all('*',(req,res,next)=>{
  res.status(404).json({
    status:'fail',
    message:`can't finde ${req.originalUrl} on this server !`
  })
  const err=new Error(`can't finde ${req.originalUrl} on this server !`)
  err.status='fail'
  err.statusCode=404
  next(err)
})
app.use(globalErrorHandler)

module.exports=app
