const Chat = require("../models/chatModel");

const renameGroupChat = async (chatId, chatName) => {
  const updatedName = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName,
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
  return updatedName;
};

module.exports = renameGroupChat;
