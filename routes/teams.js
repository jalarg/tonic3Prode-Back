const express = require("express");
const router = express.Router();

const {
  getAll,
  bulkCreateTeams,
  searchTeam,
  createOneTeam,
  updateOneTeam,
  deleteTeams,
  deleteOneTeam,
} = require("../controllers/teams");

//-----------RUTAS GENERALES-------------//

// OBTENER TODOS LOS EQUIPOS
router.get("/", getAll);

// BUSCAR UN EQUIPO 
router.get("/search/:name", searchTeam)

// CREAR TODOS LOS EQUIPOS [BULK CREATE - SEED INICIAL]
router.post("/", bulkCreateTeams);

//-----------RUTAS PARA ADMINISTRADORES-------------//

// AGREGAR UN EQUIPO
router.post("admin/", createOneTeam);

router.put("admin/:id", updateOneTeam);

// BORRAR TODOS LOS EQUIPOS
router.delete("admin/", deleteTeams);

// BORRAR UN EQUIPO
router.delete("admin/:id", deleteOneTeam);


module.exports = router;
