const { Stadiums, Users } = require("../db_models");
const stadiums = require("../seed/stadiums");
const { validationUser } = require("../utils/environments");
const { createLog } = require("../utils/createLog");

module.exports = {
  // RUTAS CON PERMISOS GENERALES

  getAll: async (req, res, next) => {
    try {
      const stadiums = await Stadiums.find();
      res.send(stadiums);
    } catch (err) {
      next(err);
    }
  },

  searchStadium: async (req, res, next) => {
    const { name, uid } = req.params;
    try {
      const stadium = await Stadiums.findOne({ name: { $eq: name } }).exec();
      // registro en caso de exito en log
      await createLog(
        uid,
        "GET",
        req.originalUrl,
        stadium,
        "Se busca un estadio por nombre de la base de datos"
      );
      res.send(stadium);
    } catch (err) {
      await createLog(uid, "GET", req.originalUrl, err); // registro en caso de error
      next(err);
    }
  },

  // RUTAS PARA UPDATE RAPIDO CON SEED ARMADO

  bulkCreateStadiums: async (req, res, next) => {
    try {
      const data = await Stadiums.insertMany(stadiums);
      res.send(data);
    } catch (err) {
      next(err);
    }
  },

  // RUTAS CON PERMISOS DE ADMINISTRADOR

  addOneStadium: async (req, res, next) => {
    const { stadium, uid } = req.body;
    const user = await Users.findOne({ uid });
    validationUser(user, res)
    try {
      const newStadium = new Stadiums(stadium);
      const savedStadium = await newStadium.save();
      // registro en caso de exito en log
      await createLog(
        uid,
        "POST",
        req.originalUrl,
        savedStadium,
        "Se busca un estadio por nombre de la base de datos"
      );
      res.send(savedStadium);
    } catch (err) {
      await createLog(uid, "POST", req.originalUrl, err); // registro en caso de error
      next(err);
    }
  },

  updateOneStadium: async (req, res, next) => {
    const stadiumId = req.params.id;
    const { updates, uid } = req.body;
    const user = await Users.findOne({ uid });
    validationUser(user, res);
    try {
      const allowedUpdates = ["name"];
      const validUpdates = Object.keys(updates).every((update) =>
        allowedUpdates.includes(update)
      );
      if (!validUpdates) {
        return res.status(400).send("Invalid updates");
      }
      const updatedStadium = await Stadiums.findByIdAndUpdate(
        stadiumId,
        updates,
        {
          new: true,
        }
      );
      if (!updatedStadium) {
        return res.status(404).send("Stadium not found");
      }
      // registro en caso de exito en log
      await createLog(
        uid,
        "PUT",
        req.originalUrl,
        updatedStadium,
        "Se actualizo un estadio de la base de datos"
      );
      res.send(updatedStadium);
    } catch (err) {
      await createLog(uid, "PUT", req.originalUrl, err); // registro en caso de error
      next(err);
    }
  },
  deleteStadiums: async (req, res, next) => {
    const { uid } = req.body;
    const user = await Users.findOne({ uid });
    validationUser(user, res);
    try {
      const stadiums = await Stadiums.deleteMany();
      // registro en caso de exito en log
      await createLog(
        uid,
        "DELETE",
        req.originalUrl,
        stadiums,
        "Se eliminaron todos los estadio de la base de datos"
      );
      res.send("The stadiums were deleted");
    } catch (err) {
      await createLog(uid, "DELETE", req.originalUrl, err); // registro en caso de error
      next(err);
    }
  },
  deleteOneStadium: async (req, res, next) => {
    const id = req.params.id;
    const { uid } = req.body;
    const user = await Users.findOne({ uid });
    validationUser(user, res);
    try {
      const stadium = await Stadiums.findOneAndDelete({ _id: id });
      // registro en caso de exito en log
      await createLog(
        uid,
        "DELETE",
        req.originalUrl,
        stadium,
        "Se elimino un estadio de la base de datos"
      );
      res.send("The Stadium selected was deleted");
    } catch (err) {
      await createLog(uid, "DELETE", req.originalUrl, err); // registro en caso de error
      next(err);
    }
  },
};
