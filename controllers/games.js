const { Games, Users, Tournaments, Teams } = require("../db_models");
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
      res.send(games);
    } catch (err) {
      await createLog(uid, "GET", req.originalUrl, err); // registro en caso de error
      next(err);
    }
  },

  getGamesByTournamentId: async (req, res, next) => {
    const { _id, uid } = req.params;
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
        const stage = matches[i].stage;
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
          stage: stage,
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
      // push games: Actualizar el torneo con los nuevos juegos
      const updatedTournament = await Tournaments.findOneAndUpdate(
        { _id: tournamentId },
        { $push: { games: { $each: games } } },
        { new: true }
      );

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
    const { id } = req.params;
    const results = req.body.myData;
    const uid = req.body.uid;
    console.log(results)
    const user = await Users.findOne({ uid });
    validationUser(user, res);
    try {
      const gamesUpdated = [];

      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        const gameId = result._id;
        const homeTeam = result.teams[0].name;
        const awayTeam = result.teams[1].name;
        const homeTeamScore = result.homeTeamScore;
        const homeTeamPenalties = result.homeTeamPenalties;
        const awayTeamScore = result.awayTeamScore;
        const awayTeamPenalties = result.awayTeamPenalties;
        const winningTeam = result.winningTeam;
        const winningType = result.winningType;

    

        const game = await Games.findOne({ _id: gameId });
        const newstatus = (game.result.homeTeam) === "pending" ? "closed" : "pending"
        // Validar que los equipos ingresados existan
        // if (
        //   !game.teams[0].name.includes(homeTeam) ||
        //   !game.teams[1].name.includes(awayTeam)
        // ) {
        //   return res.status(400).send({ error: "Invalid or missing teams" });
        // }

        // // Validar que los resultados sean correctos
        // if (homeTeamScore < 0 || awayTeamScore < 0) {
        //   return res.status(400).send({ error: "Invalid or missing scores" });
        // }
        // if (winner !== homeTeam && winner !== awayTeam) {
        //   return res.status(400).send({ error: "Invalid or missing winner" });
        // }


        const updatedGame = await Games.findOneAndUpdate(
          { _id: gameId },
          {
            status: newstatus,
            result: {
              homeTeam,
              awayTeam,
              homeTeamScore,
              awayTeamScore,
              homeTeamPenalties,
              awayTeamPenalties,
              winningTeam,
              winningType,
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

      // Verificar si se han registrado resultados para todos los juegos de la fase anterior
      // necesito buscar todos los games de un torneo y filtrar por stage y verificar si el array de resultados tiene resultado
      const games = await Games.find({ tournaments: id });

      // si la cantidad de resultados es igual a la cantidad de juegos de la fase anterior, entonces se cambia allResultsRegistered a true
      let allResultsRegistered = false;
      let count = 0;
      games.forEach(function (game) {
        if (game.result.length === 1) {
          count++;
          if (count === games.length) {
            allResultsRegistered = true;
          }
        }
      });

      // si allResultsRegistered es true, entonces se mappean los resultados para obtener los ganadores y se crea una nueva fase
      if (allResultsRegistered) {
        // Crear un array para almacenar los objetos de los equipos ganadores
        const winningTeams = [];

        // Buscar los objetos de los equipos ganadores y agregarlos al array
        games.forEach(function (game) {
          if (game.result.length !== 0) {
            game.result.forEach(function (result) {
              const winnerName = result.winner;
              game.teams.forEach(function (team) {
                if (team.name === winnerName) {
                  winningTeams.push(team);
                }
              });
            });
          }
        });

        // Crear los juegos de la nueva fase
        for (let i = 0; i < winningTeams.length; i += 2) {
          let gameIndex = 1;
          const team1 = winningTeams[i];
          const team2 = winningTeams[i + 1];

          const newGame = new Games({
            tournaments: id,
            gameIndex: gameIndex++,
            stage: winningTeams.length !== 0 ? winningTeams.length : 0,
            status: "pending",
            details: "details of the match",
            teams: [team1, team2],
            dayOfTheWeek: 0,
            dayOfTheMonth: 0,
            month: 0,
            hour: 0,
          });
          console.log("Juegos creados", newGame);

          games.push(newGame);
          await newGame.save();
        }
      }
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
      next(err);
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
