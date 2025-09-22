const { default: axios } = require("axios");
const { createSessionToken } = require("../utils/createSessionToken");
const { verifySessionToken } = require("../utils/verifySessionToken");

exports.getToken = async (req, res) => {
  const redis = req.app.locals.redis;
  try {
    const response = await axios.post(
      "https://oauth2.googleapis.com/token",
      new URLSearchParams({
        grant_type: "authorization_code",
        code: req.body.code,
        client_id: process.env.GOOGLE_AUTH_CLIENT_ID,
        client_secret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
        redirect_uri: process.env.REDIRECT_URI,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token, refresh_token, expires_in } = response.data;
    const profileRes = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const sessionToken = createSessionToken(profileRes.data, expires_in);

    await redis.set(sessionToken, profileRes.data.email, {
      EX: expires_in,
    });

    res.status(200).json({
      sessionToken: sessionToken,
      expiresIn: expires_in,
    });
  } catch (err) {
    res.json({
      error: err.message,
    });
  }
};

exports.verifyToken = async (req, res) => {
  try {
    console.log(req.headers);
    const redis = req.app.locals.redis;
    const session_token = req.headers?.authorization?.slice(15);
    const token_data = verifySessionToken(session_token);

    const redis_data = await redis.get(session_token);
    console.log(token_data.email, redis_data);

    if (token_data?.email === redis_data) {
      res.status(200).json({ message: "Verified User" });
    } else throw new Error({ status: 401, message: "un" });
  } catch (err) {
    res.status(err?.status || 401).json({
      message: err?.message || "Unauthorized",
    });
  }
};
