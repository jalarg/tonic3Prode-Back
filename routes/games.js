const express = require("express");
const router = express.Router();
const {
  getAll,
  getGamesByTournamentId,
  adminCreateAGame,
  bulkCreateAGames,
  addOneResult,
  addManyResults,
  generateFutureGames,
  adminEditAGame,
  adminDeleteAGame,
  deleteGames,
} = require("../controllers/games");

//----------- RUTAS GENERALES -------------//

// find all the games
router.get("/", getAll);

// find games by tournament ID
router.get("/:id", getGamesByTournamentId);

//-----------RUTAS PARA ADMINISTRADORES-------------//

// crate a stage of many games
router.post("/admin/:id", bulkCreateAGames);

// update many results 
router.put("/admin", addManyResults);

// update one result
router.put("/admin/result/:id", addOneResult);

// Create future games [PENDIENTE LOGICA]
router.get("/admin/newstage/:id",  generateFutureGames)

//admin create a game
router.post("/admin/create", adminCreateAGame); //esta no iría

//admin edit a game
router.put("/admin/edit/:id", adminEditAGame);

//admin delete a game
router.delete("/admin/delete/:id", adminDeleteAGame); //esta no iría

//admin delete all games [NUEVA RUTA]
router.delete("/admin", deleteGames); 

module.exports = router;
