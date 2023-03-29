const { Tournaments, Users } = require("../db_models");
const { validationUser } = require("../utils/environments");

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
    const { _id } = req.params;
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
      }).populate("teams", "title");
      console.log("=========>", team);
      res.send(team);
    } catch (err) {
      next(err);
    }
  },
  searchTournament: async (req, res, next) => {
    //PROBRANDO
    const { title } = req.params;
    try {
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
    validationUser(user, res);

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
      res.status(200).send({ newTournament });
    } catch (err) {
      next(err);
    }
  },
  bulkCreateATeams: async (req, res, next) => {
    const _id = req.params;
    const { teams, uid } = req.body;

    const user = await Users.findOne({ uid });
    validationUser(user, res);

    try {
      const createdTournament = await Tournaments.findById(_id);
      const teamIds = teams.map((team) => createdTournament.teams.push(team));
      const savedTournament = await createdTournament.save();
      res.status(201).send(`Teams was updated`);
    } catch (err) {
      next(err);
    }
  },
  addUsertoTournament: async (req, res, next) => {
    const { _id } = req.params;
    const { uid } = req.body;
    try {
      // Verificar que los datos de entrada sean válidos
      if (!_id || !uid) {
        return res.status(400).json({ message: "Invalid input data" });
      }
      // check si el torneo existe
      const tournament = await Tournaments.findById(_id);
      if (!tournament) {
        return res.status(404).json({ message: "Tournament not found" });
      }
      // check si el user existe
      const user = await Users.findOne({ uid });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      // check si el usuario ya se registro previamente
      if (tournament.users.includes(user.id)) {
        return res
          .status(400)
          .json({ message: "User already registered in tournament" });
      }

      // Agregar el usuario al torneo y guardar los cambios
      tournament.users.push(user.id);
      await tournament.save();

      // Responder con los datos actualizados del torneo
      res.json({ tournament });
    } catch (error) {
      // Manejo de errores
      next(error);
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
    validationUser(user, res);

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
      const savedTournament = await updateTournament.save();
      res.status(201).send("Tournament was updated");
    } catch (err) {
      next(err);
    }
  },
  deleteOne: async (req, res, next) => {
    const { _id } = req.params;
    const { uid } = req.body;

    const user = await Users.findOne({ uid });
    validationUser(user, res);

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
    validationUser(user, res);

    try {
      const removeAll = await Tournaments.deleteMany();
      res.send(`Deleted from database`);
    } catch (err) {
      next(err);
    }
  },
};
