import axios from "axios";

export const createChat = (userId) => {
  const { accessToken } = JSON.parse(localStorage.getItem("userInfo"));
  return axios.post(
    "https://fluxtalk.onrender.com/api/v1/chats/",
    {
      userId,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

export const deleteChat = (chatId) => {
  const { accessToken } = JSON.parse(localStorage.getItem("userInfo"));
  return axios.delete(`https://fluxtalk.onrender.com/api/v1/chats/${chatId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

export const createGroupChat = (groupName, userIds) => {
  const { accessToken } = JSON.parse(localStorage.getItem("userInfo"));
  return axios.post(
    "https://fluxtalk.onrender.com/api/v1/chats/group/",
    { name: groupName, users: JSON.stringify(userIds) },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

export const addUserToGroup = (chatId, userId) => {
  const { accessToken } = JSON.parse(localStorage.getItem("userInfo"));
  return axios.put(
    "https://fluxtalk.onrender.com/api/v1/chats/groupadd/",
    { chatId, userId },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

export const removeUserFromGroup = (chatId, userId) => {
  const { accessToken } = JSON.parse(localStorage.getItem("userInfo"));
  return axios.put(
    "https://fluxtalk.onrender.com/api/v1/chats/groupremove",
    { chatId, userId },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

export const renameGroup = (chatId, chatName) => {
  const { accessToken } = JSON.parse(localStorage.getItem("userInfo"));
  return axios.put(
    "https://fluxtalk.onrender.com/api/v1/chats/rename",
    { chatId, chatName },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
