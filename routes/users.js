const express = require("express");
const router = express.Router();
const {
  getAll,
  findOneUser,
  getAllUsersFromOneTournament,
  createOneUser,
  createOneAdmin,
  deleteUsers,
  deleteOneUser,
} = require("../controllers/users");

//-----------RUTAS GENERALES-------------//

// OBTENER TODOS LOS USUARIOS
router.get("/", getAll);

// OBTENER UN USUARIO
router.get("/:username", findOneUser);

// OBTENER TODOS LOS USUARIOS DE UN TORNEO ESPECIFICO [TEMA PENDIENTE!!!]

router.get("/tournament/:id", getAllUsersFromOneTournament);

// CREAR UN USUARIO
router.post("/", createOneUser);

//-----------RUTAS PARA ADMINISTRADORES-------------//

// CREAR UN ADMIN
router.post("/admin", createOneAdmin);

// BORRAR TODOS LOS USUARIOS
router.delete("/admin", deleteUsers);

// BORRAR A UN USUARIO
router.delete("/admin/:uid", deleteOneUser);



module.exports = router;