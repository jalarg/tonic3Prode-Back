const express = require("express");
const router = express.Router();
const { getAll, createOneUser, deleteUsers, deleteOneUser } = require("../controllers/users");

// OBTENER TODOS LOS USUARIOS
router.get("/", getAll);

// CREAR UN USUARIO
router.post("/", createOneUser);

// BORRAR TODOS LOS USUARIOS
router.delete("/deleteusers", deleteUsers);

// BORRAR A UN USUARIO
router.delete("/deleteuser", deleteOneUser);

module.exports = router;