const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const verifyPassword = async (email, password) => {
  let user = await User.findOne({ email });
  const isPasswordMatched = await bcrypt.compare(password, user.password);
  user = await User.findOne({ email }).select("-password");
  return [isPasswordMatched, user];
};

module.exports = verifyPassword;
