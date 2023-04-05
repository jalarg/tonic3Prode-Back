const { Predictions, Users, Teams } = require("../db_models");
const { validationUser } = require("../utils/environments");
const { createLog } = require("../utils/createLog");

module.exports = {

  // GET DE TODAS LAS PREDICCIONES [SOLO PARA ADMINS]
  getAll: async (req, res, next) => {
    const { uid } = req.params;
    const user = await Users.findOne({ uid });
    validationUser(user, res);
    try {
      const predictions = await Predictions.find();
      // registro en caso de exito en log
      await createLog(
        uid,
        "GET",
        req.originalUrl,
        predictions,
        "Se solicitan todas las predicciones de la base de datos"
      );
      res.send(predictions);
    } catch (err) {
      await createLog(uid, "GET", req.originalUrl, err); // registro en caso de error
      next(err);
    }
  },

  findUserPredictions: async (req, res, next) => {
    const { uid } = req.params;
    try {
      const user = await Users.findOne({ uid: uid });
      const predictions = await Predictions.find({ userId: user._id })
        .populate("userId", "fullName username email")
        .lean();
      if (predictions.length === 0) {
        return res
          .status(404)
          .send({ error: "No predictions were found for this user." });
      }
      // registro en caso de exito en log
      await createLog(
        uid,
        "GET",
        req.originalUrl,
        predictions,
        "Usuario solicita sus predicciones de la base de datos"
      );
      res.send(predictions);
    } catch (err) {
      await createLog(uid, "GET", req.originalUrl, err); // registro en caso de error
      next(err);
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
      // registro en caso de exito en log
      await createLog(
        userId,
        "POST",
        req.originalUrl,
        predictions,
        "Se creo una prediccion de un usuario en la base de datos"
      );
      res.send(
        `${
          predictions.length
        } have been sucessfully created. Details: ${JSON.stringify(
          predictions
        )}`
      );
    } catch (err) {
      await createLog(userId, "POST", req.originalUrl, err); // registro en caso de error
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

      // registro en caso de exito en log
      await createLog(
        userId,
        "PUT",
        req.originalUrl,
        predictionsToUpdate,
        "Se modificaron las predicciones de un en la base de datos"
      );
      res.send(`${predictionsToUpdate.length} have been successfully updated.`);
    } catch (err) {
      await createLog(userId, "PUT", req.originalUrl, err); // registro en caso de error
      next(err);
    }
  },

  // RUTAS ADMIN

  deleteAllPredictions: async (req, res, next) => {
    const { uid } = req.body;
    const user = await Users.findOne({ uid });
    validationUser(user, res);
    try {
      const predictions = await Predictions.deleteMany();

      // registro en caso de exito en log
      await createLog(
        uid,
        "DELETE",
        req.originalUrl,
        predictions,
        "Se borraron todas las predicciones de un en la base de datos"
      );

      res.send("All predictions were deleted");
    } catch (err) {
      await createLog(uid, "DELETE", req.originalUrl, err); // registro en caso de error
      next(err);
    }
  },

  deleteOnePrediction: async (req, res, next) => {
    const { id } = req.params;
    const { uid } = req.body;
    const user = await Users.findOne({ uid });
    validationUser(user, res);
    try {
      const prediction = await Predictions.findOneAndDelete({ _id: id });
      // registro en caso de exito en log
      await createLog(
        uid,
        "DELETE",
        req.originalUrl,
        prediction,
        "Se borro una prediccion de la base de datos"
      );
      res.send("The prediction was deleted");
    } catch (err) {
      await createLog(uid, "DELETE", req.originalUrl, err); // registro en caso de error
      next(err);
    }
  },
};
