const Chat = require("../models/chatModel");

const addGroupMemeber = async (chatId, userId) => {
  const addedMember = Chat.findByIdAndUpdate(
    chatId,
    { $push: { users: userId } },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
  return addedMember;
};

module.exports = addGroupMemeber;
