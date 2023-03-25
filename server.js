const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  "<passwor>",
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(con=>console.log('DB Connecting Sccessfully '))

const port =process.env.PORT|| 3000

//4 SERVER
app.listen(port, () => {
  console.log("appp runing",port);
});

