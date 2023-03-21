const express = require("express");
const router = express.Router();
const { Teams } = require("../db_models/teams");


router.get("/", (req, res, next) => {
  Teams.findAll()
    .then((teams) => {
      return res.send(teams);
    })
    .catch(next);
});

module.exports = router;