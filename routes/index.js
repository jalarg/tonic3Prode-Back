const express = require("express");
const router = express.Router();
const teams = require("./teams");


router.use("/teams", teams);



module.exports = router;