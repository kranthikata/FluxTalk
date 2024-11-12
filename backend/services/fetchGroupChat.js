const Chat = require("../models/chatModel");

const fetchGroupChat = async (id) => {
  const groupChat = await Chat.findOne({ _id: id })
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
  return groupChat;
};

module.exports = fetchGroupChat;
