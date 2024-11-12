const generateToken = require("../config/jwt");
const checkUserExists = require("../services/checkUserExists");
const createUser = require("../services/createUser");
const verifyPassword = require("../services/verifyPassword");
const messages = require("../constants/messages");

const userRegistration = async (request, response) => {
  const { name, email, password, image } = request.body;

  //Checking all fields are provided or not
  if (!name || !email || !password) {
    return response.status(400).json({
      error: messages.ERRORS.BAD_REQUEST,
      message: messages.ERROR_MESSAGES.ALL_FIELDS_REQUIRED,
    });
  }
  try {
    //Logic to check if your already exists
    const isUserExists = await checkUserExists(email);
    if (isUserExists) {
      return response.status(409).json({
        error: messages.ERRORS.CONFLICT,
        message: messages.ERROR_MESSAGES.USER_ALREADY_EXISTS,
      });
    }

    //Creating new user
    const newUser = await createUser({ name, email, password, image });
    return response.status(201).json({
      user: newUser,
      accessToken: generateToken(newUser._id, newUser.email),
    });
  } catch (error) {
    //Logging for debugging purpose
    console.log("User Registration failed:", error);

    return response.status(500).json({
      error: messages.ERRORS.INTERNAL_SERVER_ERROR,
      message: messages.ERROR_MESSAGES.REGISTRATION_FAILED,
    });
  }
};

const userLogin = async (request, response) => {
  const { email, password } = request.body;

  //Checking all fields are provided or not
  if (!email || !password) {
    return response.status(400).json({
      error: messages.ERRORS.BAD_REQUEST,
      message: messages.ERROR_MESSAGES.ALL_FIELDS_REQUIRED,
    });
  }

  try {
    //Checking if user exists
    const userExists = await checkUserExists(email);

    //If no user found
    if (!userExists) {
      return response.status(404).json({
        error: messages.ERRORS.NOT_FOUND,
        message: messages.ERROR_MESSAGES.USER_NOT_FOUND,
      });
    }

    //User found, checking for the correctness of password provided
    const [isPasswordMatched, user] = await verifyPassword(email, password);
    if (isPasswordMatched) {
      const accessToken = generateToken(user._id, email);
      return response.json({
        message: messages.SUCCESS.LOGIN_SUCCESS,
        user,
        accessToken,
      });
    } else {
      return response.status(401).json({
        error: messages.ERRORS.UNAUTHORIZED,
        message: messages.ERROR_MESSAGES.INVALID_USER_CREDENTIALS,
      });
    }
  } catch (error) {
    //Logging for debugging purpose
    console.log("Error Occured During Login:", error);
    return response.status(500).json({
      error: messages.ERRORS.INTERNAL_SERVER_ERROR,
      message: messages.ERROR_MESSAGES.LOGIN_FAILED,
    });
  }
};

module.exports = { userRegistration, userLogin };
