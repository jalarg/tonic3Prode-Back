const express = require("express");
const router = express.Router();
const {
  getAllCheckFB,
  getAll,
  findOneUser,
  getAllUsersFromOneTournament,
  createOneUser,
  generateSecret2FA,
  verify2FA,
  sendPushNotification,
  updateToAdmin,
  deleteOneUser,
  userUpdate,
  removeFromAdmins,
  superAdminDeleteUsers,
  adminDeleteUsers,
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

// 2FA
router.post("/twofactor/:uid", generateSecret2FA);
router.post("/2FA/verify", verify2FA);

// NOTIFACIONES PUSH
router.post("/push/:uid", sendPushNotification);

//ACTUALIZAR DATOS USUARIO
router.put("/update/:uid", userUpdate);

//-----------RUTAS PARA ADMINISTRADORES-------------//

// UPGRADE TO ADMIN
router.put("/admin/updateToAdmin", updateToAdmin);

// REMOVE FROM ADMIN
router.put("/admin/removeFromAdmins", removeFromAdmins);

// SUPER ADMIN BORRA TODOS LOS USUARIOS
router.delete("/superAdmin", superAdminDeleteUsers);

//ADMIN BORRA A TODOS LOS USUARIOS CON ROL USER
router.delete("/admins", adminDeleteUsers);

// BORRAR A UN USUARIO
router.delete("/admin/:uid", deleteOneUser);

module.exports = router;
