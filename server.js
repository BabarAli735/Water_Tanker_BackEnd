const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });
const app = require('./app');

const DB = 'mongodb+srv://babarmobiledeveloper124:cKgzqE6ze53VaEc0@cluster0.mhna8gy.mongodb.net/test'
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

