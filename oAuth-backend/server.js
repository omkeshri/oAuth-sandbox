require("dotenv").config();
const express = require("express");
const app = express();
const logger = require("./middleware/logger");
const redis = require("redis");

const cors = require("cors");

const PORT = process.env.PORT || 8000;

const googleRouter = require("./routes/googleRoutes");

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(logger);

app.use("/api/auth", googleRouter);

const initializeServer = async () => {
  try {
    const client = redis.createClient({
      // Add your Redis configuration here if needed
      // host: 'localhost',
      // port: 6379,
    });

    client.on("error", (err) => {
      console.error("Redis Client Error:", err);
    });

    client.on("connect", () => {
      console.log("Connected to Redis");
    });

    await client.connect();

    app.locals.redis = client;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to initialize server:", error);
    process.exit(1);
  }
};

initializeServer();
