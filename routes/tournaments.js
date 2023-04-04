const express = require("express");
const router = express.Router();
const {
  getAll,
  createTournament,
  deleteOne,
  deleteAll,
  getOne,
  getAllTournamentTeams,
  getOneTournamentTeam,
  addUsertoTournament,
  updateOne,
  searchTournament,
  bulkCreateATeams
} = require("../controllers/tournaments");

//-----------RUTAS GENERALES -------------//

// OBTENER TODOS LOS TORNEOS (FUNCIONA)
router.get("/all/:uid", getAll); 

//OBTENER UN TORNEO EN ESPECIFICO (FUNCIONA)
router.get("/:_id", getOne);

//OBTENER LOS EQUIPOS DEL TORNEO (FUNCIONA)
router.get("/:_id/teams", getAllTournamentTeams);

//OBTENER UN EQUIPO DE UN TORNEO (NO FUNCIONA)
router.get("/:_id/:name/team", getOneTournamentTeam);

//AGREGAR USERS A UN TORNEO
router.post("/:_id/user", addUsertoTournament); 

//BUSCAR (SEARCH) UN TORNEO (EN PRUEBA)
router.get("/search/:title", searchTournament);


//-----------RUTAS PARA ADMINISTRADORES -------------//


// AGREGAR UN TORNEO 
router.post("/admin/createTournament", createTournament);

//BULK CREATE DE TEAMS (FUNCIONA)
router.put("/admin/:_id/createTeams", bulkCreateATeams)

// MODIFICAR UN TORNEO
router.put("/admin/:_id", updateOne);

// BORRAR UN TORNEO
router.delete("/admin/:_id", deleteOne);

//BORRAR TODOS LOS TORNEOS

router.delete("/admin", deleteAll);



module.exports = router;
