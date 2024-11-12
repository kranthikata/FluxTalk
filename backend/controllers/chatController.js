const messages = require("../constants/messages");
const addGroupMemeber = require("../services/addGroupMember");
const checkOneOnOneChatExists = require("../services/checkOneOnOneChatExists");
const createGroupChat = require("../services/createGroupChat");
const createOneOnOneChat = require("../services/createOneOnOneChat");
const fetchChats = require("../services/fetchChats");
const fetchGroupChat = require("../services/fetchGroupChat");
const findOneOnOneChat = require("../services/findOneOnOneChat");
const renameGroupChat = require("../services/renameGroupChat");
const removeGroupMemeber = require("../services/removeGroupMemeber");
const deleteAChat = require("../services/deleteAChat");

const createOrGetChat = async (request, response) => {
  const { userId } = request.body;

  //If userId is not provided
  if (!userId) {
    //Logging for the debugging purpose
    console.log("User Id is not Provided");
    return response.status(400).json({
      error: messages.ERRORS.BAD_REQUEST,
      message: messages.ERROR_MESSAGES.RECIPIENT_ID_MISSING,
    });
  }

  try {
    const existingChat = await checkOneOnOneChatExists(request);

    if (existingChat.length > 0) {
      //Returning the existing chat
      return response.status(200).json({
        message: messages.SUCCESS.CHAT_FOUND,
        chat: existingChat[0],
      });
    } else {
      //Creating a new one-on-one chat
      const chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [request.user._id, userId],
      };

      const createdChat = await createOneOnOneChat(chatData);
      const newChat = await findOneOnOneChat(createdChat);
      return response.status(201).json({
        message: messages.SUCCESS.CHAT_CREATED,
        chat: newChat,
      });
    }
  } catch (error) {
    //Logging for debugging purpose
    console.log("Error during chat creation:", error);
    return response.status(500).json({
      error: messages.ERRORS.INTERNAL_SERVER_ERROR,
      message: messages.ERROR_MESSAGES.CHAT_CREATION_FAILED,
    });
  }
};

const deleteChat = async (request, response) => {
  const { chatId } = request.params;
  if (!chatId) {
    console.log("ChatId not provided");
    response.status(400).json({ message: "Chat Id not found" });
  }

  try {
    await deleteAChat(chatId);
    response
      .status(200)
      .json({ message: messages.SUCCESS.CHAT_DELETED_SUCCESS });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ error: messages.ERRORS.INTERNAL_SERVER_ERROR, message });
  }
};

const fetchAllChats = async (request, response) => {
  try {
    const results = await fetchChats(request.user._id);
    return response.status(200).send(results);
  } catch (error) {
    //Logging for debugging purpose
    console.log("Error Occured:", error);
    return response.status(500).json({
      error: messages.ERRORS.INTERNAL_SERVER_ERROR,
      message: messages.ERROR_MESSAGES.UNABLE_TO_FETCH_CHATS,
    });
  }
};

const createOrGetGroupChat = async (request, response) => {
  if (!request.body.users || !request.body.name) {
    return response.status(400).json({
      error: messages.ERRORS.BAD_REQUEST,
      message: messages.ERROR_MESSAGES.ALL_FIELDS_REQUIRED,
    });
  }

  const users = JSON.parse(request.body.users);

  if (users.length < 2) {
    return response.status(400).json({
      error: messages.ERRORS.BAD_REQUEST,
      message: messages.ERROR_MESSAGES.MORE_USERS_REQUIRED,
    });
  }

  users.push(request.user);

  try {
    const groupChat = await createGroupChat(request, users);
    const getGroupChat = await fetchGroupChat(groupChat._id);
    response.status(200).json({
      message: messages.SUCCESS.GROUP_CREATION_SUCCESS,
      groupChat: getGroupChat,
    });
  } catch (error) {
    //Logging for debugging purpose
    console.log("Error occured during group creation:", error);
    response.status(500).json({
      error: messages.ERRORS.INTERNAL_SERVER_ERROR,
      message: messages.ERROR_MESSAGES.FAILED_TO_CREATE_GROUP_CHAT,
    });
  }
};

const renameGroup = async (request, response) => {
  const { chatId, chatName } = request.body;
  try {
    const updatedChatName = await renameGroupChat(chatId, chatName);
    if (!updatedChatName) {
      return response.status(404).json({
        error: messages.ERRORS.NOT_FOUND,
        message: messages.ERROR_MESSAGES.CHAT_NOT_FOUND,
      });
    }
    response.status(200).json({
      updatedChatName,
    });
  } catch (error) {
    //Logging for debugging purpose
    console.log("Error Occured While Renaming the Group Chat:", error);
    if (error.name === "CastError") {
      return response.status(400).json({
        error: messages.ERRORS.BAD_REQUEST,
        message: messages.ERROR_MESSAGES.INVALID_CHAT_ID,
      });
    }
    return response.status(500).json({
      error: messages.ERRORS.INTERNAL_SERVER_ERROR,
      message: messages.ERROR_MESSAGES.RENAME_GROUP_CHAT_ERROR,
    });
  }
};

const addMemberToGroup = async (request, response) => {
  const { chatId, userId } = request.body;
  try {
    const addedMember = await addGroupMemeber(chatId, userId);

    //Not Added
    if (!addedMember) {
      return response.status(409).json({
        error: messages.ERRORS.CONFLICT,
        message: messages.ERROR_MESSAGES.ALREADY_MEMBER_OR_GROUP_NOT_EXIST,
      });
    }

    //Success
    response.status(200).json({
      addedMember,
    });
  } catch (error) {
    //Logging debugging purpose
    console.log("Error occured while adding a member to group", error);

    //Invalid input error
    if (error.name === "CastError") {
      return response.status(400).json({
        error: messages.ERRORS.BAD_REQUEST,
        message: messages.ERROR_MESSAGES.INVALID_USER_OR_GROUP_ID,
      });
    }

    //Server error
    response.status(500).json({
      error: messages.ERRORS.INTERNAL_SERVER_ERROR,
      message: messages.ERROR_MESSAGES.SERVER_ERROR_ADDING_USER,
    });
  }
};

const removeMemberFromGroup = async (request, response) => {
  const { chatId, userId } = request.body;
  try {
    const removedMember = await removeGroupMemeber(chatId, userId);

    //Not Added
    if (!removedMember) {
      return response.status(404).json({
        error: messages.ERRORS.NOT_FOUND,
        message: messages.ERROR_MESSAGES.MEMBER_NOT_REMOVED,
      });
    }

    //Success
    response.status(200).json({
      removedMember,
    });
  } catch (error) {
    //Logging debugging purpose
    console.log("Error occured while adding a member to group", error);

    //Invalid input error
    if (error.name === "CastError") {
      return response.status(400).json({
        error: messages.ERRORS.NOT_FOUND,
        message: messages.ERROR_MESSAGES.INVALID_USER_OR_GROUP_ID,
      });
    }

    //Server error
    response.status(500).json({
      error: messages.ERRORS.INTERNAL_SERVER_ERROR,
      message: messages.ERROR_MESSAGES.SERVER_ERROR_REMOVING_USER,
    });
  }
};

module.exports = {
  createOrGetChat,
  fetchAllChats,
  createOrGetGroupChat,
  renameGroup,
  addMemberToGroup,
  removeMemberFromGroup,
  deleteChat,
};
