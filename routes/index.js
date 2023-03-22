const express = require("express");
const router = express.Router();
const teams = require("./teams");
const tournaments = require("./tournaments")


router.use("/teams", teams);
router.use("/tournaments", tournaments);



module.exports = router;