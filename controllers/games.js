const { Games } = require("../db_models");

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
};
