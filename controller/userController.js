const Users = require("../model/userModel");
const CatchAsync = require("../utills/catcAsync");
exports.getAllUsers = CatchAsync(async (req, res) => {
  const users = await Users.find();
  res.status(200).json({
    status: "Success",
    results: users.length,
    data: {
      users,
    },
  });
});
exports.getUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet define",
  });
};
exports.createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet define",
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet define",
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet define",
  });
};
