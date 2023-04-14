const { Users } = require("../db_models");
const { createLog } = require("../utils/createLog");
const { validationSuperAdmin } = require("../utils/environments");
const emailVerification = require("../utils/mailer");
const speakeasy = require("speakeasy");
const qrcode = require("qrcode");
const axios = require("axios");


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
      const users = await Users.find({ tournaments: tournamentId });
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
        console.log("ENTRE EN LA CONDICION Y NO GENERO NUEVO 2FA");
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
  // RUTA PARA NOTIFICACIONES PUSH
  sendPushNotification: async (req, res, next) => {
    const { uid } = req.params;
    const { deviceRegistrationToken, title, body } = req.body;
    try {
      const apiKey =
        "BLfG68c-Siz5l-fQ2t0PTtnu98KF7Hr7AhuWgiCmoK_LttoForDNSVvFsoXlajkUsc1kjdetbGW3a-9V0DVyesI";
      const url = "https://fcm.googleapis.com/fcm/send";
      const message = {
        notification: {
          title: title, 
          body: body,
        },
        to: deviceRegistrationToken,
      };
      const response = await axios.post(url, message, {
        headers: {
          Authorization: "key=" + apiKey,
          "Content-Type": "application/json",
        },
      });
      console.log("Mensaje enviado con éxito");
      res.send(response.data);
    } catch (error) {
      await createLog(uid, "POST", req.originalUrl, error);
      next(error);
    }
  },

  // RUTA DE VERIFICACION DE EMAIL----------------------------- PENDIENTE DE REVISAR
  verifyEmail: async (req, res, next) => {
    const { token } = req.query;
    try {
      const user = await Users.findOneAndUpdate(
        { uid: token },
        { isVerified: true },
        { new: true }
      );

      if (!user) {
        throw new Error("Token no válido");
      }

      // Registro en caso de éxito en log
      await createLog(
        token,
        "GET",
        req.originalUrl,
        user,
        "Se actualiza el estado del usuario a verificado"
      );

      res.send("Tu correo ha sido verificado exitosamente.");
    } catch (err) {
      // Registro en caso de error en log
      await createLog(token, "GET", req.originalUrl, err);
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

  userUpdate: async (req, res, next) => {
    try {
      const { username, cellphone, address } = req.body;
      const updatedUser = await Users.findOneAndUpdate(
     
        { uid: req.params.uid },
        { username, cellphone, address },
        { new: true }
      );
      res.send(updatedUser);
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
