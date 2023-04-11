const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = Schema({
  tournamentId: {
    type: Schema.Types.ObjectId,
    ref: "Tournament",
    required: true,
  },
  country: { type: String, required: true },
  position: { type: Number, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  score: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

schema.index({ tournamentId: 1, country: 1, position: 1 }, { unique: true });

const model = mongoose.model("ranking", schema);

module.exports = model




// // función para comparar la predicción del usuario con el resultado del partido
// function compararPrediccion(partido, prediccion) {
//   let puntos = 0;

//   // si la predicción coincide exactamente con el resultado, se otorgan 3 puntos
//   if (prediccion.homeTeamScore === partido.result.homeTeamScore && prediccion.awayTeamScore === partido.result.awayTeamScore) {
//     puntos = 3;
//   }
//   // si la predicción acierta el ganador del partido, se otorga 1 punto
//   else if ((prediccion.homeTeamScore > prediccion.awayTeamScore && partido.result.homeTeamScore > partido.result.awayTeamScore) ||
//            (prediccion.homeTeamScore < prediccion.awayTeamScore && partido.result.homeTeamScore < partido.result.awayTeamScore)) {
//     puntos = 1;
//   }
//   return puntos;
// }


