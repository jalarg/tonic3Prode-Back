const express = require("express");
const router = express.Router();
const teams = require("./teams");
const games = require("./games");

router.use("/teams", teams);
router.use("/games", games);

module.exports = router;
