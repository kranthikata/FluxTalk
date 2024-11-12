import axios from "axios";

export const signUpUser = (userData) => {
  return axios.post("http://localhost:5000/api/v1/auth/register", userData, {
    headers: { "Content-Type": "application/json" },
  });
};

export const loginUser = (userData) => {
  return axios.post("http://localhost:5000/api/v1/auth/login", userData, {
    headers: { "Content-Type": "application/json" },
  });
};
