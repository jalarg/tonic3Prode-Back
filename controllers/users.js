const { Users } = require("../db_models");

module.exports = {
  getAll: async (req, res) => {
    const bets = await Users.find();
    res.send(bets);
  },
  createOneUser: async (req, res) => {
    const newUser = new Users(req.body);
    const savedUser = await newUser.save();
    res.send(savedUser);
  },  
  deleteUsers: async (req, res) => {
    await Users.deleteMany();
    res.send("All the users were deleted");
  },
  deleteOneUser: async (req, res) => {
    const user = await Users.findOneAndDelete({nombre: req.body.nombre });
    res.send("The user was deleted");
  }, 
}