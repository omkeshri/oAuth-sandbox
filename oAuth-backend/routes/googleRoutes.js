const express = require("express");
const router = express.Router();

const { getToken, verifyToken } = require("../controllers/goggleController");

router.post("/google", getToken);
router.get("/verify-token", verifyToken)

module.exports = router;
