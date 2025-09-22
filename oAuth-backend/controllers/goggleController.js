const { default: axios } = require("axios");
const { createSessionToken } = require("../utils/createSessionToken");

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

    await redis.set("session_token", sessionToken, {
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
    res.send("hh")
  } catch (err) {
    res.status(err.status).json({
      message: err.message,
    });
  }
};
