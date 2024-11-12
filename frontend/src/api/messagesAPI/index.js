import axios from "axios";

export const getMessages = (chatId) => {
  const { accessToken } = JSON.parse(localStorage.getItem("userInfo"));
  return axios.get(`https://fluxtalk.onrender.com/api/v1/messages/${chatId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

export const sendMessage = (message, chatId) => {
  const { accessToken } = JSON.parse(localStorage.getItem("userInfo"));
  return axios.post(
    `https://fluxtalk.onrender.com/api/v1/messages`,
    { content: message, chatId },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
