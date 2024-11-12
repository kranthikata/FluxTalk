const User = require("../models/userModel");

const searchAllUsers = async (username, id) => {
  const query = {
    $or: [
      { name: { $regex: username, $options: "i" } },
      { email: { $regex: username, $options: "i" } },
    ],
  };
  const usersList = await User.find(query).find({ _id: { $ne: id } });
  return usersList;
};

module.exports = searchAllUsers;
