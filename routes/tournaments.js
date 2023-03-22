const express = require("express");
const router = express.Router();
const {
  getAll,
  createTournament,
  assingTeams,
  deleteOne
} = require("../controllers/tournaments");

// OBTENER TODOS LOS TORNEOS [SEED INICIAL]
router.get("/", getAll);

// AGREGAR UN TORNEO
router.post("/", createTournament);

// AGREGAR TEAMS AL TORNEO
router.put("/:_id", assingTeams);

// BORRAR UN TORNEO
router.delete("/:_id", deleteOne);

module.exports = router;
