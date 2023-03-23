const { Teams } = require("../db_models");
const teams = require("../seed/teams");

module.exports = {
  getAll: async (req, res, next) => {
    try {
      const teams = await Teams.find();
      res.send(teams);
    } catch (err) {
      next(err);
    }
  },
  updateTeams: async (req, res, next) => {
    try {
      const data = await Teams.insertMany(teams);
      res.send(data);
    } catch (err) {
      next(err);
    }
  },
  updateOneTeam: async (req, res, next) => {
    try {
      const newTeam = new Teams(req.body);
      const savedTeam = await newTeam.save();
      res.send(savedTeam);
    } catch (err) {
      next(err);
    }
  },
  deleteTeams: async (req, res, next) => {
    try {
      await Teams.deleteMany();
      res.send("The teams were deleted");
    } catch (err) {
      next(err);
    }
  },
  deleteOneTeam: async (req, res, next) => {
    try {
      const team = await Teams.findOneAndDelete({ nombre: req.body.nombre });
      res.send("The team selected was deleted");
    } catch (err) {
      next(err);
    }
  },
};
