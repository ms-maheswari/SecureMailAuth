const express = require("express");
const router = new express.Router();
const controllers = require("../controllers/userControllers");


// Routes
router.post("/api/user/register",controllers.userregister);
router.post("/api/user/sendotp",controllers.userOtpSend);
router.post("/api/user/login",controllers.userLogin);



module.exports = router;
