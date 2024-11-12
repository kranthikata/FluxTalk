const jwt = require("jsonwebtoken");

const generateToken = (id, email) => {
  const payload = { id, email };
  return jwt.sign(payload, process.env.JWT_SECRET);
};

module.exports = generateToken;
