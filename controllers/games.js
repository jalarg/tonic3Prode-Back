const { Games } = require("../db_models");
const  gamesData = require("../seed/games");

module.exports = {
  getAll: async (req, res) => {
    let games;
    try {
      games = await Games.find({}).populate("tournaments");
      res.send(games);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  getAGameById: async (req, res) => {
    let game;
    try {
      game = await Games.findById(req.params.id).populate(
        "tournaments",
        "title"
      );
      res.send(game);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  adminCreateAGame: async (req, res) => {
    const { stage, status, details, result, tournaments } = req.body;
    const newGame = new Games({
      tournaments,
      stage,
      status,
      details,
      result,
    });
    await newGame.save();
    res.send(newGame);
  },

  // CREATE ALL GAMES OF ONE STAGE

  bulkCreateAGames: async (req, res, next) => {
    try {
      const { stage, status, details, result, tournaments } = req.body;

      if (!Array.isArray(gamesData) || gamesData.length === 0) {
            return res
              .status(400)
              .send({ error: "Invalid or missing games data" });
          }

      const games = [];

      for (let i = 0; i < gamesData.length; i++) {
        const team1 = gamesData[i][0];
        const team2 = gamesData[i][1];
        const dayOfTheWeek = gamesData[i][2].dayOfTheWeek;
        const dayOfTheMonth = gamesData[i][2].dayOfTheMonth;
        const month = gamesData[i][2].month;
        const hour = gamesData[i][2].hour;

        const newGame = new Games({
          tournaments,
          stage,
          status,
          details,
          teams: [team1, team2],
          dayOfTheWeek: dayOfTheWeek,
          dayOfTheMonth: dayOfTheMonth,
          month: month,
          hour: hour,
          result,
        });

        games.push(newGame);
        await newGame.save();  
      }
    res.send("Los encuentros se han creado correctamente");
    } catch (err) {
      next(err);
    }
  },

  adminEditAGame: async (req, res) => {
    let game;
    try {
      game = await Games.findOneAndUpdate({ _id: req.params.id }, req.body);
      res.send(game);
    } catch (error) {
      res.status(500).send(error);
    }
  },
  adminDeleteAGame: async (req, res) => {
    let game;
    try {
      game = await Games.deleteOne({ _id: req.params.id });
      res.send(game);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  deleteGames: async (req, res, next) => {
    try {
      await Games.deleteMany();
      res.send("All games were deleted");
    } catch (err) {
      next(err);
    }
  },
};
