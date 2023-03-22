const express = require("express");
const router = express.Router();    
const { getAll, findUserBets, addOneBet, deleteAllBets, deleteOneBet } = require("../controllers/bets");

// OBTENER TODAS LAS APUESTAS
router.get("/", getAll);

// OBTENER TODAS LAS APUESTAS DE UN USUARIO
router.get("/search/:id", findUserBets);

// OBTENER TODAS LAS APUESTAS DE UN USUARIO
router.post("/", addOneBet);


// BORRAR TODOS LOS USUARIOS
router.delete("/deletebets", deleteAllBets);

// BORRAR TODOS LOS USUARIOS
router.delete("/deletebet", deleteOneBet);

module.exports = router;


