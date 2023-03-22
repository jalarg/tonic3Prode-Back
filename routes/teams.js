const express = require("express");
const router = express.Router();
const { Teams }  = require("../db_models");
const teams = require("../seed/teams");


// OBTENER TODOS LOS EQUIPOS
router.get("/", async (req, res, next) => {
  try{
    const teams = await Teams.find();
    res.json(teams);

  }
  catch(next) {
    console.log("Error");
  }
   
});


// CREAR EQUIPOS [BULK CREATE - SEED INICIAL]
router.post("/", async (req, res, next) => {
  try{
    const data = await Teams.insertMany(teams)
    res.json(data);
  }
  catch(next) {
    console.log("Error");
  }
   
})



module.exports = router;


// AGREGAR EQUIPO
router.post("/addteam", async (req, res, next) => {
  try{
    const newTeam = new Teams(req.body);
    const savedTeam = await newTeam.save();
    res.json(savedTeam);
  }
  catch(next) {
    console.log("Error");
  }
});


