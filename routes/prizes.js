const express = require("express");
const router = express.Router();
const { getAll, addOnePrize, changeOnePrize } = require("../controllers/prizes");

// OBTENER TODOS LOS EQUIPOS
router.get("/", getAll);

// AGREGAR PREMIOS A UN TORNEO
router.post("/addprize", addOnePrize);

// MODIFICAR PREMIOS A UN TORNEO
router.put("/changeprize/:id", changeOnePrize);

module.exports = router;
