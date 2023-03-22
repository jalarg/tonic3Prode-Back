const { Teams } = require("../db_models");
const teams = require("../seed/teams");

module.exports = {
  getAll: async (req, res) => {
    const teams = await Teams.find();
    res.send(teams);
  },
  updateTeams: async (req, res) => {
    const data = await Teams.insertMany(teams);
    res.send(data);
  },
  updateOneTeam: async (req, res) => {
    const newTeam = new Teams(req.body);
    const savedTeam = await newTeam.save();
    res.send(savedTeam);
  },
  deleteTeams: async (req, res) => {
    await Teams.deleteMany();
    res.send("The teams were deleted");
  },
  deleteOneTeam: async (req, res) => {
    const team = await Teams.findOneAndDelete({nombre: req.body.nombre });
    res.send("The team selected was deleted");
  },

};
