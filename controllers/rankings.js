const { Rankings, Users } = require("../db_models");
const { validationUser } = require("../utils/environments");
const { createLog } = require("../utils/createLog");

module.exports = {
  // RUTAS GENERALES
  
  getAll: async (req, res, next) => {
    const { uid } = req.params;
    const { tournamentId } = req.params;
    // Buscamos el usuario por uid en la base de datos para ver el pais
    const user = await Users.findOne({ uid: uid });
    const country = user.country;
    try {
      const positions = await Rankings.find({
        tournamentId: tournamentId,
        country: country,
      })
        .sort({ position: 1 })
        .populate("userId")
        .populate("predictions");
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
  registerUserToTournament: async (req, res, next) => {
    const { TournamentId, uid } = req.params;
    try {
      // Buscamos el usuario por id en la base de datos
      const user = await Users.findOne({ uid: uid });
      const country = user.country;

      // Buscamos el registro del ranking correspondiente
      const ranking = await Rankings.findOne({
        tournamentId: TournamentId,
        country: country,
        userId: user._id,
      });

      if (ranking) {
        res.status(409).send({
          message: `El usuario ${user.name} ya se encuentra inscrito en el torneo`,
        });
        return;
      }
      // Creamos el objeto para agregar al ranking
      const newRanking = new Rankings({
        tournamentId: TournamentId,
        country: country,
        position: 0,
        userId: user._id,
        score: 0,
        predictions: []
      });
      await newRanking.save();
      await createLog(
        uid,
        "GET",
        req.originalUrl,
        newRanking,
        "Se agrego un usuario a un torneo especifico"
      );
      res.status(201).send({
        message: `El usuario ${user.name} se ha inscrito correctamente en el torneo de ${country}`,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Hubo un error al inscribir al usuario en el torneo",
      });
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
