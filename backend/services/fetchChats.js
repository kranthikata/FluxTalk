const Chat = require("../models/chatModel");
const User = require("../models/userModel");

const fetchChats = async (id) => {
  const chats = await Chat.find({
    users: { $elemMatch: { $eq: id } },
  })
    .populate("users", "-password")
    .populate("groupAdmin", "-password")
    .populate("lastMessage")
    .sort({ updatedAt: -1 });
  return chats;
};
module.exports = fetchChats;
