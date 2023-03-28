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
  searchTournament,
  bulkCreateATeams
} = require("../controllers/tournaments");

//-----------RUTAS GENERALES -------------//

// OBTENER TODOS LOS TORNEOS (FUNCIONA)
router.get("/", getAll); 

//OBTENER UN TORNEO EN ESPECIFICO (FUNCIONA)
router.get("/:_id", getOne);

//OBTENER LOS EQUIPOS DEL TORNEO (FUNCIONA)
router.get("/:_id/teams", getAllTournamentTeams);

//OBTENER UN EQUIPO DE UN TORNEO (NO FUNCIONA)
router.get("/:_id/:name/team", getOneTournamentTeam);

//BUSCAR (SEARCH) UN TORNEO (EN PRUEBA)
router.get("/search/:title", searchTournament);

//BULK CREATE DE TEAMS (FUNCIONA)
router.put("/:tournamentId/createTeams", bulkCreateATeams)

// AGREGAR UN TORNEO (FUNCIONA)
router.post("/create", createTournament);

//-----------RUTAS PARA SEED RAPIDO -------------//

// AGREGAR UN TORNEO [SEED INICIAL]
router.post("/", createTournament);

//-----------RUTAS PARA ADMINISTRADORES -------------//

//AGREGAR UN TEAMS AL TORNEO
router.put("admin/:_id/team", assingTeams);

// MODIFICAR UN TORNEO
router.put("admin/:_id", updateOne);

// BORRAR UN TORNEO
router.delete("admin/:_id", deleteOne);

//BORRAR TODOS LOS TORNEOS
router.delete("admin/", deleteAll);


module.exports = router;
