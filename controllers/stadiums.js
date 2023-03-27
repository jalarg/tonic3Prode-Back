const { Stadiums, Users } = require("../db_models");
const stadiumsArgentina = require("../seed/stadiums");

module.exports = {
  // RUTAS CON PERMISOS GENERALES
  getAll: async (req, res, next) => {
    console.log(stadiumsArgentina);
    try {
      const stadiums = await Stadiums.find();
      res.send(stadiums);
    } catch (err) {
      next(err);
    }
  },

  // RUTAS PARA UPDATE RAPIDO CON SEED ARMADO

  searchStadium: async (req, res, next) => {
    try {
      const { name } = req.params;
      const team = await Stadiums.findOne({ name: { $eq: name } }).exec();
      res.send(team);
    } catch (err) {
      next(err);
    }
  },

  addStadiums: async (req, res, next) => {
    try {
      const stadiums = stadiumsArgentina.map((name) => ({ name }));
      const data = await Stadiums.insertMany(stadiums);
      console.log(`${data.length} stadiums saved`);
      res.send(data);
    } catch (err) {
      next(err);
    }
  },


  // RUTAS CON PERMISOS DE ADMINISTRADOR

  addOneStadium: async (req, res, next) => {
    const { stadium, uid } = req.body;
    const user = await Users.findOne({ uid });
    if (!user) {
      return res.status(404).send("User not found");
    }
    if (user.rol !== "superAdmin" && user.rol !== "admin") {
      return res.status(403).send("You are not allowed to do this action");
    }
    try {
      const newStadium = new Stadiums(stadium);
      const savedStadium = await newStadium.save();
      res.send(savedStadium);
    } catch (err) {
      next(err);
    }
  },

  updateOneStadium: async (req, res, next) => {
    const stadiumId = req.params.id;
    const { updates, uid } = req.body;
    const user = await Users.findOne({ uid });
    if (!user) {
      return res.status(404).send("User not found");
    }
    if (user.rol !== "superAdmin" && user.rol !== "admin") {
      return res.status(403).send("You are not allowed to do this action");
    }
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
      res.send(updatedStadium);
    } catch (err) {
      next(err);
    }
  },
  deleteStadiums: async (req, res, next) => {
    const { uid } = req.body;
    const user = await Users.findOne({ uid });
    if (!user) {
      return res.status(404).send("User not found");
    }
    if (user.rol !== "superAdmin" && user.rol !== "admin") {
      return res.status(403).send("You are not allowed to do this action");
    }
    try {
      await Stadiums.deleteMany();
      res.send("The stadiums were deleted");
    } catch (err) {
      next(err);
    }
  },
  deleteOneStadium: async (req, res, next) => {
    const id = req.params.id;
    const { uid } = req.body;
    const user = await Users.findOne({ uid });
    if (!user) {
      return res.status(404).send("User not found");
    }
    if (user.rol !== "superAdmin" && user.rol !== "admin") {
      return res.status(403).send("You are not allowed to do this action");
    }
    try {
      await Stadiums.findOneAndDelete({ _id: id });
      res.send("The Stadium selected was deleted");
    } catch (err) {
      next(err);
    }
  },
};
