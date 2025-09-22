const jwt = require("jsonwebtoken");

const verifySessionToken = (token) => {
  const verify = jwt.verify(token, process.env.JWT_PRIVATE_KEY);

  return token;
};

module.exports = { verifySessionToken };
