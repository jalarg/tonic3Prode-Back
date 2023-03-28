const { Teams, Users } = require("../db_models");
const { teams } = require("../seed/teams");

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
      const { name } = req.params;
      const team = await Teams.findOne({ name: { $eq: name } }).exec();
      res.send(team);
    } catch (err) {
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
    if (!user) {
      return res.status(404).send("User not found");
    }
    if (user.rol !== "superAdmin" && user.rol !== "admin") {
      return res.status(403).send("You are not allowed to do this action");
    }
     try {
      const newTeam = new Teams(team);
      const savedTeam = await newTeam.save();
      res.send(savedTeam);
     } catch (err) {
       next(err);
     }
  },

  updateOneTeam: async (req, res, next) => {
    const teamId = req.params.id;
    const { updates, uid } = req.body;
    const user = await Users.findOne({ uid });
    if (!user) {
      return res.status(404).send("User not found");
    }
    if (user.rol !== "superAdmin" && user.rol !== "admin") {
      return res.status(403).send("You are not allowed to do this action");
    }
    try {
      const allowedUpdates = ["name", "logo_url", "foundation", "origin"];
      const validUpdates = Object.keys(updates).every((update) =>
        allowedUpdates.includes(update)
      );
      if (!validUpdates) {
        return res.status(400).send("Invalid updates");
      }
      const updatedTeam = await Teams.findByIdAndUpdate(teamId, updates, {
        new: true,
      });
      if (!updatedTeam) {
        return res.status(404).send("Team not found");
      }

      res.send(updatedTeam);
    } catch (err) {
      next(err);
    }
  },

  deleteTeams: async (req, res, next) => {
    const { uid } = req.body;
    const user = await Users.findOne({ uid });
    if (!user) {
      return res.status(404).send("User not found");
    }
    if (user.rol !== "superAdmin" && user.rol !== "admin") {
      return res.status(403).send("You are not allowed to do this action");
    }
    try {
      await Teams.deleteMany();
      res.send("The teams were deleted");
    } catch (err) {
      next(err);
    }
  },

  deleteOneTeam: async (req, res, next) => {
    const { uid } = req.body;
    const user = await Users.findOne({ uid });
    if (!user) {
      return res.status(404).send("User not found");
    }
    if (user.rol !== "superAdmin" && user.rol !== "admin") {
      return res.status(403).send("You are not allowed to do this action");
    }
    try {
      const team = await Teams.findOneAndDelete({ _id: req.params.id });
      console.log(team);
      res.send("The team selected was deleted");
    } catch (err) {
      next(err);
    }
  },
};
