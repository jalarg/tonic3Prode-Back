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
      case userWinner === matchWinner:
        return 1;
      case userHomeTeamScore === matchHomeTeamScore &&
        userAwayTeamScore === matchAwayTeamScore:
        return 3;
      default:
        return 0;
    }
  },
};
