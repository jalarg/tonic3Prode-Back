const express = require("express");
const router = express.Router();
const {
  getAll,
  getAGameById,
  adminCreateAGame,
  adminEditAGame,
  adminDeleteAGame,
} = require("../controllers/games");

// find all the games
router.get("/", getAll);

// find a game by ID
router.get("/:id", getAGameById);

//admin create a game
router.post("/admin/create", adminCreateAGame); //esta no iría

//admin edit a game
router.put("/admin/edit/:id", adminEditAGame);

//admin delete a game
router.delete("/admin/delete/:id", adminDeleteAGame); //esta no iría

module.exports = router;
