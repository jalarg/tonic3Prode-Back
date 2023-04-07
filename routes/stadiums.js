const express = require("express");
const router = express.Router();
const {
  getAll,
  searchStadium,
  bulkCreateStadiums,
  addOneStadium,
  updateOneStadium,
  deleteStadiums,
  deleteOneStadium,
} = require("../controllers/stadiums");

//-----------RUTAS GENERALES-------------//

// RUTAS PARA BUSCAR TODOS LOS ESTADIOS
router.get("/", getAll);

//SEARCH DE UN ESTADIO POR NOMBRE
router.get("/search/:name/:uid", searchStadium);

// SUBIR JSON DE ESTADIOS [BULK CREATE - SEED INICIAL]
router.post("/", bulkCreateStadiums);

//-----------RUTAS PARA ADMINISTRADORES-------------//

// AGREGAR UN ESTADIO
router.post("/admin/add", addOneStadium);

// EDITAR UN ESTADIO
router.put("/admin/:id", updateOneStadium);

// BORRAR TODOS LOS ESTADIOS
router.delete("/admin/", deleteStadiums);

// BORRAR UN ESTADIO
router.delete("/admin/:id", deleteOneStadium);

module.exports = router;
