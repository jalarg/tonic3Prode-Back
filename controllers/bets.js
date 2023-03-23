const { Bets } = require("../db_models");

module.exports = {
  getAll: async (req, res, next) => {
    try {
      const bets = await Bets.find();
      res.send(bets);
    } catch (err) {
      next(err);
    }
  },
  findUserBets: async (req, res) => {
    try {
      const userId = req.params.id;
      const bets = await Bets.find({ userId })
        .populate("userId", "fullName username email")
        .lean();
      if (bets.length === 0) {
        return res
          .status(404)
          .json({ error: "No se encontraron apuestas para este usuario" });
      }
      res.send(bets);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Error al buscar las apuestas del usuario" });
    }
  },

  addOneBet: async (req, res, next) => {
    try {
      const newBet = new Bets(req.body);
      const savedBet = await newBet.save();
      res.send(savedBet);
    } catch (err) {
      next(err);
    }
  },

  deleteAllBets: async (req, res, next) => {
    try {
      await Bets.deleteMany();
      res.send("All bets were deleted");
    } catch (err) {
      next(err);
    }
  },

  deleteOneBet: async (req, res, next) => {
    console.log(req.body)
    try {
      await Bets.findOneAndDelete({ _id: req.body._id });
      res.send("The bet was deleted");
    } catch (err) {
      next(err);
    }
  },
};
