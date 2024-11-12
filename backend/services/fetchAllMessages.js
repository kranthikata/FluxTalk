const Message = require("../models/messageModel");

const fetchAllMessages = async (chatId) => {
  const messages = await Message.find({ chat: chatId })
    .populate("sender", "name image email")
    .populate("chat");
  return messages;
};
module.exports = fetchAllMessages;
