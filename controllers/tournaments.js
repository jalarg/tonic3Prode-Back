const { Tournaments, Users, Games, Predictions } = require("../db_models");
const { validationUser } = require("../utils/environments");
const { createLog } = require("../utils/createLog");

module.exports = {
  // RUTAS GENERALES DE PEDIDO GET
  getAll: async (req, res, next) => {
    try {
      const tournaments = await Tournaments.find({})
        .populate("teams", "name")
        .populate("games")
        .lean();
      // registro en caso de exito en log
      await createLog(
        req.params.uid,
        "GET",
        req.originalUrl,
        tournaments,
        "Se pide todos de todos los torneos de la base de datos"
      );
      res.send(tournaments);
    } catch (err) {
      await createLog(req.params.uid, "GET", req.originalUrl, err); // registro en caso de error
      next(err);
    }
  },
  getOne: async (req, res, next) => {
    const { _id } = req.params;
    const { uid } = req.body;
    try {
      const tournament = await Tournaments.findById(_id).populate(
        "teams",
        "name"
      );
      // registro en caso de exito en log
      await createLog(
        uid,
        "GET",
        req.originalUrl,
        tournament,
        "Se pide un torneo de la base de datos"
      );
      res.send(tournament);
    } catch (err) {
      await createLog(uid, "GET", req.originalUrl, err); // registro en caso de error
      next(err);
    }
  },
  getAllTournamentTeams: async (req, res, next) => {
    const { _id } = req.params;
    const { uid } = req.body;
    try {
      const teams = await Tournaments.findById(_id).populate("teams", "name");
      // registro en caso de exito en log
      await createLog(
        uid,
        "GET",
        req.originalUrl,
        teams,
        "Se pide todos equipos un torneo de la base de datos"
      );
      res.send(teams.teams);
    } catch (err) {
      await createLog(uid, "GET", req.originalUrl, err); // registro en caso de error
      next(err);
    }
  },

  searchTournament: async (req, res, next) => {
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


  // RUTAS DE PEDIDO POST SOLO ADMIN
  createTournament: async (req, res, next) => {
    const {
      active,
      beginning,
      ending,
      stage,
      title,
      details,
      type,
      uid,
      image_url,
    } = req.body;

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
        image_url,
      });
      await newTournament.save();
      // registro en caso de exito en log
      await createLog(
        uid,
        "POST",
        req.originalUrl,
        newTournament,
        "Se crea un nuevo torneo en la base de datos"
      );

      res.status(200).send(newTournament._id);
    } catch (err) {
      await createLog(uid, "POST", req.originalUrl, err); // registro en caso de error
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
      // registro en caso de exito en log
      await createLog(
        uid,
        "PUT",
        req.originalUrl,
        savedTournament,
        "Se cargan los equipos del torneo en la base de datos"
      );
      res.status(201).send(`Teams was updated`);
    } catch (err) {
      await createLog(uid, "PUT", req.originalUrl, err); // registro en caso de error
      next(err);
    }
  },
  addUsertoTournament: async (req, res, next) => {
    const { _id, id } = req.params;
    try {
      // Verificar que los datos de entrada sean válidos
      if (!_id || !id) {
        return res.status(400).send({ message: "Invalid input data" });
      }
      // check si el torneo existe
      const tournament = await Tournaments.findById(_id);
      if (!tournament) {
        return res.status(404).send({ message: "Tournament not found" });
      }
      // check si el user existe
      const user = await Users.findOne({ id });
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      // check si el usuario ya se registro previamente
      if (tournament.users.includes(user.id)) {
        return res
          .status(400)
          .send({ message: "User already registered in tournament" });
      }

      // Agregar el usuario al torneo y guardar los cambios
      tournament.users.push(user.id); 
      await tournament.save();

      // registro en caso de exito en log
      await createLog(
        user.uid,
        "PUT",
        req.originalUrl,
        tournament,
        "Se agrego el usuario en el torneo"
      );
      // Responder con los datos actualizados del torneo
      res.send({ tournament });
    } catch (error) {
      await createLog(uid, "PUT", req.originalUrl, error); // registro en caso de error
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

      // registro en caso de exito en log
      await createLog(
        uid,
        "PUT",
        req.originalUrl,
        savedTournament,
        "Se edito un torneo de la base datos"
      );
      res.status(201).send("Tournament was updated");
    } catch (err) {
      await createLog(uid, "PUT", req.originalUrl, err); // registro en caso de error
      next(err);
    }
  },

  deleteOne: async (req, res, next) => {
    const { _id } = req.params;
    const { uid } = req.body;
    const user = await Users.findOne({ uid });
    validationUser(user, res);
    try {
      const removedTournament = await Tournaments.findByIdAndDelete(_id);
      // registro en caso de exito en log
      await createLog(
        uid,
        "DELETE",
        req.originalUrl,
        removedTournament,
        "Se elimino el torneo de la base de datos"
      );
      res.send(`Tournament deleted from database`);
    } catch (err) {
      await createLog(uid, "DELETE", req.originalUrl, err); // registro en caso de error
      next(err);
    }
  },
  deleteAll: async (req, res, next) => {
    const { uid } = req.body;

    const user = await Users.findOne({ uid });
    validationUser(user, res);

    try {
      const removeAllTournaments = await Tournaments.deleteMany();
      // registro en caso de exito en log
      await createLog(
        uid,
        "DELETE",
        req.originalUrl,
        removeAllTournaments,
        "Se eliminaron todos los torneos de la base de datos"
      );

      res.send(`Deleted from database`);

    } catch (err) {
      await createLog(uid, "DELETE", req.originalUrl, err); // registro en caso de error
      next(err);
    }
  },
};
