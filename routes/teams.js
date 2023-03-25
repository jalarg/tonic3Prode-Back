const express = require("express");
const router = express.Router();
const { getAll, updateTeams, updateOneTeam, deleteTeams, deleteOneTeam } = require("../controllers/teams");

// OBTENER TODOS LOS EQUIPOS
router.get("/", getAll);

// CREAR TODOS LOS EQUIPOS [BULK CREATE - SEED INICIAL]
router.post("/", updateTeams);

// AGREGAR UN EQUIPO
router.post("/:id", updateOneTeam);

// BORRAR TODOS LOS EQUIPOS
router.delete("/", deleteTeams);

// BORRAR UN EQUIPO
router.delete("/:id", deleteOneTeam);


module.exports = router;
