const jwt = require("jsonwebtoken");
const messages = require("../constants/messages");
const findUserById = require("../services/findUserById");

const authMiddleware = (request, response, next) => {
  let jwtToken;
  const authHeader = request.headers.authorization;
  if (authHeader !== undefined) {
    jwtToken = authHeader.split(" ")[1];
  } else {
    return response.status(401).json({
      error: messages.ERRORS.UNAUTHORIZED,
      message: messages.ERROR_MESSAGES.MISSING_AUTH_HEADER,
    });
  }
  if (jwtToken === undefined) {
    return response.status(401).json({
      error: messages.ERRORS.UNAUTHORIZED,
      message: messages.ERROR_MESSAGES.MISSING_AUTH_TOKEN,
    });
  } else {
    jwt.verify(jwtToken, process.env.JWT_SECRET, async (error, payload) => {
      if (error) {
        return response.status(401).json({
          error: messages.ERRORS.UNAUTHORIZED,
          message: messages.ERROR_MESSAGES.INVALID_JWT_TOKEN,
        });
      } else {
        request.user = await findUserById(payload.id);
        next();
      }
    });
  }
};

module.exports = authMiddleware;
