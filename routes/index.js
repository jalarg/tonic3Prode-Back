const express = require("express");
const router = express.Router();
const teams = require("./teams");
const prizes = require("./prizes");
const bets = require("./bets");
const users = require("./users");


router.use("/teams", teams);
router.use("/prizes", prizes);
router.use("/bets", bets);
router.use("/users", users);

module.exports = router;