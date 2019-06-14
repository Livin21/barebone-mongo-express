const express = require("express");
const router = express.Router();
const usersController = require("../../db/controllers/User");
const respond = require("../../utils/Responder");

// Signup
router.post("/signup", async (req, res) => {
  let response = await usersController.signup(
    req.body.username,
    req.body.password
  );
  respond(res, response.status, response);
});

// Login
router.post("/login", async (req, res) => {
  let response = await usersController.login(
    req.body.username,
    req.body.password
  );
  respond(res, response.status, response);
});

module.exports = router;
