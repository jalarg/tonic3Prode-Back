const express = require("express");
const router = express.Router();
const {
  getAll,
  createTournament,
  assingTeams,
  deleteOne,
  deleteAll,
  getOne,
  getAllTournamentTeams,
  getOneTournamentTeam,
  updateOne,
  searchTournament
} = require("../controllers/tournaments");

// OBTENER TODOS LOS TORNEOS
router.get("/", getAll);

//OBTENER UN TORNEO EN ESPECIFICO
router.get("/:_id", getOne);

//OBTENER LOS EQUIPOS DEL TORNEO
router.get("/:_id/teams", getAllTournamentTeams);

//OBTENER UN EQUIPO DEL TORNEO
router.get("/:_id/:name/team", getOneTournamentTeam);

//BUSCAR UN TORNEO
router.get("/search/:title", searchTournament);

// AGREGAR UN TORNEO [SEED INICIAL]
router.post("/", createTournament);

//AGREGAR TEAMS AL TORNEO
router.put("/:_id/team", assingTeams);

// MODIFICAR UN TORNEO
router.put("/:_id", updateOne);

// BORRAR UN TORNEO
router.delete("/:_id", deleteOne);

//BORRAR TODOS LOS TORNEOS
router.delete("/", deleteAll);

module.exports = router;
