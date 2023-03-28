const { Tournaments, Users } = require("../db_models");


module.exports = {
  getAll: async (req, res, next) => {
    try {
      const tournaments = await Tournaments.find({})
        .populate("teams", "name")
        .lean();
      res.send(tournaments);
    } catch (err) {
      next(err);
    }
  },
  getOne: async (req, res, next) => {
    const { _id } = req.params;
    try {
      const tournament = await Tournaments.findById(_id).populate(
        "teams",
        "name"
      );
      res.send(tournament);
    } catch (err) {
      next(err);
    }
  },
  getAllTournamentTeams: async (req, res, next) => {
    const { _id } = req.params; //Del torneo
    try {
      const teams = await Tournaments.findById(_id).populate("teams", "name");
      res.send(teams.teams);
    } catch (err) {
      next(err);
    }
  },
  getOneTournamentTeam: async (req, res, next) => {
    // PROBANDO
    const { _id, name } = req.params;
    console.log("=======>", _id, name);
    try {
      const team = await Tournaments.findOne({
        _id: _id,
        teams: {
          $elemMatch: { name: name },
        },
      }).populate("teams");
      console.log("=========>", team);
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
    const { active, beginning, ending, stage, title, details, type, uid } =
      req.body;

    const user = await Users.findOne({ uid });
    if (!user) return res.status(404).send("User not found");
    if (user.rol !== "superAdmin" && user.rol !== "admin") {
      return res.status(403).send("You are not allowed to do this action");
    }
    try {
      const newTournament = new Tournaments({
        active,
        beginning,
        ending,
        stage,
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
  bulkCreateATeams: async (req, res, next) => {
    const _id = req.params;
    const { teamsId, uid } = req.body;

    const user = await Users.findOne({ uid });
    if (!user) return res.status(404).send("User not found");
    if (user.rol !== "superAdmin" && user.rol !== "admin") {
      return res.status(403).send("You are not allowed to do this action");
    }
    try {
      const createdTournament = await Tournaments.findOne(_id);
      const teamIds = teamsId.map((team) => createdTournament.teams.push(team));
      const savedTournament = await createdTournament.save();
      res.send(savedTournament);
    } catch (err) {
      next(err);
    }
  },
  updateOne: async (req, res, next) => {
    const { _id } = req.params;
    const {
      active,
      beginning,
      ending,
      stage,
      title,
      details,
      teams,
      type,
      uid,
    } = req.body;

    const user = await Users.findOne({ uid });
    if (!user) return res.status(404).send("User not found");
    if (user.rol !== "superAdmin" && user.rol !== "admin") {
      return res.status(403).send("You are not allowed to do this action");
    }

    try {
      const updateTournament = await Tournaments.findOneAndUpdate(_id, {
        active,
        beginning,
        ending,
        stage,
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
    const { _id } = req.params;
    const { uid } = req.body;

    const user = await Users.findOne({ uid });
    if (!user) return res.status(404).send("User not found");
    if (user.rol !== "superAdmin" && user.rol !== "admin") {
      return res.status(403).send("You are not allowed to do this action");
    }
    try {
      const removed = await Tournaments.findByIdAndDelete(_id);
      res.send(`Deleted from database`);
    } catch (err) {
      next(err);
    }
  },
  deleteAll: async (req, res, next) => {
    const { uid } = req.body;
    const user = await Users.findOne({ uid });
    if (!user) return res.status(404).send("User not found");
    if (user.rol !== "superAdmin" && user.rol !== "admin") {
      return res.status(403).send("You are not allowed to do this action");
    }

    try {
      const removeAll = await Tournaments.deleteMany();
      res.send(`Deleted from database`);
    } catch (err) {
      next(err);
    }
  },
};
