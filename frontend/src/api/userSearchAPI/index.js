import axios from "axios";

export const searchUsers = (searchInput) => {
  const { accessToken } = JSON.parse(localStorage.getItem("userInfo"));
  const url = `http://localhost:5000/api/v1/users?search=${searchInput}`;
  return axios.get(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};
