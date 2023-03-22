const express = require("express");
const router = express.Router();
const { getAll, createOneUser, deleteUsers, deleteOneUser } = require("../controllers/users");

// OBTENER TODOS LOS USUARIOS
router.get("/", getAll);

// CREAR UN USUARIO
router.post("/", createOneUser);

// BORRAR TODOS LOS USUARIOS
router.put("/deleteusers", deleteUsers);

// BORRAR TODOS LOS USUARIOS
router.put("/deleteuser", deleteOneUser);

module.exports = router;