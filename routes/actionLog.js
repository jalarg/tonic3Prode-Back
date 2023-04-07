const express = require("express");
const router = express.Router();
const { getLogs, getUserLog, deleteLogs } = require("../controllers/actionLog");

//-----------RUTAS GENERALES-------------//

// GET ALL THE LOGS
router.get("/actions/", getLogs);

// BUSCAR ACCIONES DEL LOG DE UN USUARIO
router.get("/actions/:uid", getUserLog);

// DELETE ALL THE LOGS // TESTING ROUTE
router.delete("/actions/delete", deleteLogs);



module.exports = router;
