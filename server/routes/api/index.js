const express = require("express");
const router = express.Router();
const users = require("./users");

router.use("/auth", users);

module.exports = router;
