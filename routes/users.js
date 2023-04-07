const express = require("express");
const router = express.Router();
const {
  getAllCheckFB,
  getAll,
  findOneUser,
  getAllUsersFromOneTournament,
  createOneUser,
  userUpdate,
  updateToAdmin,
  deleteUsers,
  deleteOneUser,
} = require("../controllers/users");

//-----------RUTAS GENERALES-------------//

// OBTENER TODOS LOS USUARIOS CHECK PARA CREAR CUENTA
router.get("/", getAllCheckFB);

// OBTENER TODOS LOS USUARIOS
router.get("/:uid", getAll);

// OBTENER UN USUARIO
router.get("/search/:uid", findOneUser);

// OBTENER TODOS LOS USUARIOS DE UN TORNEO ESPECIFICO [TEMA PENDIENTE!!!]

router.get("/tournament/:id", getAllUsersFromOneTournament);

// CREAR UN USUARIO
router.post("/", createOneUser);

//ACTUALIZAR DATOS USUARIO
router.put("/update/:uid", userUpdate);

//-----------RUTAS PARA ADMINISTRADORES-------------//

// EDIT ADMIN ROL
router.put("/admin/role", updateToAdmin);

// BORRAR TODOS LOS USUARIOS
router.delete("/admin", deleteUsers);

// BORRAR A UN USUARIO
router.delete("/admin/:uid", deleteOneUser);

module.exports = router;
