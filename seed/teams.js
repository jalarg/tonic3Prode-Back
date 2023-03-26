const teams = [
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
    name: "Lanús",
    logo_url:
      "https://copaargentina.s3.amazonaws.com/original/m100022_Lanus.svg",
    division: "Liga Profesional",
    foundation: "3 de enero de 1915",
    origin: "Lanús, Buenos Aires, Argentina",
  },
  {
    name: "Sol de Mayo",
    logo_url:
      "https://copaargentina.s3.amazonaws.com/original/m100111_Sol-de-Mayo-Viedma_ok.svg",
    division: "Torneo Federal A",
    foundation: "1920",
    origin: "Viedma, Río Negro, Argentina",
  },
  {
    name: "Club Atlético Gimnasia y Esgrima",
    logo_url:
      "https://copaargentina.s3.amazonaws.com/original/m100018_Gimnasia_y_Esgrima_La_Plata.svg",
    division: "Superliga Argentina",
    foundation: "3 de junio de 1887",
    origin: "La Plata, Buenos Aires, Argentina",
  },
  {
    name: "Excursionistas",
    logo_url:
      "https://copaargentina.s3.amazonaws.com/original/m112195_Excursionistas.svg",
    division: "Primera C Metropolitana",
    foundation: "1910",
    origin: "Belgrano, Buenos Aires, Argentina",
  },
  {
    name: "Unión",
    logo_url:
      "https://copaargentina.s3.amazonaws.com/original/m100034_Union-SF.svg",
    division: "Liga Profesional",
    foundation: "15 de abril de 1907",
    origin: "Santa Fe, Argentina",
  },
  {
    name: "Almagro",
    logo_url:
      "https://copaargentina.s3.amazonaws.com/original/m100037_Almagro-Ok.svg",
    division: "Primera Nacional",
    foundation: "6 de enero de 1911",
    origin: "José Ingenieros, Buenos Aires, Argentina",
  },
  {
    name: "Club Atlético Barracas Central",
    logo_url:
      "https://copaargentina.s3.amazonaws.com/original/m100052_Barracas_central.svg",
    division: "Primera Nacional",
    foundation: "5 de abril de 1904",
    origin: "Barracas, Ciudad de Buenos Aires, Argentina",
  },
  {
    name: "Estudiantes (Caseros)",
    logo_url:
      "https://copaargentina.s3.amazonaws.com/original/m100054_Estudiantes_BA.svg",
    division: "Primera Nacional",
    foundation: "1898",
    origin: "Caseros, Buenos Aires, Argentina",
  },
  {
    name: "Boca Juniors",
    logo_url:
      "https://copaargentina.s3.amazonaws.com/original/m111151_Boca_juniors.svg",
    division: "Liga Profesional",
    foundation: "3 de abril de 1905",
    origin: "La Boca, Buenos Aires, Argentina",
  },
  {
    name: "Olimpo",
    logo_url:
      "https://copaargentina.s3.amazonaws.com/original/m107525_Club_Olimpo.svg",
    division: "Torneo Federal A",
    foundation: "1910",
    origin: "Bahía Blanca, Buenos Aires, Argentina",
  },
  {
    name: "Racing Club",
    logo_url:
      "https://copaargentina.s3.amazonaws.com/original/m100025_Racing_Club__Oficial.svg",
    division: "Liga Profesional",
    foundation: "25 de marzo de 1903",
    origin: "Avellaneda, Argentina",
  },
  {
    name: "San Martín de Formosa",
    logo_url:
      "https://copaargentina.s3.amazonaws.com/original/m100084_San-martin-F.svg",
    division: "Torneo Federal A",
    foundation: "1922",
    origin: "Formosa, Argentina",
  },
  {
    name: "San Martín (Tucumán)",
    logo_url:
      "https://copaargentina.s3.amazonaws.com/original/m108747_San_Martin_T.svg",
    division: "Primera Nacional",
    foundation: "2 de noviembre de 1909",
    origin: "San Miguel de Tucumán, Tucumán, Argentina",
  },
  {
    name: "Deportivo Morón",
    logo_url:
      "https://copaargentina.s3.amazonaws.com/original/m107505_Dep_Moron.svg",
    division: "Primera Nacional",
    foundation: "20 de junio de 1947",
    origin: "Morón, Buenos Aires, Argentina",
  },
  {
    name: "Instituto",
    logo_url:
      "https://copaargentina.s3.amazonaws.com/original/m112055_Instituto_Atl_Ctral_Cba.svg",
    division: "Primera Nacional",
    foundation: "8 de agosto de 1918",
    origin: "Córdoba, Argentina",
  },
  {
    name: "Deportivo Riestra",
    logo_url:
      "https://copaargentina.s3.amazonaws.com/original/m100053_Dep_Riestra.svg",
    division: "Primera Nacional",
    foundation: "1931",
    origin: "Nueva Pompeya, Buenos Aires, Argentina",
  },
  {
    name: "Huracán",
    logo_url:
      "https://copaargentina.s3.amazonaws.com/original/m100020_Huracan.svg",
    division: "Liga Profesional",
    foundation: "1 de noviembre de 1908",
    origin: "Buenos Aires, Argentina",
  },
  {
    name: "Yupanqui",
    logo_url:
      "https://copaargentina.s3.amazonaws.com/original/m111518_Yupanqui.svg",
    division: "Primera D Metropolitana",
    foundation: "1922",
    origin: "Villa Lugano, Buenos Aires, Argentina",
  },
  {
    name: "Independiente",
    logo_url:
      "https://copaargentina.s3.amazonaws.com/original/m100021_Independiente-Ok.svg",
    division: "Liga Profesional",
    foundation: "4 de enero de 1905",
    origin: "Avellaneda, Argentina",
  },
  {
    name: "Club Ciudad de Bolívar",
    logo_url:
      "https://copaargentina.s3.amazonaws.com/original/m111659_Bolivar.svg",
    division: "Torneo Federal A",
    foundation: "1933",
    origin: "Bolívar, Buenos Aires, Argentina",
  },
  {
    name: "Central Córdoba (Santiago del Estero)",
    logo_url:
      "https://copaargentina.s3.amazonaws.com/original/m100041_Central_Cordoba_SdE.svg",
    division: "Liga Profesional",
    foundation: "3 de abril de 1919",
    origin: "Santiago del Estero, Argentina",
  },
  {
    name: "Comunicaciones",
    logo_url:
      "https://copaargentina.s3.amazonaws.com/original/m103624_Club_Comunicaciones.svg",
    division: "Primera B Metropolitana",
    foundation: "21 de octubre de 1931",
    origin: "Agronomía, Buenos Aires, Argentina",
  },
  {
    name: "Gimnasia y Esgrima de Mendoza",
    logo_url:
      "https://upload.wikimedia.org/wikipedia/commons/9/90/Escudo_Club_Atl%C3%A9tico_Gimnasia_y_Esgrima_Mendoza.png",
    division: "Primera Nacional",
    foundation: "1 de julio de 1908",
    origin: "Mendoza, Argentina",
  },
  {
    name: "All Boys",
    logo_url:
      "https://copaargentina.s3.amazonaws.com/original/m100049_All_Boys.svg",
    division: "Primera Nacional",
    foundation: "15 de marzo de 1913",
    origin: "Floresta, Buenos Aires, Argentina",
  },
  {
    name: "Club Atlético Estudiantes",
    logo_url:
      "https://copaargentina.s3.amazonaws.com/original/m103826_Estudiantes_LP.svg",
    division: "Superliga Argentina",
    foundation: "4 de agosto de 1905",
    origin: "La Plata, Buenos Aires, Argentina",
  },
  {
    name: "Independiente (CH)",
    logo_url:
      "https://copaargentina.s3.amazonaws.com/original/m111523_Independiente_Ch.svg",
    division: "Torneo Federal A",
    foundation: "1928",
    origin: "Chilecito, La Rioja, Argentina",
  },
  {
    name: "Club Atlético Arsenal",
    logo_url:
      "https://copaargentina.s3.amazonaws.com/original/m100038_Arsenal.svg",
    division: "Primera Nacional",
    foundation: "11 de enero de 1957",
    origin: "Sarandí, Provincia de Buenos Aires, Argentina",
  },
  {
    name: "Villa Mitre",
    logo_url:
      "https://copaargentina.s3.amazonaws.com/original/m100091_Villa_mitre_bb.svg",
    division: "Torneo Federal A",
    foundation: "1929",
    origin: "Bahía Blanca, Buenos Aires, Argentina",
  },
  {
    name: "Godoy Cruz",
    logo_url:
      "https://copaargentina.s3.amazonaws.com/original/m100019_Godoy_Cruz.svg",
    division: "Liga Profesional",
    foundation: "1 de junio de 1921",
    origin: "Mendoza, Argentina",
  },
  {
    name: "Defensores Unidos",
    logo_url:
      "https://copaargentina-photos.s3.amazonaws.com/original/m36113_def-unidos.png",
    division: "Primera B Metropolitana",
    foundation: "25 de marzo de 1916",
    origin: "Zárate, Buenos Aires, Argentina",
  },
  {
    name: "Sarmiento",
    logo_url:
      "https://copaargentina.s3.amazonaws.com/original/m100046_Sarmiento_de_junin.svg",
    division: "Liga Profesional",
    foundation: "1 de noviembre de 1911",
    origin: "Junín, Buenos Aires, Argentina",
  },
  {
    name: "Chaco For Ever",
    logo_url:
      "https://copaargentina.s3.amazonaws.com/original/m100059_Chaco_For_Ever.svg",
    division: "Federal A",
    foundation: "1913",
    origin: "Resistencia, Chaco, Argentina",
  },
  {
    name: "Rosario Central",
    logo_url:
      "https://copaargentina.s3.amazonaws.com/original/m100132_ROSARIO_CENTRAL.svg",
    division: "Liga Profesional",
    foundation: "24 de diciembre de 1889",
    origin: "Rosario, Argentina",
  },
  {
    name: "Central Norte",
    logo_url:
      "https://copaargentina.s3.amazonaws.com/original/m108305_Central_Norte_de_Salta.svg",
    division: "Torneo Federal A",
    foundation: "1919",
    origin: "Salta, Argentina",
  },
  {
    name: "Banfield",
    logo_url:
      "https://copaargentina.s3.amazonaws.com/original/m100012_Banfield.svg",
    division: "Liga Profesional",
    foundation: "21 de enero de 1896",
    origin: "Banfield, Buenos Aires, Argentina",
  },
  {
    name: "Argentino de Merlo",
    logo_url:
      "https://copaargentina.s3.amazonaws.com/original/m100099_Argentino_de_merlo.svg",
    division: "Primera C Metropolitana",
    foundation: "1960",
    origin: "Merlo, Buenos Aires, Argentina",
  },
  {
    name: "Atlético Tucumán",
    logo_url:
      "https://copaargentina.s3.amazonaws.com/original/m100011_Atletico-Tucuman.svg",
    division: "Liga Profesional",
    foundation: "27 de septiembre de 1902",
    origin: "San Miguel de Tucumán, Tucumán, Argentina",
  },
  {
    name: "Estudiantes de Río Cuarto",
    logo_url:
      "https://copaargentina.s3.amazonaws.com/original/m100071_Estudiantes_RC.svg",
    division: "Primera Nacional",
    foundation: "6 de diciembre de 1912",
    origin: "Río Cuarto, Córdoba, Argentina",
  },
  {
    name: "Club Atlético Defensa y Justicia",
    logo_url:
      "https://copaargentina.s3.amazonaws.com/original/m110513_Defensa_y_justicia.svg",
    division: "Superliga Argentina",
    foundation: "20 de marzo de 1935",
    origin: "Florencio Varela, Buenos Aires, Argentina",
  },
  {
    name: "Ituzaingó",
    logo_url:
      "https://copaargentina.s3.amazonaws.com/original/m107512_Ituzaingo.svg",
    division: "Primera B Metropolitana",
    foundation: "1 de julio de 1948",
    origin: "Ituzaingó, Buenos Aires, Argentina",
  },
  {
    name: "Tigre",
    logo_url:
      "https://copaargentina.s3.amazonaws.com/original/m106649_escudo_tigre_logo.svg",
    division: "Primera Nacional",
    foundation: "3 de agosto de 1902",
    origin: "Victoria, Buenos Aires, Argentina",
  },
  {
    name: "Centro Español",
    logo_url:
      "https://copaargentina.s3.amazonaws.com/original/m111501_Escudo-Centro-1.svg",
    division: "Primera D Metropolitana",
    foundation: "1956",
    origin: "Tapiales, Buenos Aires, Argentina",
  },
  {
    name: "San Lorenzo",
    logo_url:
      "https://copaargentina.s3.amazonaws.com/original/m100028_San_lorenzo_de_almagro.svg",
    division: "Liga Profesional",
    foundation: "1 de abril de 1908",
    origin: "Buenos Aires, Argentina",
  },
  {
    name: "Sarmiento de Resistencia",
    logo_url:
      "https://copaargentina.s3.amazonaws.com/original/m100085_Sarmiento_de_Resistencia.svg",
    division: "Torneo Federal A",
    foundation: "1911",
    origin: "Resistencia, Chaco, Argentina",
  },
  {
    name: "Platense",
    logo_url:
      "https://copaargentina.s3.amazonaws.com/original/m109314_Platense.svg",
    division: "Liga Profesional",
    foundation: "25 de mayo de 1905",
    origin: "Vicente López, Buenos Aires, Argentina",
  },
  {
    name: "Defensores de Belgrano",
    logo_url:
      "https://copaargentina.s3.amazonaws.com/original/m103619_Defensores_de_belgrano.svg",
    division: "Primera Nacional",
    foundation: "25 de mayo de 1906",
    origin: "Núñez, Buenos Aires, Argentina",
  },
  {
    name: "Belgrano",
    logo_url:
      "https://copaargentina.s3.amazonaws.com/original/m100013_Belgrano_cordoba.svg",
    division: "Primera Nacional",
    foundation: "19 de marzo de 1905",
    origin: "Córdoba, Argentina",
  },
  {
    name: "Independiente Rivadavia",
    logo_url:
      "https://copaargentina.s3.amazonaws.com/original/m100043_Independiente_Riv_M.svg",
    division: "Primera Nacional",
    foundation: "29 de marzo de 1913",
    origin: "Mendoza, Argentina",
  },
  {
    name: "Newell's Old Boys",
    logo_url:
      "https://copaargentina.s3.amazonaws.com/original/m100023_Newells_Old_Boys.svg",
    division: "Liga Profesional",
    foundation: "3 de noviembre de 1903",
    origin: "Rosario, Santa Fe, Argentina",
  },
  {
    name: "Claypole",
    logo_url:
      "https://copaargentina.s3.amazonaws.com/original/m111908_Claypole.svg",
    division: "Primera C Metropolitana",
    foundation: "1944",
    origin: "Claypole, Buenos Aires, Argentina",
  },
  {
    name: "Patronato",
    logo_url:
      "https://copaargentina.s3.amazonaws.com/original/m111671_Patronato.svg",
    division: "Liga Profesional",
    foundation: "1 de febrero de 1914",
    origin: "Paraná, Entre Ríos, Argentina",
  },
  {
    name: "Gimnasia y Tiro de Salta",
    logo_url:
      "https://copaargentina.s3.amazonaws.com/original/m100075_Gimnasia_y_Tiro_Salta.svg",
    division: "Torneo Federal A",
    foundation: "1930",
    origin: "Salta, Argentina",
  },
  {
    name: "Argentinos Juniors",
    logo_url:
      "https://copaargentina.s3.amazonaws.com/original/m108093_Argentinos-Juniors.svg",
    division: "Liga Profesional",
    foundation: "15 de agosto de 1904",
    origin: "La Paternal, Buenos Aires, Argentina",
  },
  {
    name: "Deportivo Armenio",
    logo_url:
      "https://copaargentina.s3.amazonaws.com/original/m100113_Deportivo_armenio_ok.svg",
    division: "Primera B Metropolitana",
    foundation: "14 de agosto de 1962",
    origin: "Ingeniero Maschwitz",
  },
  {
    name: "Club Atlético Aldosivi",
    logo_url:
      "https://copaargentina.s3.amazonaws.com/original/m110208_Aldosivi.svg",
    division: "Superliga Argentina",
    foundation: "29 de marzo de 1913",
    origin: "Mar del Plata, Buenos Aires, Argentina",
  },
  {
    name: "San Martín (San Juan)",
    logo_url:
      "https://copaargentina.s3.amazonaws.com/original/m100029_San-Martin-SJ.svg",
    division: "Primera Nacional",
    foundation: "27 de septiembre de 1907",
    origin: "San Juan, Argentina",
  },
  {
    name: "Vélez Sarsfield",
    logo_url:
      "https://copaargentina.s3.amazonaws.com/original/m100282_Velez-ok.svg",
    division: "Liga Profesional",
    foundation: "1 de enero de 1910",
    origin: "Buenos Aires, Argentina",
  },
  {
    name: "Deportivo Español",
    logo_url:
      "https://copaargentina.s3.amazonaws.com/original/m111527_Dep-Espanol.svg",
    division: "Primera C Metropolitana",
    foundation: "1956",
    origin: "Buenos Aires, Argentina",
  },
];



module.exports = { teams };

