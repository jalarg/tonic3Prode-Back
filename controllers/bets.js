const { Bets } = require("../db_models");

module.exports = {
  getAll: async (req, res) => {
    const bets = await Bets.find();
    res.send(bets);
  },   
  findUserBets: async (req, res) => {
    try{
      const userId = req.params.id;
      const bets = await Bets.find({ userId }).populate('userId', 'fullName username email').lean();
      if (bets.length === 0) {
        return res.status(404).json({ error: 'No se encontraron apuestas para este usuario' });
      }
      res.send(bets);
    } catch(error) {
      console.error(error);
      res.status(500).json({ error: 'Error al buscar las apuestas del usuario' })
    }
    },
  addOneBet: async (req, res) => {
    const newBet = new Bets(req.body);
    const savedBet = await newBet.save();
    res.send(savedBet);
  },

  deleteAllBets: async (req, res) => {
    await Bets.deleteMany();
    res.send("All bets were deleted");
  },

  deleteOneBet: async (req, res) => {
    await Bets.findOneAndDelete({gameId: req.body.gameId });
    res.send("The bet was deleted");
  }, 


};


