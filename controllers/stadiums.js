const { Stadiums } = require("../db_models");
const stadiumsArgentina = require("../seed/stadiums");

module.exports = {
  getAll: async (req, res, next) => {
    console.log(stadiumsArgentina);
    try {
      const stadiums = await Stadiums.find();
      res.send(stadiums);
    } catch (err) {
      next(err);
    }
  },
addStadiums: async (req, res, next) => {
  try {
    const stadiums = stadiumsArgentina.map((name) => ({ name }));
    const data = await Stadiums.insertMany(stadiums); 
    console.log(`${data.length} stadiums saved`);
    res.send(data);
  } catch (err) {
    next(err);
  }
},
addOneStadium: async (req, res, next) => {
    try {
      const newStadium = new Stadiums(req.body);
      const savedStadium = await newStadium.save();
      res.send(savedStadium);
    } catch (err) {
      next(err);
    }
  },
deleteOneStadium: async (req, res, next) => {
    try {
      await Stadiums.findOneAndDelete({ name: req.body.name });
      res.send("The Stadium selected was deleted");
    } catch (err) {
      next(err);
    }
  },
};
