const mongoose = require("mongoose");
const { Prizes, Users } = require("../db_models");
const { validationUser } = require("../utils/environments");
const { createLog } = require("../utils/createLog");

module.exports = {
  getAll: async (req, res, next) => {
    const { uid } = req.params;
    try {
      const prizes = await Prizes.find();
      // registro en caso de exito en log
      await createLog(
        uid,
        "GET",
        req.originalUrl,
        prizes,
        "Se piden ver todos los premios de la base de datos"
      );
      res.send(prizes);
    } catch (err) {
      await createLog(uid, "GET", req.originalUrl, err); // registro en caso de error
      next(err);
    }
  },

  // RUTA DE PERMISOS DE ADMINISTRADOR
  addOnePrize: async (req, res, next) => {
    const { uid } = req.params;
    const user = await Users.findOne({ uid });
    validationUser(user, res);
    try {
      const newPrize = new Prizes(req.body);
      const savedPrize = await newPrize.save();
      // registro en caso de exito en log
      await createLog(
        uid,
        "POST",
        req.originalUrl,
        savedPrize,
        "Se cargan los premios de un torneo en la base de datos"
      );
      res.send(savedPrize);
    } catch (err) {
      await createLog(uid, "POST", req.originalUrl, err); // registro en caso de error
      next(err);
    }
  },
  changeOnePrize: async (req, res, next) => {
    const { id, uid } = req.params;
    const prizeDataToUpdate = req.body;
    try {
      const updatedPrize = await Prizes.findOneAndUpdate(
        { _id: id },
        prizeDataToUpdate,
        { new: true }
      );
      if (!updatedPrize) {
        res.status(404).send("Prize not found");
      } else {
        // registro en caso de exito en log
        await createLog(
          uid,
          "PUT",
          req.originalUrl,
          updatedPrize,
          "Se actualiza un premio de la base de datos"
        );
        res.send(updatedPrize);
      }
    } catch (err) {
      await createLog(uid, "PUT", req.originalUrl, err); // registro en caso de error
      next(err);
    }
  },
  deletePrizes: async (req, res, next) => {
    const { uid } = req.body;
    const user = await Users.findOne({ uid });
    validationUser(user, res);
    try {
      const prizes = await Prizes.deleteMany();
      // registro en caso de exito en log
      await createLog(
        uid,
        "DELETE",
        req.originalUrl,
        prizes,
        "Se borran todos los premios de la base de datos"
      );
      res.send("All prizes were deleted");
    } catch (err) {
      await createLog(uid, "DELETE", req.originalUrl, err); // registro en caso de error
      next(err);
    }
  },

  deleteOnePrize: async (req, res, next) => {
    const { uid } = req.body;
    const user = await Users.findOne({ uid });
    validationUser(user, res);
    try {
       const prize = await Prizes.findOneAndDelete({
      tournament: req.body.tournament,
    });
    // registro en caso de exito en log
    await createLog(
      uid,
      "DELETE",
      req.originalUrl,
      prize,
      "Se borran todos los premios de la base de datos"
    );
    res.send("The prize was deleted");
    } catch (err) {
      await createLog(uid, "DELETE", req.originalUrl, err); // registro en caso de error
      next(err);
    }
},
}
