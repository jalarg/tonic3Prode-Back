const express = require("express");
const router = express.Router();
const {
  getAll,
  searchStadium,
  addStadiums,
  addOneStadium,
  updateOneStadium,
  deleteStadiums,
  deleteOneStadium,
} = require("../controllers/stadiums");

// OBTENER TODOS LOS ESTADIOS
router.get("/", getAll);

//SEARCH DE UN ESTADIO
router.get("/search/:name", searchStadium);

// SUBIR JSON DE ESTADIOS [BULK CREATE - SEED INICIAL]
router.post("/", addStadiums);

// AGREGAR UN ESTADIO
router.post("/add", addOneStadium);

// EDITAR UN ESTADIO
router.put("/:id", updateOneStadium);

// BORRAR TODOS LOS ESTADIOS
router.delete("/", deleteStadiums);

// BORRAR UN ESTADIO
router.delete("/:id", deleteOneStadium);

module.exports = router;
