// EJEMPLO CREAR GAME
const gamesData = [
  [
    {
      name: "River Plate",
      logo_url:
        "https://copaargentina.s3.amazonaws.com/original/m107800_River_Plate.svg",
      division: "Liga Profesional",
      foundation: "25 de mayo de 1901",
      origin: "Buenos Aires, Argentina",
    },
    {
      name: "Racing de Córdoba",
      logo_url:
        "https://copaargentina.s3.amazonaws.com/original/m100082_Racing_de_Cordoba.svg",
      division: "Torneo Federal A",
      foundation: "1924",
      origin: "Córdoba, Argentina",
    },
    {
      dayOfTheWeek: 1,
      dayOfTheMonth: 24,
      month: 4,
      hour: 1400,
    },
  ],
  [
    {
      name: "Talleres",
      logo_url:
        "https://copaargentina.s3.amazonaws.com/original/m107326_Talleres_C.svg",
      division: "Liga Profesional",
      foundation: "12 de octubre de 1913",
      origin: "Córdoba, Argentina",
    },
    {
      name: "Chacarita Juniors",
      logo_url:
        "https://copaargentina.s3.amazonaws.com/original/m100712_Chacarita_juniors.svg",
      division: "Primera Nacional",
      foundation: "1 de mayo de 1906",
      origin: "San Martín, Buenos Aires, Argentina",
    },
    {
      dayOfTheWeek: 2,
      dayOfTheMonth: 28,
      month: 4,
      hour: 1600,
    },
  ],
  [
    {
      name: "Club Atlético Colón",
      logo_url:
        "https://copaargentina.s3.amazonaws.com/original/m100015_Colon-Santa-fe.svg",
      division: "Superliga Argentina",
      foundation: "5 de mayo de 1905",
      origin: "Santa Fe, Argentina",
    },
    {
      name: "Colegiales",
      logo_url:
        "https://copaargentina.s3.amazonaws.com/original/m107515_Colegiales.svg",
      division: "Primera B Metropolitana",
      foundation: "1 de mayo de 1909",
      origin: "Munro, Buenos Aires, Argentina",
    },
    {
      dayOfTheWeek: 3,
      dayOfTheMonth: 31,
      month: 4,
      hour: 2000,
    },
  ],
];


// EJEMPLO CARGAR RESULTADO DE A VARIOS

const bulkresult = {     
  "uid": "4",
  "results": [
        {
        "gameId": "6421dcff52fda86ff43069b4",
        "homeTeam": "River Plate",
        "awayTeam": "Racing de Córdoba",
        "homeTeamScore": 7,
        "awayTeamScore": 1,
        "winner": "River Plate"
        },
        {
        "gameId": "6421dcff52fda86ff43069b6",
        "homeTeam": "Talleres",
        "awayTeam": "Chacarita Juniors",
        "homeTeamScore": 0,
        "awayTeamScore": 0,
        "winner": "Talleres"
        }
        ]
}



module.exports = gamesData;