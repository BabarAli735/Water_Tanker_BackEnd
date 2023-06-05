const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });
const app = require("./app");

const DB = 'mongodb+srv://babarmobiledeveloper124:cKgzqE6ze53VaEc0@cluster0.mhna8gy.mongodb.net/test'
const DB1 =
  "mongodb://babarmobiledeveloper124:cKgzqE6ze53VaEc0@ac-ehw7vmd-shard-00-00.mhna8gy.mongodb.net:27017,ac-ehw7vmd-shard-00-01.mhna8gy.mongodb.net:27017,ac-ehw7vmd-shard-00-02.mhna8gy.mongodb.net:27017/?replicaSet=atlas-13h40d-shard-0&ssl=true&authSource=admin";
mongoose
  .connect(DB1, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => console.log("DB Connecting Sccessfully "));

const port = process.env.PORT || 3000;

//4 SERVER
app.listen(port, () => {
  console.log("appp runing", port);
});
