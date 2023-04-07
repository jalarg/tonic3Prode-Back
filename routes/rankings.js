const express = require("express");
const router = express.Router();
const {
  getAll,
  deleteAllPositions,
  deleteOnePosition,
} = require("../controllers/rankings");

//-----------RUTAS GENERALES-------------//

// OBTENER TODOS LOS PREMIOS
router.get("/:uid", getAll);

//-----------RUTAS PARA ADMINISTRADORES-------------//

// BORRAR TODOS LOS PREMIOS
router.delete("/admin", deleteAllPositions);

// BORRAR UN PREMIO
router.delete("/admin/:id", deleteOnePosition);

module.exports = router;
