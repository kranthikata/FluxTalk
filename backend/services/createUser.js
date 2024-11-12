const User = require("../models/userModel");

const createUser = async (userObject) => {
  return await User.create(userObject);
};

module.exports = createUser;
