const express = require("express");
const router = express.Router();
const { getUserLog, deleteLogs } = require("../controllers/actionLog");

//-----------RUTAS GENERALES-------------//

// BUSCAR TODOS LOS LOGS
router.get("/actions/", getUserLog);

// BUSCAR ACCIONES DEL LOG DE UN USUARIO
router.get("/actions/:user", getUserLog);

// DELETE ALL THE LOGS // TESTING ROUTE
router.delete("/actions/delete", deleteLogs);



module.exports = router;
