const express = require("express");
const router = express.Router();
const {
  getAll,
  searchStadium,
  addStadiums,
  addOneStadium,
  deleteOneStadium,
} = require("../controllers/stadiums");

// OBTENER TODOS LOS ESTADIOS
router.get("/", getAll);

//SEARCH DE UN ESTADIO
router.get("/search/:name", searchStadium);

// SUBIR JSON DE ESTADIOS [BULK CREATE - SEED INICIAL]
router.post("/addstadiums", addStadiums);

// AGREGAR UN EQUIPO
router.post("/addstadium", addOneStadium);

// BORRAR TODOS LOS ESTADIOS
router.delete("/deletestadium", deleteOneStadium);

module.exports = router;
