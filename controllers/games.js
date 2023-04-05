const { Games, Users } = require("../db_models");
const gamesData = require("../seed/games");
const { validationUser } = require("../utils/environments");
const { createLog } = require("../utils/createLog");

module.exports = {
  getAll: async (req, res, next) => {
    const { uid } = req.params;
    try {
      const games = await Games.find({}).populate("tournaments");
      // registro en caso de exito en log
      await createLog(
        uid,
        "GET",
        req.originalUrl,
        games,
        "Se solicitan todos los partidos de la base de datos"
      );
    } catch (err) {
      await createLog(uid, "GET", req.originalUrl, err); // registro en caso de error
      next(err);
    }
  },

  getGamesByTournamentId: async (req, res, next) => {
    const { _id , uid } = req.params
    try {
      const games = await Games.find({ tournaments: _id }).populate(
        "tournaments",
        "title"
      );
      // registro en caso de exito en log
      await createLog(
        uid,
        "GET",
        req.originalUrl,
        games,
        "Solicitando todos los partidos de un torneo especifico"
      );
      res.send(games);
    } catch (err) {
      await createLog(uid, "GET", req.originalUrl, err); // registro en caso de error
      next(err);
    }
  },

  bulkCreateAGames: async (req, res, next) => {
    const tournamentId = req.params.id;
    const { matches, uid } = req.body;
    const user = await Users.findOne({ uid });
    validationUser(user, res);
    try {
      if (!Array.isArray(matches) || matches.length === 0) {
        return res.status(400).send({ error: "Invalid or missing games data" });
      }

      const games = [];

      for (let i = 0; i < matches.length; i++) {
        const homeTeam = matches[i].homeTeam;
        const awayTeam = matches[i].awayTeam;
        const hour = matches[i].time;
        const hourMinutes = hour.split(":").join("");

        const gameIndex = i + 1;
        const dateObj = new Date(matches[i].date);
        const dayOfTheWeek = dateObj.getDay();
        const dayOfTheMonth = dateObj.getDate();
        const month = dateObj.getMonth() + 1;

        const newGame = new Games({
          tournaments: tournamentId,
          gameIndex: gameIndex,
          stage: "initial",
          status: "pending",
          details: "details of the match",
          teams: [homeTeam, awayTeam],
          dayOfTheWeek: dayOfTheWeek,
          dayOfTheMonth: dayOfTheMonth,
          month: month,
          hour: hourMinutes,
        });
        games.push(newGame);
        await newGame.save();
      }
      // registro en caso de exito en log
      await createLog(
        uid,
        "POST",
        req.originalUrl,
        games,
        "Creando todos los partidos de un torneo especifico"
      );
      res.send("Los encuentros se han creado correctamente");
    } catch (err) {
      await createLog(uid, "POST", req.originalUrl, err); // registro en caso de error
      next(err);
    }
  },

  addManyResults: async (req, res, next) => {
    const results = req.body.results;
    const uid = req.body.uid;
    const user = await Users.findOne({ uid });
    validationUser(user, res);
    try {


       const gamesUpdated = [];

      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        const gameId = result.gameId;
        const homeTeam = result.homeTeam;
        const awayTeam = result.awayTeam;
        const homeTeamScore = result.homeTeamScore;
        const awayTeamScore = result.awayTeamScore;
        const winner = result.winner;

        const game = await Games.findOne({ _id: gameId });

        // Validar que los equipos ingresados existan
        if (
          !game.teams[0].name.includes(homeTeam) ||
          !game.teams[1].name.includes(awayTeam)
        ) {
          return res.status(400).send({ error: "Invalid or missing teams" });
        }

        // Validar que los resultados sean correctos
        if (homeTeamScore < 0 || awayTeamScore < 0) {
          return res.status(400).send({ error: "Invalid or missing scores" });
        }
        if (winner !== homeTeam && winner !== awayTeam) {
          return res.status(400).send({ error: "Invalid or missing winner" });
        }

        const updatedGame = await Games.findOneAndUpdate(
          { _id: gameId },
          {
            result: {
              homeTeam,
              awayTeam,
              homeTeamScore,
              awayTeamScore,
              winner,
            },
          },
          { new: true }
        );
        gamesUpdated.push(updatedGame);
      }
      // registro en caso de exito en log
      await createLog(
        uid,
        "PUT",
        req.originalUrl,
        gamesUpdated,
        "Se modifican varios resultados de partidos de un torneo a la vez"
      );
      res.send("Los resultados se han agregado correctamente");
    } catch (err) {
      await createLog(uid, "PUT", req.originalUrl, err); // registro en caso de error
      next(err);
    }
  },

  adminEditAGame: async (req, res) => {
    const { uid } = req.body;
    const { id } = req.params;
    const user = await Users.findOne({ uid });
    validationUser(user, res);
    try {
      const game = await Games.findOneAndUpdate({ _id: id }, req.body);
      // registro en caso de exito en log
      await createLog(
        uid,
        "PUT",
        req.originalUrl,
        game,
        "Se modifican varios resultados de partido de un torneo a la vez"
      );
      res.send(game);
    } catch (err) {
      await createLog(uid, "PUT", req.originalUrl, err); // registro en caso de error
      next(err);
    }
  },

  adminDeleteAGame: async (req, res) => {
    const { uid } = req.body;
    const { id } = req.params;
    const user = await Users.findOne({ uid });
    validationUser(user, res);
    try {
      const game = await Games.deleteOne({ _id: id });
      // registro en caso de exito en log
      await createLog(
        uid,
        "DELETE",
        req.originalUrl,
        game,
        "Se borro un juego de la base de datos"
      );
      res.send(game);
    } catch (err) {
      await createLog(uid, "DELETE", req.originalUrl, err); // registro en caso de error
      next(err)
    }
  },

  deleteGames: async (req, res, next) => {
    const { uid } = req.body;
    const user = await Users.findOne({ uid });
    validationUser(user, res);
    try {
      const games = await Games.deleteMany();
      // registro en caso de exito en log
      await createLog(
        uid,
        "DELETE",
        req.originalUrl,
        games,
        "Se borraron todos los juegos de la base de datos"
      );
      res.send("All games were deleted");
    } catch (err) {
      await createLog(uid, "DELETE", req.originalUrl, err); // registro en caso de error
      next(err);
    }
  },
};
