const mongoose = require("mongoose");
const { Prizes } = require("../db_models");

module.exports = {
  getAll: async (req, res, next) => {
    try {
      const prizes = await Prizes.find();
      res.send(prizes);
    } catch (err) {
      next(err);
    }
  },
  addOnePrize: async (req, res, next) => {
    console.log(req.body, "llego esto")
    try {
      const newPrize = new Prizes(req.body);
      const savedPrize = await newPrize.save();
      res.send(savedPrize);
    } catch (err) {
      next(err);
    }
  },
  changeOnePrize: async (req, res, next) => {
    const prizeId = req.params.id;
    const prizeDataToUpdate = req.body;
    try {
      const updatedPrize = await Prizes.findOneAndUpdate(
        { _id: prizeId },
        prizeDataToUpdate,
        { new: true }
      );
      if (!updatedPrize) {
        res.status(404).send("Prize not found");
      } else {
        res.send(updatedPrize);
      }
    } catch (error) {
      if (error instanceof mongoose.CastError) {
        res.status(400).send("Invalid prize ID");
      } else {
        res.status(500).send("Error updating prize");
      }
    }
  },

  deletePrizes: async (req, res) => {
    await Prizes.deleteMany();
    res.send("All prizes were deleted");
  },

  deleteOnePrize: async (req, res) => {
    const prize = await Prizes.findOneAndDelete({
      tournament: req.body.tournament,
    });
    res.send("The prize was deleted");
  },
};
