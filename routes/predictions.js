const express = require("express");
const router = express.Router();    
const {
  getAll,
  findUserPredictions,
  bulkCreatePredictions,
  bulkUpdatePredictions,
  deleteAllPredictions,
  deleteOnePrediction,
} = require("../controllers/predictions");

//-----------RUTAS GENERALES -------------//

// OBTENER TODAS LAS PREDICCIONES  
router.get("/", getAll);

// OBTENER TODAS LAS APUESTAS DE UN USUARIO
router.get("/:uid", findUserPredictions);

// AGREGAR VARIAS PREDICCIONES  
router.post("/create/:uid", bulkCreatePredictions); 

// MODIFICAR VARIAS PREDICCIONES  
router.put("/:uid", bulkUpdatePredictions);

//----- RUTAS SOLO PARA TESTING EN BACK -----//

// BORRAR TODAS LAS PREDICCIONES  
router.delete("/", deleteAllPredictions);

// BORRAR UNA PREDICCIONES  
router.delete("/:id", deleteOnePrediction);

module.exports = router;


