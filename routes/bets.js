const express = require("express");
const router = express.Router();    
const { getAll, findUserBets, addOneBet, deleteAllBets, deleteOneBet } = require("../controllers/bets");

// OBTENER TODAS LAS APUESTAS
router.get("/", getAll);

// OBTENER TODAS LAS APUESTAS DE UN USUARIO
router.get("/search/:id", findUserBets);

// AGREGAR UNA APUESTA
router.post("/", addOneBet);

// BORRAR TODAS LAS APUESTAS
router.delete("/deletebets", deleteAllBets);

// BORRAR UNA APUESTA
router.delete("/deletebet", deleteOneBet);

module.exports = router;


