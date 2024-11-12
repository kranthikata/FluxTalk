const User = require("../models/userModel");

const checkUserExists = async (email) => {
  const user = await User.findOne({ email });
  if (user) {
    return true;
  }
  return false;
};

module.exports = checkUserExists;
