import axios from "axios";

export const getContacts = () => {
  const { accessToken } = JSON.parse(localStorage.getItem("userInfo"));
  return axios.get("https://fluxtalk.onrender.com/api/v1/chats/", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};
