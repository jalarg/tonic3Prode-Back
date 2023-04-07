const mongoose = require("mongoose");
const { Rankings, Users } = require("../db_models");
const { validationUser } = require("../utils/environments");
const { createLog } = require("../utils/createLog");

module.exports = {
  // RUTAS GENERALES

  getAll: async (req, res, next) => {
  const { uid } = req.params;
  try {
    const { tournamentId } = req.query;
    const positions = await Position.find({
      tournamentId,
      tournamentType: "country",
    })
      .sort({ position: 1 })
      .populate("userId");
    await createLog(
      uid,
      "GET",
      req.originalUrl,
      positions,
      "Se obtienen todas las posiciones para un torneo específico"
    );
    res.send(positions);
  } catch (err) {
    await createLog(uid, "GET", req.originalUrl, err);
    next(err);
  }
  },

   // RUTA DE PERMISOS DE ADMINISTRADOR

  deleteAllPositions: async (req, res, next) => {
    const { uid } = req.body;
    const user = await Users.findOne({ uid });
    validationUser(user, res);
    try {
      const positions = await Rankings.deleteMany();
      // registro en caso de exito en log
      await createLog(
        uid,
        "DELETE",
        req.originalUrl,
        positions,
        "Se borran todos los rankings de la base de datos"
      );
      res.send("All rankings were deleted");
    } catch (err) {
      await createLog(uid, "DELETE", req.originalUrl, err); // registro en caso de error
      next(err);
    }
  },

  deleteOnePosition: async (req, res, next) => {
    const { uid } = req.body;
    const user = await Users.findOne({ uid });
    validationUser(user, res);
    try {
      const ranking = await Rankings.findOneAndDelete({
        tournament: req.body.tournament,
      });
      // registro en caso de exito en log
      await createLog(
        uid,
        "DELETE",
        req.originalUrl,
        ranking,
        "Se borra un premio de la base de datos"
      );
      res.send("One ranking was deleted");
    } catch (err) {
      await createLog(uid, "DELETE", req.originalUrl, err); // registro en caso de error
      next(err);
    }
  },
};
