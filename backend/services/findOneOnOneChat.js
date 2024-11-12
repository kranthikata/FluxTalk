const Chat = require("../models/chatModel");

const findOneOnOneChat = async (chat) => {
  return await Chat.findOne({ _id: chat._id }).populate("users", "-password");
};

module.exports = findOneOnOneChat;
