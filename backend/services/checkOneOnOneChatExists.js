const Chat = require("../models/chatModel");
const User = require("../models/userModel");

const checkOneOnOneChatExists = async (request) => {
  let isChatExists = await Chat.find({
    isGroupChat: false,
    users: { $all: [request.user._id, request.body.userId] },
  })
    .populate("users", "-password")
    .populate("lastMessage");
  isChatExists = await User.populate(isChatExists, {
    path: "lastMessage.sender",
    select: "name image email",
  });
  return isChatExists;
};

module.exports = checkOneOnOneChatExists;
