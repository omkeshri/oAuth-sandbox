const jwt = require("jsonwebtoken");

const createSessionToken = (details, expiry) => {
  const token = jwt.sign(
    { email: details.email },
    process.env.JWT_PRIVATE_KEY,
    {
      expiresIn: expiry,
    }
  );
  return token;
};

module.exports = { createSessionToken };
