const { Games } = require("../db_models");

module.exports = {
  getAll: async (req, res) => {
    let games;
    try {
      games = await Games.find({});
      res.send(games);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  getAGameById: async (req, res) => {
    let game;
    try {
      game = await Games.findById(req.params.id);
      res.send(game);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  adminCreateAGame: async (req, res) => {
    let game;
    try {
      game = await Games.create(req.body);
    } catch (error) {
      res.status(500).send(error);
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
};
