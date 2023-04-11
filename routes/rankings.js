const express = require("express");
const router = express.Router();
const {
  getAll,
  registerUserToTournament,
  deleteAllPositions,
  deleteOnePosition,
} = require("../controllers/rankings");

//-----------RUTAS GENERALES-------------//

// OBTENER TODOS LOS RANKINGS
router.get("/search/:tournamentId/:uid", getAll);

router.post("/register/:TournamentId/:uid", registerUserToTournament);

//-----------RUTAS PARA ADMINISTRADORES-------------//

// BORRAR TODOS LOS PREMIOS
router.delete("/admin", deleteAllPositions);

// BORRAR UN PREMIO
router.delete("/admin/:id", deleteOnePosition);

module.exports = router;
