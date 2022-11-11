const express = require("express");
const router = express.Router();
const TokenController = require('../src/handlers/token-controller');
const tokenController = new TokenController();

router.post("/", tokenController.addToken );

module.exports = router;