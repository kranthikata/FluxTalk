import axios from "axios";

export const getContacts = () => {
  const { accessToken } = JSON.parse(localStorage.getItem("userInfo"));
  return axios.get("http://localhost:5000/api/v1/chats/", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};
