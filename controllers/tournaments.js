const { Tournaments } = require("../db_models");
const tournamentCopaArgentina = require("../seed/tournamentCA");
const { Users } = require("../db_models/");
const { where } = require("../db_models/Teams");

module.exports = {
  getAll: async (req, res, next) => {
    try {
      const tournaments = await Tournaments.find().populate("teams");
      res.send(tournaments);
    } catch (err) {
      next(err);
    }
  },
  getOne: async (req, res, next) => {
    const { _id } = req.params;
    try {
      const tournament = await Tournaments.findById(_id);
      res.send(tournament);
    } catch (err) {
      next(err);
    }
  },
  getAllTournamentTeams: async (req, res, next) => {
    const { _id } = req.params; //Del torneo
    try {
      const teams = await Tournaments.findById(_id).populate("teams");
      res.send(teams.teams);
    } catch (err) {
      next(err);
    }
  },
  getOneTournamentTeam: async (req, res, next) => {
    const { _id, name } = req.params;
    console.log("=======>",_id, name); 
    try {
      const team = await Tournaments.findOne({
        _id: _id,
        teams: {
          $elemMatch: { name: name },
        },
      }).populate("teams");
      console.log("=========>",team)
      res.send(team);
    } catch (err) {
      next(err);
    }
  },
  searchTournament: async (req, res, next) => {
    try {
      const { title } = req.params;
      const tournament = await Tournaments.findOne({
        title: { $eq: title },
      }).exec();
      res.send(tournament);
    } catch (err) {
      next(err);
    }
  },
  createTournament: async (req, res, next) => {
    try {
      const { active, beggining, ending, title, details, type } = req.body;
      const newTournament = new Tournaments({
        active,
        beggining,
        ending,
        title,
        details,
        type,
      });
      await newTournament.save();
      res.send("Creado");
    } catch (err) {
      next(err);
    }
  },
  assingTeams: async (req, res, next) => {
    try {
      const { _id } = req.params; // Del torneo
      const { team } = req.body;

      const tournamentsUpdate = await Tournaments.findByIdAndUpdate(_id, {
        $push: { teams: team },
      });
      res.send(tournamentsUpdate);
    } catch (err) {
      next(err);
    }
  },
  updateOne: async (req, res, next) => {
    const { _id } = req.params;
    const { active, beggining, ending, title, details, teams, type } = req.body;
    try {
      const updateTournament = await Tournaments.findOneAndUpdate(_id, {
        active,
        beggining,
        ending,
        title,
        details,
        teams,
        type,
      });
      res.send("Tournament was updated");
    } catch (err) {
      next(err);
    }
  },
  deleteOne: async (req, res, next) => {
    try {
      const { _id } = req.params;
      console.log(_id);
      const removed = await Tournaments.findByIdAndDelete(_id);
      res.send(`Deleted from database`);
    } catch (err) {
      next(err);
    }
  },
  deleteAll: async (req, res, next) => {
    try {
      const removeAll = await Tournaments.deleteMany();
      res.send(`Deleted from database`);
    } catch (err) {
      next(err);
    }
  },
};
