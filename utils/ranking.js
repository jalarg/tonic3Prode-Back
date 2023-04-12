const { Rankings } = require("../db_models");

module.exports = {
  addPointsToUser: async (userId, pointsToAdd) => {
    try {
      const ranking = await Rankings.findOne({ userId });
      if (ranking) {
        ranking.score += pointsToAdd;
        await ranking.save();
        return ranking;
      }
      return null;
    } catch (err) {
      console.error(err);
      return null;
    }
  },
  calculatePointsToAdd: (
    userWinner,
    matchWinner,
    userHomeTeamScore,
    userAwayTeamScore,
    matchHomeTeamScore,
    matchAwayTeamScore
  ) => {
    switch (true) {
      case userWinner === "empate": // Verificar esto
      return 5
      case userWinner === matchWinner:
        return 3;
      case userHomeTeamScore === matchHomeTeamScore &&
        userAwayTeamScore === matchAwayTeamScore:
        return 5;
      default:
        return 0;
    }
  },
};
