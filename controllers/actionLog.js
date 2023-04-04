const mongoose = require("mongoose");
const { ActionLog } = require("../db_models");

module.exports = {
  getAll: async (req, res) => {
    try {
      const logs = await ActionLog.find();
      res.send(logs);
    } catch (error) {
      next(error);
    }
  },
  getUserLog: async (req, res, next) => {
    try {
      const { user } = req.params;
      const logs = await ActionLog.find({ user });
      res.status(200).send({ logs });
    } catch (error) {
      next(error);
    }
  },
  deleteLogs: async (req, res, next) => {
    try {
      await ActionLog.deleteMany();
      res.send("All the logs were deleted");
    } catch (err) {
      next(err);
    }
  },
};
