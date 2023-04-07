const express = require("express");
const router = express.Router();

const teams = require("./teams");
const stadiums = require("./stadiums");
const games = require("./games");
const tournaments = require("./tournaments")
const prizes = require("./prizes");
const bets = require("./predictions");
const users = require("./users");
const actionLog = require("./actionLog");
const rankings = require("./rankings");

router.use("/teams", teams);
router.use("/prizes", prizes);
router.use("/predictions", bets);
router.use("/users", users);
router.use("/tournaments", tournaments);
router.use("/games", games);
router.use("/stadiums", stadiums);
router.use("/rankings", rankings);
router.use("/log", actionLog);

module.exports = router;

