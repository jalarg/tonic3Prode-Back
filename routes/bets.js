const express = require("express");
const router = express.Router();    
const { getAll, findUserBets, addOneBet } = require("../controllers/bets");

// OBTENER TODAS LAS APUESTAS
router.get("/", getAll);

// OBTENER TODAS LAS APUESTAS DE UN USUARIO
router.get("/search/:id", findUserBets);

// OBTENER TODAS LAS APUESTAS DE UN USUARIO
router.post("/", addOneBet);

module.exports = router;


