const { Teams, Users } = require("../db_models");
const { teams } = require("../seed/teams");
const { validationUser } = require("../utils/environments");
const { createLog } = require("../utils/createLog");

module.exports = {
  // RUTAS DE PEDIDOS PUBLICO GENERAL
  getAll: async (req, res, next) => {
    try {
      const teams = await Teams.find();
      res.send(teams);
    } catch (err) {
      next(err);
    }
  },

  searchTeam: async (req, res, next) => {
    try {
      const { name, uid } = req.params;
      const team = await Teams.findOne({ name: { $eq: name } }).exec();
      // registro en caso de exito en log
      await createLog(
        uid,
        "GET",
        req.originalUrl,
        team,
        "Se busca un equipo por nombre de la base de datos"
      );
      res.send(team);
    } catch (err) {
      await createLog(uid, "GET", req.originalUrl, err); // registro en caso de error
      next(err);
    }
  },

  // RUTAS PARA UPDATE RAPIDO CON SEED ARMADO

  bulkCreateTeams: async (req, res, next) => {
    try {
      const data = await Teams.insertMany(teams);
      res.send(data);
    } catch (err) {
      next(err);
    }
  },

  // RUTAS CON PERMISOS DE ADMINISTRADOR

  createOneTeam: async (req, res, next) => {
    const { team, uid } = req.body;
    const user = await Users.findOne({ uid });
    validationUser(user, res); // Validacion de usuario
    try {
      const newTeam = new Teams(team);
      const savedTeam = await newTeam.save();
      // registro en caso de exito en log
      await createLog(
        uid,
        "POST",
        req.originalUrl,
        savedTeam,
        "Se creo un nuevo equipo en la base de datos"
      );
      res.send(savedTeam);
    } catch (err) {
      await createLog(uid, "POST", req.originalUrl, err); // registro en caso de error
      next(err);
    }
  },

  updateOneTeam: async (req, res, next) => {
    const teamId = req.params.id;
    const { updates, uid } = req.body;
    const user = await Users.findOne({ uid });
    validationUser(user, res); // Validacion de usuario

    try {
      // const allowedUpdates = ["name", "logo_url", "foundation", "origin"];
      // const validUpdates = Object.keys(updates).every((update) =>
      //   allowedUpdates.includes(update)
      // );
      // if (!validUpdates) {
      //   return res.status(400).send("Invalid updates");
      // }
      const updatedTeam = await Teams.findByIdAndUpdate(teamId, updates, {
        new: true,
      });
      if (!updatedTeam) {
        return res.status(404).send("Team not found");
      }
      // registro en caso de exito en log
      await createLog(
        uid,
        "PUT",
        req.originalUrl,
        updatedTeam,
        "Se modifico un equipo de la base de datos"
      );
      res.send(updatedTeam);
    } catch (err) {
      await createLog(uid, "PUT", req.originalUrl, err); // registro en caso de error
      next(err);
    }
  },

  deleteTeams: async (req, res, next) => {
    const { uid } = req.body;
    const user = await Users.findOne({ uid });
    // validationUser(user, res); // Validacion de usuario
    try {
      const teams = await Teams.deleteMany();
      // registro en caso de exito en log
      await createLog(
        uid,
        "DELETE",
        req.originalUrl,
        teams,
        "Se eliminaron todos los torneos de la base de datos"
      );
      res.send("The teams were deleted");
    } catch (err) {
      await createLog(uid, "DELETE", req.originalUrl, err); // registro en caso de error
      next(err);
    }
  },

  deleteOneTeam: async (req, res, next) => {
    const { uid } = req.body;
    const user = await Users.findOne({ uid });
    // validationUser(user, res); // Validacion de usuario
    try {
      const team = await Teams.findOneAndDelete({ _id: req.params.id });
      // registro en caso de exito en log
      await createLog(
        uid,
        "DELETE",
        req.originalUrl,
        team,
        "Se elimino un equipo de la base de datos"
      );
      res.send("The team selected was deleted");
    } catch (err) {
      await createLog(uid, "DELETE", req.originalUrl, err); // registro en caso de error
      next(err);
    }
  },
};
