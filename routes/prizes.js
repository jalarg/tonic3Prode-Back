const express = require("express");
const router = express.Router();
const { getAll, addOnePrize, changeOnePrize, deletePrizes, deleteOnePrize } = require("../controllers/prizes");

// OBTENER TODOS LOS EQUIPOS
router.get("/", getAll);

// AGREGAR PREMIOS A UN TORNEO
router.post("/addprize", addOnePrize);

// MODIFICAR PREMIOS A UN TORNEO [PENDIENTE]
router.put("/updateprize/:id", changeOnePrize);

// BORRAR TODOS LOS PREMIOS
router.delete("/deleteallprizes", deletePrizes);

// BORRAR PREMIO
router.delete("/deleteprize", deleteOnePrize);

module.exports = router;
