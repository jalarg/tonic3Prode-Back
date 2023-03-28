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

//-----------RUTAS GENERALES -------------//

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

//-----------RUTAS PARA SEED RAPIDO -------------//

// AGREGAR UN TORNEO [SEED INICIAL]
router.post("/", createTournament);

//-----------RUTAS PARA ADMINISTRADORES -------------//

//AGREGAR TEAMS AL TORNEO
router.put("admin/:_id/team", assingTeams);

// MODIFICAR UN TORNEO
router.put("admin/:_id", updateOne);

// BORRAR UN TORNEO
router.delete("admin/:_id", deleteOne);

//BORRAR TODOS LOS TORNEOS
router.delete("admin/", deleteAll);

module.exports = router;
