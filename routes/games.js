const express = require("express");
const router = express.Router();
const {
  getAll,
  getGamesByTournamentId,
  bulkCreateAGames,
  addManyResults,
  bulkUpdateDate,
  adminEditAGame,
  adminDeleteAGame,
  deleteGames,
  adminUpdateRanking
} = require("../controllers/games");

//----------- RUTAS GENERALES -------------//

// find all the games
router.get("/:uid", getAll);

// find games by tournament ID
router.get("/search/:_id/:uid", getGamesByTournamentId);

//-----------RUTAS PARA ADMINISTRADORES-------------//

// crate a stage of many games
router.post("/admin/:id", bulkCreateAGames);

// update many results 
router.put("/admin/:id", addManyResults);

// update many results 
router.put("/admin/ranking/:id", adminUpdateRanking);

//admin edit a game
router.put("/admin/addresults/:id", adminEditAGame);

//admin edit many dates
router.put("/admin/edit/dates", bulkUpdateDate);

//admin delete a game
router.delete("/admin/delete/:id", adminDeleteAGame); 

//admin delete all games 
router.delete("/admin", deleteGames); 

module.exports = router;
