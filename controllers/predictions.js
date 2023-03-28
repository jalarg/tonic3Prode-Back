const { Predictions, Users, Teams } = require("../db_models");

module.exports = {

  // PERMISO PARA TODOS LOS USUARIOS
  getAll: async (req, res, next) => {
    try {
      const predictions = await Predictions.find();
      res.send(predictions);
    } catch (err) {
      next(err);
    }
  },

  findUserPredictions: async (req, res) => {
    try {
      const userUid = req.params.uid;
      const user = await Users.findOne({ uid: userUid });
      console.log("el ID",user.id)
      const predictions = await Predictions.find({ userId: user.id }) 
        .populate("userId", "fullName username email")
        .lean();
      if (predictions.length === 0) {
        return res
          .status(404)
          .send({ error: "No predictions were found for this user." });
      }
      res.send(predictions);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ error: "Error when searching the predictions of this user" });
    }
  },

  bulkCreatePredictions: async (req, res, next) => {
    const userId = req.params.uid;
    const predictionsData = req.body;
    try {
      const userToAddPredictions = await Users.findOne({ uid: userId });
      if (!userToAddPredictions) {
        return res.status(404).send("User not found");
      }
      if (!Array.isArray(predictionsData) || predictionsData.length === 0) {
        return res.status(400).send({ error: "Invalid or missing games data" });
      }
      const predictions = [];
      for (const predictionData of predictionsData) {
        const gameId = predictionData.gameId;
        // Front sends only names and back looks into the DB for the id
        let prediction = predictionData.prediction;
        const homeTeam = await Teams.findOne({ name: prediction.homeTeam });
        const awayTeam = await Teams.findOne({ name: prediction.awayTeam });
        prediction = { ...prediction, homeTeam: homeTeam, awayTeam: awayTeam };
        const newPrediction = new Predictions({
          userId: userToAddPredictions.id,
          gameId: gameId,
          prediction: prediction,
        });
        predictions.push(newPrediction);
        await newPrediction.save();
      }
      res.send(
        `${
          predictions.length
        } have been sucessfully created. Details: ${JSON.stringify(
          predictions
        )}`
      );
    } catch (err) {
      next(err);
    }
  },

  bulkUpdatePredictions: async (req, res, next) => {
    const userId = req.params.uid;
    const predictionsData = req.body;
    try {
      const userToUpdatePredictions = await Users.findOne({ uid: userId });
      if (!userToUpdatePredictions) {
        return res.status(404).send("User not found");
      }
      if (!Array.isArray(predictionsData) || predictionsData.length === 0) {
        return res.status(400).send({ error: "Invalid or missing games data" });
      }
      const predictionsToUpdate = [];
      for (const predictionData of predictionsData) {
        const gameId = predictionData.gameId;
        // Front sends only names and back looks into the DB for the id
        let prediction = predictionData.prediction;
        const homeTeam = await Teams.findOne({ name: prediction.homeTeam });
        const awayTeam = await Teams.findOne({ name: prediction.awayTeam });
        prediction = { ...prediction, homeTeam: homeTeam, awayTeam: awayTeam };
        const updateFilter = {
          userId: userToUpdatePredictions.id,
          gameId: gameId,
        };
        const update = {
          prediction: prediction,
        };
        const result = await Predictions.updateMany(updateFilter, update);
        predictionsToUpdate.push(result);
      }
      res.send(`${predictionsToUpdate.length} have been successfully updated.`);
    } catch (err) {
      next(err);
    }
  },

  // RUTAS SOLO PARA TESTING EN BACK

  deleteAllPredictions: async (req, res, next) => {
    try {
      await Predictions.deleteMany();
      res.send("All predictions were deleted");
    } catch (err) {
      next(err);
    }
  },

  deleteOnePrediction: async (req, res, next) => {
    console.log(req.body);
    try {
      await Predictions.findOneAndDelete({ _id: req.body._id });
      res.send("The prediction was deleted");
    } catch (err) {
      next(err);
    }
  },
};
