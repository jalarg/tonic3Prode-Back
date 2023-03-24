const express = require("express");
const router = express.Router();
const {
  getAll,
  findOneUser,
  createOneUser,
  createOneAdmin,
  deleteUsers,
  deleteOneUser,
} = require("../controllers/users");

// OBTENER TODOS LOS USUARIOS
router.get("/", getAll);

// OBTENER UN USUARIO
router.get("/:username", findOneUser);

// CREAR UN USUARIO
router.post("/", createOneUser);

// CREAR UN ADMIN
router.post("/admin", createOneAdmin);

// BORRAR TODOS LOS USUARIOS
router.delete("/", deleteUsers);

// BORRAR A UN USUARIO
router.delete("/:uid", deleteOneUser);

module.exports = router;