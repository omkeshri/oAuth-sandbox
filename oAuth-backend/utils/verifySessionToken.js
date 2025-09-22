const jwt = require("jsonwebtoken");

const verifySessionToken = (token) => {
  try {
    const token_data = jwt.verify(
      token,
      process.env.JWT_PRIVATE_KEY
    );
    return token_data;
  } catch (err) {
    throw err;
  }
};

module.exports = { verifySessionToken };
