const searchAllUsers = require("../services/searchAllUsers");
const searchUsers = async (request, response) => {
  const username = request.query.search;
  try {
    const usersList = await searchAllUsers(username, request.user._id);
    response.send(usersList);
  } catch (error) {
    //logging for debugging purpose
    console.log(error);
  }
};

module.exports = searchUsers;
