const {
  Games,
  Users,
  Tournaments,
  Teams,
  Predictions,
  Rankings,
} = require("../db_models");
const { validationUser } = require("../utils/environments");
const { createLog } = require("../utils/createLog");
const { addPointsToUser, calculatePointsToAdd } = require("../utils/ranking");

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
  bulkUpdateDate: async (req, res, next) => {
    const results = req.body.myData;
    const uid = req.body.uid;
    const user = await Users.findOne({ uid });
    validationUser(user, res);
    try {
      const gamesUpdated = [];

      for (let i = 0; i < results.length; i++) {
        const gameToUpdate = results[i];
        const gameId = gameToUpdate._id;
        const month = gameToUpdate.month;
        const hour = gameToUpdate.hour;
        const dayOfTheMonth = gameToUpdate.dayOfTheMonth;
        const dayOfTheWeek = gameToUpdate.dayOfTheWeek;

        const updatedGame = await Games.findOneAndUpdate(
          { _id: gameId },
          {
            dayOfTheMonth: dayOfTheMonth,
            dayOfTheWeek: dayOfTheWeek,
            month: month,
            hour: hour,
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
        "las fechas de los partidos se han actualizado correctamente"
      );
      res.send("las fechas de los partidos se han actualizado correctamente");
    } catch (err) {
      await createLog(uid, "PUT", req.originalUrl, err); // registro en caso de error
      next(err);
    }
  },

  addManyResults: async (req, res, next) => {
    /* [AGREGAR NUEVOS RESULTADOS] */
    const { id } = req.params;
    const results = req.body.myData;
    const uid = req.body.uid;
    const user = await Users.findOne({ uid });
    validationUser(user, res);
    try {
      const gamesUpdated = [];

      for (let i = 0; i < results.length; i++) {
        const gameToUpdate = results[i];
        const gameId = gameToUpdate._id;
        const stage = gameToUpdate.stage;
        const homeTeam = gameToUpdate.teams[0].name;
        const awayTeam = gameToUpdate.teams[1].name;
        const homeTeamScore = gameToUpdate.result.homeTeamScore;
        const homeTeamPenalties = gameToUpdate.result.homeTeamPenalties;
        const awayTeamScore = gameToUpdate.result.awayTeamScore;
        const awayTeamPenalties = gameToUpdate.result.awayTeamPenalties;
        const winningType = gameToUpdate.result.winningType;
        const month = gameToUpdate.month;
        const hour = gameToUpdate.hour;
        const dayOfTheMonth = gameToUpdate.dayOfTheMonth;
        const dayOfTheWeek = gameToUpdate.dayOfTheWeek;
        let winningTeam = "";

        if (winningType === "regular") {
          if (homeTeamScore > awayTeamScore) {
            winningTeam = homeTeam;
          } else {
            winningTeam = awayTeam;
          }
        } else if (winningType === "penalties") {
          if (
            homeTeamScore + homeTeamPenalties >
            awayTeamScore + awayTeamPenalties
          ) {
            winningTeam = homeTeam;
          } else {
            winningTeam = awayTeam;
          }
        }

        const newstatus = gameToUpdate.result.homeTeamScore
          ? "closed"
          : "pending";

        const updatedGame = await Games.findOneAndUpdate(
          { _id: gameId },
          {
            stage: stage,
            status: newstatus,
            dayOfTheMonth: dayOfTheMonth,
            dayOfTheWeek: dayOfTheWeek,
            month: month,
            hour: hour,
            result: {
              homeTeam: homeTeam ? homeTeam : "",
              awayTeam: awayTeam ? awayTeam : "",
              homeTeamScore: homeTeamScore ? homeTeamScore : "",
              awayTeamScore: awayTeamScore ? awayTeamScore : "",
              homeTeamPenalties: homeTeamPenalties ? homeTeamPenalties : "",
              awayTeamPenalties: awayTeamPenalties ? awayTeamPenalties : "",
              winningTeam: winningTeam ? winningTeam : "",
              winningType: winningType ? winningType : "",
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

      /* [CREACION DE NUEVOS PARTIDOS] */
      // Verificar si se han registrado resultados para todos los juegos de la fase anterior
      // necesito buscar todos los games de un torneo y filtrar por stage y verificar si el array de resultados tiene resultado
      const games = await Games.find({ tournaments: id });
      let minStage = Number.MAX_SAFE_INTEGER;
      games.forEach((game) => {
        if (game.stage < minStage) {
          minStage = game.stage;
        }
      });
      console.log("Menor stage encontrado:", minStage);
      const gamesInStage = games.filter((game) => game.stage === minStage);
      const allResultsRegistered = gamesInStage.every(
        (game) => game.status === "closed"
      );
      console.log("Todos los resultados registrados:", allResultsRegistered);

      // si allResultsRegistered es true, entonces se mappean los resultados para obtener los ganadores y se crea una nueva fase
      if (allResultsRegistered) {
        // Crear un array para almacenar los objetos de los equipos ganadores
        const winningTeams = [];
        console.log(winningTeams, "antes de buscar los equipos ganadores");
        // Buscar los objetos de los equipos ganadores y agregarlos al array
        for (const game of gamesInStage) {
          const winners = await Teams.find({
            name: game.result.winningTeam,
          });
          console.log(winners, "winners");
          winningTeams.push(winners);
        }
        if (winningTeams.length === 1) {
          return res.send("El torneo ha finalizado");
        }
        let gameIndex = 1;
        // Crear los juegos de la nueva fase
        for (let i = 0; i < winningTeams.length; i += 2) {
          const team1 = winningTeams[i][0];
          const team2 = winningTeams[i + 1][0];

          const newStage =
            winningTeams.length === 16
              ? "8"
              : winningTeams.length === 8
              ? "4"
              : winningTeams.length === 4
              ? "2"
              : winningTeams.length === 2
              ? "1"
              : "";
          console.log(winningTeams.length, "longitud de winningTeams");
          console.log("Nueva fase:", newStage);

          // Obtén la fecha actual
          const currentDate = new Date();

          // Genera valores aleatorios para la fecha
          const oneDayMs = 24 * 60 * 60 * 1000; // milisegundos en un día
          const oneMonthMs = 30 * oneDayMs; // milisegundos en un mes
          const randomDays = Math.floor(Math.random() * 7) + 1; // un número aleatorio de 1 a 7
          const randomMonth = Math.floor(Math.random() * 3) + 1; // un número aleatorio de 1 a 3
          const randomHour = Math.floor(Math.random() * 24); // un número aleatorio de 0 a 23
          const randomDayOfMonth = Math.min(
            Math.floor(Math.random() * 30) + 1,
            new Date(
              currentDate.getFullYear(),
              currentDate.getMonth() + randomMonth,
              0
            ).getDate()
          );

          // Crea la nueva fecha sumando los valores aleatorios a la fecha actual
          const newDate = new Date(
            currentDate.getTime() +
              randomDays * oneDayMs +
              randomMonth * oneMonthMs +
              randomHour * 60 * 60 * 1000
          );
          // establece los valores de día del mes y hora
          newDate.setDate(randomDayOfMonth);
          newDate.setHours(randomHour);

          const newGame = new Games({
            tournaments: id,
            gameIndex: gameIndex++,
            stage: newStage,
            status: "pending",
            details: "details of the match",
            teams: [team1, team2],
            dayOfTheWeek: newDate.getDay(),
            dayOfTheMonth: newDate.getDate() + 1,
            month: newDate.getMonth(),
            hour: newDate.getHours(),
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

  //-----------------------------ADMIN RANKING--------------------------------
  adminUpdateRanking: async (req, res) => {
    const { id } = req.params;
    const games = req.body.myData;
    const uid = req.body.uid;
    const user = await Users.findOne({ uid });
    validationUser(user, res);

    try {
      let allGamesPredictions = [];

      for (let i = 0; i < games.length; i++) {
        const game = games[i];
        const {
          homeTeamScore,
          awayTeamScore,
          homeTeamPenalties,
          awayTeamPenalties,
          winningTeam,
          winningType,
        } = game.result;
        let points = 0;

        const gamePredictions = await Predictions.find({
          gameId: game._id,
        });

        gamePredictions.map((prediction) => {
          console.log(
            "PREDICTION HOME TEAM SCORE",
            parseInt(prediction.prediction.homeTeamScore)
          );
          console.log(
            "PREDICTION AWAY TEAM SCORE",
            parseInt(prediction.prediction.awayTeamScore)
          );
          console.log("RESULTADO HomeTeamScore", parseInt(homeTeamScore));
          console.log("RESULTADO AwayTeamScore", parseInt(awayTeamScore));

          if (
            parseInt(prediction.prediction.homeTeamScore) === "" ||
            parseInt(prediction.prediction.awayTeamScore) === ""
          ) {
            points = 0;
          } else if (
            parseInt(prediction.prediction.homeTeamScore) ===
              parseInt(homeTeamScore) &&
            parseInt(prediction.prediction.awayTeamScore) ===
              parseInt(awayTeamScore)
          ) {
            points = 5;
          } else if (
            parseInt(homeTeamScore) === parseInt(awayTeamScore) &&
            ((parseInt(homeTeamPenalties) > parseInt(awayTeamPenalties) &&
              parseInt(prediction.prediction.homeTeamScore) >
                parseInt(prediction.prediction.awayTeamScore)) ||
              (parseInt(homeTeamPenalties) < parseInt(awayTeamPenalties) &&
                parseInt(prediction.prediction.homeTeamScore) <
                  parseInt(prediction.prediction.awayTeamScore)))
          ) {
            points = 3;
          } else if (
            (parseInt(prediction.prediction.homeTeamScore) >
              parseInt(prediction.prediction.awayTeamScore) &&
              parseInt(homeTeamScore) > parseInt(awayTeamScore)) ||
            (parseInt(prediction.prediction.homeTeamScore) <
              parseInt(prediction.prediction.awayTeamScore) &&
              parseInt(homeTeamScore) < parseInt(awayTeamScore))
          ) {
            points = 3;
          } else {
            points = 0;
          }
          prediction.points = points;
        });

        allGamesPredictions.push(gamePredictions);
      }

      const promises = allGamesPredictions.flatMap((gamePredictions) =>
        gamePredictions.map((prediction) => {
          console.log("LINEA 396 ========>", prediction);
          return Predictions.findOneAndUpdate(
            { _id: prediction._id },
            { points: prediction.points }
          );
        })
      );

      const updatedPredictions = await Promise.all(promises);

      const rankingsPromises = allGamesPredictions.flatMap((gamePredictions) =>
        gamePredictions.map((prediction) => {
          // Busca la predicciÃ³n actualizada dentro de `updatedPredictions`
          const updatedPrediction = updatedPredictions.find(
            (p) => p._id.toString() === prediction._id.toString()
          );

          return Rankings.findOneAndUpdate(
            {
              userId: prediction.userId,
              tournamentId: id,
              predictions: { $in: [prediction._id] },
            },
            {
              $set: { "predictions.$": updatedPrediction },
            },
            { new: true }
          ).then((rankings) => {
            if (!rankings) {
              return Rankings.updateOne(
                {
                  userId: prediction.userId,
                  tournamentId: id,
                },
                {
                  $push: { predictions: updatedPrediction },
                },
                { upsert: true }
              );
            }
            return rankings;
          });
        })
      );

      const updatedRankings = await Promise.all(rankingsPromises);

      res.send("Updated ranking predictions");
    } catch (err) {
      await createLog(uid, "PUT", req.originalUrl, err);
      next(err);
    }
  },
  //-----------------------------ADMIN RANKING--------------------------------

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
