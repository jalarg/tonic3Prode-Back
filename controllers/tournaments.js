const { Tournaments } = require("../db_models");
const tournamentCopaArgentina = require("../seed/tournamentCA");

module.exports = {
  getAll: async (req, res) => {
    const tournament = await Tournaments.find().populate("teams");
    res.send(tournament);
  },
  createTournament: async (req, res) => {
    const { active, beggining, ending, title, details, type } = req.body;
    const newTournament = new Tournaments({
      active: tournamentCopaArgentina.active,
      beggining: tournamentCopaArgentina.beggining,
      ending: tournamentCopaArgentina.ending,
      title: tournamentCopaArgentina.title,
      details: tournamentCopaArgentina.details,
      type: tournamentCopaArgentina.type,
    });
    await newTournament.save();
    res.send("Creado");
  },
  assingTeams: async (req, res) => {
    const { _id } = req.params;
    const { team } = req.body;

    const tournamentsUpdate = await Tournaments.findByIdAndUpdate(_id, {
      $push: { teams: team },
    });
    res.send(tournamentsUpdate);
  },
  deleteOne: async (req, res) => {
    const { _id } = req.params;
    console.log(_id)
    const removed = await Tournaments.findByIdAndDelete(_id);
    res.send(`Deleted from database`);
  },
};
