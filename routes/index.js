const express = require("express");
const router = express.Router();

const teams = require("./teams");
const stadiums = require("./stadiums");
const games = require("./games");
const tournaments = require("./tournaments")
const prizes = require("./prizes");
const bets = require("./bets");
const users = require("./users");


router.use("/teams", teams);
router.use("/prizes", prizes);
router.use("/bets", bets);
router.use("/users", users);
router.use("/tournaments", tournaments);
router.use("/games", games);
router.use("/stadiums", stadiums);

module.exports = router;

