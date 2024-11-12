import axios from "axios";

export const getMessages = (chatId) => {
  const { accessToken } = JSON.parse(localStorage.getItem("userInfo"));
  return axios.get(`http://localhost:5000/api/v1/messages/${chatId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

export const sendMessage = (message, chatId) => {
  const { accessToken } = JSON.parse(localStorage.getItem("userInfo"));
  return axios.post(
    `http://localhost:5000/api/v1/messages`,
    { content: message, chatId },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
