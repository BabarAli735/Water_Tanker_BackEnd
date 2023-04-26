var admin = require("firebase-admin");

var serviceAccount = require("./watertanker-56174-firebase-adminsdk-h17a7-c254ba111a.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://watertanker-56174-default-rtdb.firebaseio.com"
});

module.exports.admin = admin