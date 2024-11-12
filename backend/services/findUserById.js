const User = require("../models/userModel");

const findUserById = async (id) => {
  return await User.findById(id).select("-password");
};

module.exports = findUserById;
