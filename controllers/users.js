const { Users } = require("../db_models");
const { createLog } = require("../utils/createLog");
const { validationSuperAdmin } = require("../utils/environments");

module.exports = {
  // RUTAS GENERALES DE PEDIDO GET
  getAllCheckFB: async (req, res, next) => {
    try {
      const users = await Users.find();
      // registro en caso de exito en log
      await createLog(
        "checkFB",
        "GET",
        req.originalUrl,
        users,
        "Se piden todos los usuarios de la base de datos"
      );
      res.send(users);
    } catch (err) {
      await createLog("checkFB", "GET", req.originalUrl, err); // registro en caso de error
      next(err);
    }
  },
  getAll: async (req, res, next) => {
    const uid = req.params.uid;
    try {
      const users = await Users.find();
      await createLog(
        uid,
        "GET",
        req.originalUrl,
        users,
        "Se piden todos los usuarios de la base de datos"
      ); // registro en caso de exito
      res.send(users);
    } catch (err) {
      await createLog(req.params.uid, "GET", req.originalUrl, err); // registro en caso de error
      next(err);
    }
  },

  findOneUser: async (req, res, next) => {
    console.log("unooo", req.params.uid);
    try {
      const uid = req.params.uid;

      const user = await Users.findOne({ uid });
      if (!user) {
        return res.status(404).send("User not found");
      }
      await createLog(
        req.params.uid,
        "GET",
        req.originalUrl,
        user,
        "Se pide los datos de un usuario especifico"
      ); // registro en caso de exito
      res.send(user);
    } catch (err) {
      await createLog(req.params.uid, "GET", req.originalUrl, err); // registro en caso de error
      next(err);
    }
  },
  getAllUsersFromOneTournament: async (req, res, next) => {
    try {
      const tournamentId = req.params.id;
      const users = await Users.find({ tournaments: tournamentId });
      if (!users) {
        return res.status(404).send("Users not found");
      }
      res.send(users);
    } catch (err) {
      next(err);
    }
  },

  // RUTA DE CREACION DE USUARIOS
  createOneUser: async (req, res, next) => {
    const { uid } = req.body;
    try {
      const newUser = new Users(req.body);
      const savedUser = await newUser.save();
      // registro en caso de exito en log
      await createLog(
        uid,
        "POST",
        req.originalUrl,
        savedUser,
        "Se crea el usuario en la base de datos"
      );
      res.send(savedUser);
    } catch (err) {
      await createLog(uid, "GET", req.originalUrl, err); // registro en caso de error
      next(err);
    }
  },

  // RUTAS DE PERMISO ESPECIAL!!

  // SUPERADMIN PUEDE EDITAR ROL DE USUARIO
  updateToAdmin: async (req, res, next) => {
    const { uid, newAdminUid } = req.body;
    try {
      const user = await Users.findOne({ uid });
      validationSuperAdmin(user, res);
      const userToUpdate = await Users.findOneAndUpdate(
        { uid: newAdminUid },
        { rol: "admin" },
        { new: true }
      );
      if (!user) {
        return res.status(404).send("User not found");
      }
      // registro en caso de exito en log
      await createLog(
        uid,
        "PUT",
        req.originalUrl,
        userToUpdate,
        "Se edita un usuario existente y se lo convierte en admin"
      );
      res.send(userToUpdate);
    } catch (err) {
      next(err);
    }
  },

  // SUPERADMIN PUEDE BORRAR TODOS LOS USUARIOS
  deleteUsers: async (req, res, next) => {
    const { uid } = req.body;
    const user = await Users.findOne({ uid });
    validationSuperAdmin(user, res);
    try {
      await Users.deleteMany();
      // registro en caso de exito en log
      await createLog(
        uid,
        "DELETE",
        req.originalUrl,
        null,
        "Se borraron todos los usuarios de la base de datos"
      ); // registro en caso de exito
      res.send("All the users were deleted");
    } catch (err) {
      await createLog(uid, "DELETE", req.originalUrl, err); // registro en caso de error
      next(err);
    }
  },

  // SUPERADMIN PUEDE BORRAR UN USUARIO
  deleteOneUser: async (req, res, next) => {
    const uidUserToDelete = req.params.uid;
    const { uid } = req.body;
    const user = await Users.findOne({ uid });
    validationSuperAdmin(user, res);
    try {
      const user = await Users.findOneAndDelete({ uid: uidUserToDelete });
      // Check if user exists
      if (!user) {
        return res.status(404).send("User not found");
      }
      // registro en caso de exito en log
      await createLog(
        uid,
        "DELETE",
        req.originalUrl,
        user,
        "Se borra un usuario de la base de datos"
      );
      res.send("The user was deleted");
    } catch (err) {
      await createLog(req.params.uid, "DELETE", req.originalUrl, err); // registro en caso de error
      next(err);
    }
  },
};
