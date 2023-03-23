const { Users } = require("../db_models");

module.exports = {
  getAll: async (req, res, next) => {
    try {
      const bets = await Users.find();
      res.send(bets);
    } catch (err) {
      next(err);
    }
  },
  createOneUser: async (req, res, next) => {
    try {
      const newUser = new Users(req.body);
      const savedUser = await newUser.save();
      res.send(savedUser);
    } catch (err) {
      next(err);
    }
  },
  deleteUsers: async (req, res, next) => {
    try {
      await Users.deleteMany();
      res.send("All the users were deleted");
    } catch (err) {
      next(err);
    }
  },
  deleteOneUser: async (req, res, next) => {
    try {
      const user = await Users.findOneAndDelete({ uid: req.body.uid });
      res.send("The user was deleted");
    } catch (err) {
      next(err);
    }
  },
};