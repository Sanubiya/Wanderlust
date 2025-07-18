const express = require("express");
const router = express.Router({ mergeParams: true });
const Wrapasync = require("../utils/Wrapasync");
const { savedRedirectUrl } = require("../middleware");
const usersController=require("../Controllers/users")

router.get("/signup",usersController.signup);
router.post("/signup", Wrapasync(usersController.signupPost));

router.get("/login",usersController.login);

router.post("/login",savedRedirectUrl, usersController.loginPost);

router.get("/logout",usersController.logout)

module.exports = router;