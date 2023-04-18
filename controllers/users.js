const { Users, Tournaments } = require("../db_models");
const { createLog } = require("../utils/createLog");
const {
  validationSuperAdmin,
  validationAdminOrSuper,
  validationAdmin,
} = require("../utils/environments");
const emailVerification = require("../utils/mailer");
const speakeasy = require("speakeasy");
const qrcode = require("qrcode");


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
      const users = await Users.find({ tournaments: tournamentId })
      if (!users) {
        return res.status(404).send("Users not found");
      }
      res.send(users);
    } catch (err) {
      next(err);
    }
  },

  generateSecret2FA: async (req, res, next) => {
    const uid = req.params.uid;
    try {
      const user = await Users.findOne({ uid: uid });
      if (user.twoFactorSecret) {
        // Si el usuario ya tiene un secreto 2FA registrado, devolvemos un mensaje indicando que no se puede generar un nuevo secreto 2FA
        return res.send({
          message:
            "Ya tiene un secreto 2FA registrado. No se puede generar uno nuevo.",
        });
      } else {
        const secret = speakeasy.generateSecret({
          length: 20,
          name: "Gambet",
          issuer: "My Company",
        });

        const otpauth = speakeasy.otpauthURL({
          secret: secret.ascii,
          label: "Gambet",
          issuer: "Mi Empresa",
          algorithm: "SHA1",
          encoding: "base32",
        });

        const qr = await qrcode.toDataURL(otpauth);

        // Aquí guardamos el secreto en la base de datos para el usuario correspondiente
        await Users.findByIdAndUpdate(user._id, {
          twoFactorSecret: secret.base32,
        });
        console.log(user.twoFactorSecret);
        res.json({ secret: secret.base32, qr });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Error generating 2FA code");
    }
  },
  verify2FA: async (req, res, next) => {
    try {
      const uid = req.body.uid;
      const token = req.body.token;

      // Recupera el secreto del usuario
      const user = await Users.findOne({ uid: uid });
      const secret = user.twoFactorSecret;

      // Verifica el token
      const verified = speakeasy.totp.verify({
        secret: secret,
        encoding: "base32",
        token: token,
        window: 2,
      });
      if (verified) {
        res.status(200).json({ message: "Verification successful" });
      } else {
        res.status(401).json({ message: "Invalid verification code" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  // RUTA DE CREACION DE USUARIOS
  createOneUser: async (req, res, next) => {
    const { uid } = req.body;
    try {
      const newUser = new Users(req.body);
      const savedUser = await newUser.save();
      // Enlace de verificación de email
      const verificationLink = `http://localhost:3001/verify-email?token=${uid}`;
      // Envío de email de verificación
      emailVerification(verificationLink, savedUser.email);
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
  // SUPERADMIN y ADMIN PUEDE EDITAR ROL DE USUARIO
  updateToAdmin: async (req, res, next) => {
    const { uid, newAdminUid } = req.body;
    try {
      const user = await Users.findOne({ uid });
      validationAdminOrSuper(user, res);
      const userToUpdate = await Users.findOneAndUpdate(
        { uid: newAdminUid },
        { rol: "admin" },
        { new: true }
      );
      if (!user) {
        return res.status(401).json({ message: "user not found" });
      }
      // registro en caso de exito en log
      await createLog(
        uid,
        "PUT",
        req.originalUrl,
        userToUpdate,
        "Se edita un usuario existente y se lo convierte en admin"
      );
      res.status(200).json({ message: "Edited to admin correctly" });
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  //REMOVE FROM ADMINS
  removeFromAdmins: async (req, res, next) => {
    const { uid, newAdminUid } = req.body;

    try {
      const user = await Users.findOne({ uid });
      validationSuperAdmin(user, res)
      const userToRemove = await Users.findOneAndUpdate(
        { uid: newAdminUid },
        { rol: "user" },
        { new: true }
      );
      if (!user) {
        return res.status(401).json({ message: "user not found" });
      }
      // registro en caso de exito en log
      await createLog(
        uid,
        "PUT",
        req.originalUrl,
        userToRemove,
        "Se edita un usuario existente y se lo remueve de admins"
      );
      res.status(200).json({ message: "Edited to user correctly" });
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  userUpdate: async (req, res, next) => {
    try {
      const { username, cellphone, address, PushSubscription } = req.body;
      const updatedUser = await Users.findOneAndUpdate(
        { uid: req.params.uid },
        { username, cellphone, address, PushSubscription },
        { new: true }
      );
      res.send(updatedUser);
    } catch (err) {
      next(err);
    }
  },

  // SUPERADMIN PUEDE BORRAR TODOS LOS USUARIOS
  superAdminDeleteUsers: async (req, res, next) => {
    const { uid } = req.body;
    const user = await Users.findOne({ uid });
    // validationSuperAdmin(user, res);
    try {
      await Users.deleteMany({ rol: { $in: ["admin", "user"] } });
      // registro en caso de exito en log
      await createLog(
        uid,
        "DELETE",
        req.originalUrl,
        null,
        "Se borraron todos los usuarios de la base de datos"
      ); // registro en caso de exito
      res.status(200).json({ message: "All users deleted" });
    } catch (err) {
      await createLog(uid, "DELETE", req.originalUrl, err); // registro en caso de error
      next(err);
    }
  },

  //ADMIN BORRA USUARIOS CON ROL USER
  adminDeleteUsers: async (req, res, next) => {
    const { uid } = req.body;
    const user = await Users.findOne({ uid });
    // validationAdmin(user, res);
    try {
      const response = await Users.deleteMany({ rol: "user" });
      // registro en caso de exito en log
      await createLog(
        uid,
        "DELETE",
        req.originalUrl,
        null,
        "Se borraron todos los usuarios de la base de datos"
      ); // registro en caso de exito
      if (response.deletedCount) {
        res.status(200).json({ message: "All users deleted" });
      } else {
        res
          .status(200)
          .json({ message: "You are not allowed to eliminate admins" });
      }
    } catch (err) {
      await createLog(uid, "DELETE", req.originalUrl, err); // registro en caso de error
      next(err);
    }
  },

  // SUPERADMIN Y ADMIN PUEDEN BORRAR UN USUARIO
  deleteOneUser: async (req, res, next) => {
    const uidUserToDelete = req.params.uid;
    const { uid } = req.body;
    const user = await Users.findOne({ uid });
    // validationAdminOrSuper(user, res);
    try {
      const user = await Users.findOneAndDelete({ uid: uidUserToDelete });
      // Check if user exists
      if (!user) {
        return res.status(401).json({ message: "user not found" });
      }
      // registro en caso de exito en log
      await createLog(
        uid,
        "DELETE",
        req.originalUrl,
        user,
        "Se borra un usuario de la base de datos"
      );
      res.status(200).json({ message: "Usuario editado correctamente" });
    } catch (err) {
      await createLog(req.params.uid, "DELETE", req.originalUrl, err); // registro en caso de error
      next(err);
    }
  },
};
