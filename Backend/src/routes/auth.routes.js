const express = require("express");
const { registerUser, loginUser, getMe, logoutUser } = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/get-me", authMiddleware, getMe)
router.get("/logout", authMiddleware, logoutUser)
module.exports = router