const express = require("express");
const router = express.Router();
const { getAll, addOnePrize, changeOnePrize, deletePrizes, deleteOnePrize } = require("../controllers/prizes");

//-----------RUTAS GENERALES-------------//

// OBTENER TODOS LOS PREMIOS    
router.get("/:uid", getAll);


//-----------RUTAS PARA ADMINISTRADORES-------------//

// AGREGAR PREMIOS A UN TORNEO
router.post("/admin/:uid/addprize", addOnePrize);

// MODIFICAR PREMIOS A UN TORNEO [PENDIENTE]
router.put("/admin/:id/:uid", changeOnePrize);

// BORRAR TODOS LOS PREMIOS
router.delete("/admin", deletePrizes);

// BORRAR UN PREMIO
router.delete("/admin/:id", deleteOnePrize);

module.exports = router;
