const express = require("express");
const router = express.Router();
const { getAll, findOneUser, createOneUser, deleteUsers, deleteOneUser } = require("../controllers/users");

// OBTENER TODOS LOS USUARIOS
router.get("/", getAll);

// OBTENER TODOS LOS USUARIOS
router.get("/:username", findOneUser);

// CREAR UN USUARIO
router.post("/", createOneUser);

// BORRAR TODOS LOS USUARIOS
router.delete("/", deleteUsers);

// BORRAR A UN USUARIO
router.delete("/:uid", deleteOneUser);

module.exports = router;