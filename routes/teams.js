const express = require("express");
const router = express.Router();
// const { Teams } = require("../db_models");
const { getAll, updateTeams, updateOneTeam } = require("../controllers/teams");

// OBTENER TODOS LOS EQUIPOS
router.get("/", getAll);

// CREAR EQUIPOS [BULK CREATE - SEED INICIAL]
router.post("/", updateTeams);

// AGREGAR UN EQUIPO
router.post("/addteam", updateOneTeam);

module.exports = router;
