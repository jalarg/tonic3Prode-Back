const express = require("express");
const router = express.Router();
const {
  getAll,
  createTournament,
  deleteOne,
  deleteAll,
  getOne,
  getAllTournamentTeams,
  addUsertoTournament,
  updateOne,
  searchTournament,
  bulkCreateATeams
} = require("../controllers/tournaments");

//-----------RUTAS GENERALES -------------//

// OBTENER TODOS LOS TORNEOS 
router.get("/all/:uid", getAll); 

//OBTENER UN TORNEO EN ESPECIFICO 
router.get("/:_id", getOne);

//OBTENER LOS EQUIPOS DEL TORNEO 
router.get("/:_id/teams", getAllTournamentTeams);

//AGREGAR USERS A UN TORNEO
router.put("/:_id/:_id", addUsertoTournament); 

//BUSCAR (SEARCH) UN TORNEO (EN PRUEBA)
router.get("/search/:title", searchTournament);


//-----------RUTAS PARA ADMINISTRADORES -------------//


// AGREGAR UN TORNEO 
router.post("/admin/createTournament", createTournament);

//BULK CREATE DE TEAMS 
router.put("/admin/:_id/createTeams", bulkCreateATeams)

// MODIFICAR UN TORNEO
router.put("/admin/:_id", updateOne);

// BORRAR UN TORNEO
router.delete("/admin/:_id", deleteOne);

//BORRAR TODOS LOS TORNEOS

router.delete("/admin", deleteAll);



module.exports = router;
