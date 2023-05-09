const express = require("express");
const {
  register,
  login,
  logout,
  refreshToken,
  socialLogin,
  socialLoginUpdateInfo,
  createToken,
} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh-token", refreshToken);
router.post("/social-login", socialLogin, socialLoginUpdateInfo, createToken);

module.exports = router;
