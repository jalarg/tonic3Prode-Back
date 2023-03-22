const express = require("express");
const router = express.Router();
// const { Teams } = require("../db_models");
const { getAll, updateTeams, updateOneTeam, deleteTeams, deleteOneTeam } = require("../controllers/teams");

// OBTENER TODOS LOS EQUIPOS
router.get("/", getAll);

// CREAR TODOS LOS EQUIPOS [BULK CREATE - SEED INICIAL]
router.post("/addteams", updateTeams);

// AGREGAR UN EQUIPO
router.post("/addteam", updateOneTeam);

// BORRAR TODOS LOS EQUIPOS
router.put("/deleteteams", deleteTeams);

// BORRAR TODOS LOS EQUIPOS
router.put("/deleteteam", deleteOneTeam);

module.exports = router;
