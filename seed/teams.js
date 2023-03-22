const teams = [
    {
      nombre: 'Club Atlético Aldosivi',
      logo_url: 'https://copaargentina.s3.amazonaws.com/original/m110208_Aldosivi.svg',
      division: 'Superliga Argentina',
      fundacion: '29 de marzo de 1913',
      origen: 'Mar del Plata, Buenos Aires, Argentina',  
    },
    {
      nombre: 'Argentinos Juniors',
      logo_url: 'https://copaargentina.s3.amazonaws.com/original/m108093_Argentinos-Juniors.svg',
      division: 'Liga Profesional',
      fundacion: '15 de agosto de 1904',
      origen: 'La Paternal, Buenos Aires, Argentina'
    },
    {
      nombre: 'Club Atlético Arsenal',
      logo_url: 'https://copaargentina.s3.amazonaws.com/original/m100038_Arsenal.svg',
      division: 'Primera Nacional',
      fundacion: '11 de enero de 1957',
      origen: 'Sarandí, Provincia de Buenos Aires, Argentina',
      
    },
    {
      nombre: 'Atlético Tucumán',
      logo_url: 'https://copaargentina.s3.amazonaws.com/original/m100011_Atletico-Tucuman.svg',
      division: 'Liga Profesional',
      fundacion: '27 de septiembre de 1902',
      origen: 'San Miguel de Tucumán, Tucumán, Argentina',
      
    },
    {
      nombre: 'Banfield',
      logo_url: 'https://copaargentina.s3.amazonaws.com/original/m100012_Banfield.svg',
      division: 'Liga Profesional',
      fundacion: '21 de enero de 1896',
      origen: 'Banfield, Buenos Aires, Argentina',
      
    },
    {
      nombre: 'Club Atlético Barracas Central',
      logo_url: 'https://copaargentina.s3.amazonaws.com/original/m100052_Barracas_central.svg',
      division: 'Primera Nacional',
      fundacion: '5 de abril de 1904',
      origen: 'Barracas, Ciudad de Buenos Aires, Argentina',
      
    },
    {
      nombre: 'Boca Juniors',
      logo_url: 'https://copaargentina.s3.amazonaws.com/original/m111151_Boca_juniors.svg',
      division: 'Liga Profesional',
      fundacion: '3 de abril de 1905',
      origen: 'La Boca, Buenos Aires, Argentina',
      
    },
    {
      nombre: 'Central Córdoba (Santiago del Estero)',
      logo_url: 'https://copaargentina.s3.amazonaws.com/original/m100041_Central_Cordoba_SdE.svg',
      division: 'Liga Profesional',
      fundacion: '3 de abril de 1919',
      origen: 'Santiago del Estero, Argentina',
      
    },
    {
      nombre: 'Club Atlético Colón',
      logo_url: 'https://copaargentina.s3.amazonaws.com/original/m100015_Colon-Santa-fe.svg',
      division: 'Superliga Argentina',
      fundacion: '5 de mayo de 1905',
      origen: 'Santa Fe, Argentina',
      
    },
    {
      nombre: 'Club Atlético Defensa y Justicia',
      logo_url: 'https://copaargentina.s3.amazonaws.com/original/m110513_Defensa_y_justicia.svg',
      division: 'Superliga Argentina',
      fundacion: '20 de marzo de 1935',
      origen: 'Florencio Varela, Buenos Aires, Argentina',
      
    },
    {
      nombre: 'Club Atlético Estudiantes',
      logo_url: 'https://copaargentina.s3.amazonaws.com/original/m103826_Estudiantes_LP.svg',
      division: 'Superliga Argentina',
      fundacion: '4 de agosto de 1905',
      origen: 'La Plata, Buenos Aires, Argentina',
      
    },
    {
      nombre: 'Club Atlético Gimnasia y Esgrima',
      logo_url: 'https://copaargentina.s3.amazonaws.com/original/m100018_Gimnasia_y_Esgrima_La_Plata.svg',
      division: 'Superliga Argentina',
      fundacion: '3 de junio de 1887',
      origen: 'La Plata, Buenos Aires, Argentina',
      
    },
    {
      nombre: 'Godoy Cruz',
      logo_url: 'https://copaargentina.s3.amazonaws.com/original/m100019_Godoy_Cruz.svg',
      division: 'Liga Profesional',
      fundacion: '1 de junio de 1921',
      origen: 'Mendoza, Argentina',
      
    },
    {
      nombre: 'Huracán',
      logo_url: 'https://copaargentina.s3.amazonaws.com/original/m100020_Huracan.svg',
      division: 'Liga Profesional',
      fundacion: '1 de noviembre de 1908',
      origen: 'Buenos Aires, Argentina',
      
    },
    {
      nombre: 'Independiente',
      logo_url: 'https://copaargentina.s3.amazonaws.com/original/m100021_Independiente-Ok.svg',
      division: 'Liga Profesional',
      fundacion: '4 de enero de 1905',
      origen: 'Avellaneda, Argentina',
      
    },
    {
      nombre: 'Lanús',
      logo_url: 'https://copaargentina.s3.amazonaws.com/original/m100022_Lanus.svg',
      division: 'Liga Profesional',
      fundacion: '3 de enero de 1915',
      origen: 'Lanús, Buenos Aires, Argentina',
      
    },
    {
      nombre: "Newell's Old Boys",
      logo_url: 'https://copaargentina.s3.amazonaws.com/original/m100023_Newells_Old_Boys.svg',
      division: 'Liga Profesional',
      fundacion: '3 de noviembre de 1903',
      origen: 'Rosario, Santa Fe, Argentina'
    },
    {
      nombre: 'Patronato',
      logo_url: 'https://copaargentina.s3.amazonaws.com/original/m111671_Patronato.svg',
      division: 'Liga Profesional',
      fundacion: '1 de febrero de 1914',
      origen: 'Paraná, Entre Ríos, Argentina',
      
    },
    {
      nombre: 'Platense',
      logo_url: 'https://copaargentina.s3.amazonaws.com/original/m109314_Platense.svg',
      division: 'Liga Profesional',
      fundacion: '25 de mayo de 1905',
      origen: 'Vicente López, Buenos Aires, Argentina',
      
    },
    {
      nombre: 'Racing Club',
      logo_url: 'https://copaargentina.s3.amazonaws.com/original/m100025_Racing_Club__Oficial.svg',
      division: 'Liga Profesional',
      fundacion: '25 de marzo de 1903',
      origen: 'Avellaneda, Argentina',
      
    },
    {
      nombre: 'River Plate',
      logo_url: 'https://copaargentina.s3.amazonaws.com/original/m107800_River_Plate.svg',
      division: 'Liga Profesional',
      fundacion: '25 de mayo de 1901',
      origen: 'Buenos Aires, Argentina',
      
    },
    {
      nombre: 'Rosario Central',
      logo_url: 'https://copaargentina.s3.amazonaws.com/original/m100132_ROSARIO_CENTRAL.svg',
      division: 'Liga Profesional',
      fundacion: '24 de diciembre de 1889',
      origen: 'Rosario, Argentina',
      
    },
    {
      nombre: 'San Lorenzo',
      logo_url: 'https://copaargentina.s3.amazonaws.com/original/m100028_San_lorenzo_de_almagro.svg',
      division: 'Liga Profesional',
      fundacion: '1 de abril de 1908',
      origen: 'Buenos Aires, Argentina',
      
    },
    {
      nombre: 'Sarmiento',
      logo_url: 'https://copaargentina.s3.amazonaws.com/original/m100046_Sarmiento_de_junin.svg',
      division: 'Liga Profesional',
      fundacion: '1 de noviembre de 1911',
      origen: 'Junín, Buenos Aires, Argentina',
      
    },
    {
      nombre: 'Talleres',
      logo_url: 'https://copaargentina.s3.amazonaws.com/original/m107326_Talleres_C.svg',
      division: 'Liga Profesional',
      fundacion: '12 de octubre de 1913',
      origen: 'Córdoba, Argentina',
      
    },
    {
      nombre: 'Tigre',
      logo_url: 'https://copaargentina.s3.amazonaws.com/original/m106649_escudo_tigre_logo.svg',
      division: 'Primera Nacional',
      fundacion: '3 de agosto de 1902',
      origen: 'Victoria, Buenos Aires, Argentina',
      
    },
    {
      nombre: 'Unión',
      logo_url: 'https://copaargentina.s3.amazonaws.com/original/m100034_Union-SF.svg',
      division: 'Liga Profesional',
      fundacion: '15 de abril de 1907',
      origen: 'Santa Fe, Argentina',
      
    },
    {
      nombre: 'Vélez Sarsfield',
      logo_url: 'https://copaargentina.s3.amazonaws.com/original/m100282_Velez-ok.svg',
      division: 'Liga Profesional',
      fundacion: '1 de enero de 1910',
      origen: 'Buenos Aires, Argentina',
      
    },
    {
      nombre: 'All Boys',
      logo_url: 'https://copaargentina.s3.amazonaws.com/original/m100049_All_Boys.svg',
      division: 'Primera Nacional',
      fundacion: '15 de marzo de 1913',
      origen: 'Floresta, Buenos Aires, Argentina',
      
    },
    {
      nombre: 'Almagro',
      logo_url: 'https://copaargentina.s3.amazonaws.com/original/m100037_Almagro-Ok.svg',
      division: 'Primera Nacional',
      fundacion: '6 de enero de 1911',
      origen: 'José Ingenieros, Buenos Aires, Argentina',
      
    },
    {
      nombre: 'Belgrano',
      logo_url: 'https://copaargentina.s3.amazonaws.com/original/m100013_Belgrano_cordoba.svg',
      division: 'Primera Nacional',
      fundacion: '19 de marzo de 1905',
      origen: 'Córdoba, Argentina',
      
    },
    {
      nombre: 'Chacarita Juniors',
      logo_url: 'https://copaargentina.s3.amazonaws.com/original/m100712_Chacarita_juniors.svg',
      division: 'Primera Nacional',
      fundacion: '1 de mayo de 1906',
      origen: 'San Martín, Buenos Aires, Argentina',
      
    },
    {
      nombre: 'Chaco For Ever',
      logo_url: 'https://copaargentina.s3.amazonaws.com/original/m100059_Chaco_For_Ever.svg',
      division: 'Federal A',
      fundacion: '1913',
      origen: 'Resistencia, Chaco, Argentina',
      
    },
    {
      nombre: 'Defensores de Belgrano',
      logo_url: 'https://copaargentina.s3.amazonaws.com/original/m103619_Defensores_de_belgrano.svg',
      division: 'Primera Nacional',
      fundacion: '25 de mayo de 1906',
      origen: 'Núñez, Buenos Aires, Argentina',
      
    },
    {
      nombre: 'Deportivo Morón',
      logo_url: 'https://copaargentina.s3.amazonaws.com/original/m107505_Dep_Moron.svg',
      division: 'Primera Nacional',
      fundacion: '20 de junio de 1947',
      origen: 'Morón, Buenos Aires, Argentina',
      
    },
    {
      nombre: 'Deportivo Riestra',
      logo_url: 'https://copaargentina.s3.amazonaws.com/original/m100053_Dep_Riestra.svg',
      division: 'Primera Nacional',
      fundacion: '1931',
      origen: 'Nueva Pompeya, Buenos Aires, Argentina',
      
    },
    {
      nombre: 'Estudiantes (Caseros)',
      logo_url: 'https://copaargentina.s3.amazonaws.com/original/m100054_Estudiantes_BA.svg',
      division: 'Primera Nacional',
      fundacion: '1898',
      origen: 'Caseros, Buenos Aires, Argentina',
      
    },
    {
      nombre: 'Estudiantes de Río Cuarto',
      logo_url: 'https://copaargentina.s3.amazonaws.com/original/m100071_Estudiantes_RC.svg',
      division: 'Primera Nacional',
      fundacion: '6 de diciembre de 1912',
      origen: 'Río Cuarto, Córdoba, Argentina',
      
    },
    {
      nombre: 'Gimnasia y Esgrima de Mendoza',
      logo_url: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Escudo_Club_Atl%C3%A9tico_Gimnasia_y_Esgrima_Mendoza.png',
      division: 'Primera Nacional',
      fundacion: '1 de julio de 1908',
      origen: 'Mendoza, Argentina',
      
    },
    {
      nombre: 'Independiente Rivadavia',
      logo_url: 'https://copaargentina.s3.amazonaws.com/original/m100043_Independiente_Riv_M.svg',
      division: 'Primera Nacional',
      fundacion: '29 de marzo de 1913',
      origen: 'Mendoza, Argentina',
      
    },
    {
      nombre: 'Instituto',
      logo_url: 'https://copaargentina.s3.amazonaws.com/original/m112055_Instituto_Atl_Ctral_Cba.svg',
      division: 'Primera Nacional',
      fundacion: '8 de agosto de 1918',
      origen: 'Córdoba, Argentina',
      
    },
    {
      nombre: 'San Martín (Tucumán)',
      logo_url: 'https://copaargentina.s3.amazonaws.com/original/m108747_San_Martin_T.svg',
      division: 'Primera Nacional',
      fundacion: '2 de noviembre de 1909',
      origen: 'San Miguel de Tucumán, Tucumán, Argentina',
      
    },
    {
      nombre: 'San Martín (San Juan)',
      logo_url: 'https://copaargentina.s3.amazonaws.com/original/m100029_San-Martin-SJ.svg',
      division: 'Primera Nacional',
      fundacion: '27 de septiembre de 1907',
      origen: 'San Juan, Argentina',
      
    },
    {
      nombre: 'Colegiales',
      logo_url: 'https://copaargentina.s3.amazonaws.com/original/m107515_Colegiales.svg',
      division: 'Primera B Metropolitana',
      fundacion: '1 de mayo de 1909',
      origen: 'Munro, Buenos Aires, Argentina',
      
    },
    {
      nombre: 'Comunicaciones',
      logo_url: 'https://copaargentina.s3.amazonaws.com/original/m103624_Club_Comunicaciones.svg',
      division: 'Primera B Metropolitana',
      fundacion: '21 de octubre de 1931',
      origen: 'Agronomía, Buenos Aires, Argentina',
      
    },
    {
      nombre: 'Defensores Unidos',
      logo_url: 'https://copaargentina-photos.s3.amazonaws.com/original/m36113_def-unidos.png',
      division: 'Primera B Metropolitana',
      fundacion: '25 de marzo de 1916',
      origen: 'Zárate, Buenos Aires, Argentina',
      
    },
    {
      nombre: 'Deportivo Armenio',
      logo_url: 'https://copaargentina.s3.amazonaws.com/original/m100113_Deportivo_armenio_ok.svg',
      division: 'Primera B Metropolitana',
      fundacion: '14 de agosto de 1962',
      origen: 'Ingeniero Maschwitz',
      
    },
    {
      nombre: 'Ituzaingó',
      logo_url: 'https://copaargentina.s3.amazonaws.com/original/m107512_Ituzaingo.svg',
      division: 'Primera B Metropolitana',
      fundacion: '1 de julio de 1948',
      origen: 'Ituzaingó, Buenos Aires, Argentina'
    },
    {
      nombre: 'Central Norte',
      logo_url: 'https://copaargentina.s3.amazonaws.com/original/m108305_Central_Norte_de_Salta.svg',
      division: 'Torneo Federal A',
      fundacion: '1919',
      origen: 'Salta, Argentina',
      
    },
    {
      nombre: 'Club Ciudad de Bolívar',
      logo_url: 'https://copaargentina.s3.amazonaws.com/original/m111659_Bolivar.svg',
      division: 'Torneo Federal A',
      fundacion: '1933',
      origen: 'Bolívar, Buenos Aires, Argentina',
      
    },
    {
      nombre: 'Gimnasia y Tiro de Salta',
      logo_url: 'https://copaargentina.s3.amazonaws.com/original/m100075_Gimnasia_y_Tiro_Salta.svg',
      division: 'Torneo Federal A',
      fundacion: '1930',
      origen: 'Salta, Argentina',
      
    },
    {
      nombre: 'Independiente (CH)',
      logo_url: 'https://copaargentina.s3.amazonaws.com/original/m111523_Independiente_Ch.svg',
      division: 'Torneo Federal A',
      fundacion: '1928',
      origen: 'Chilecito, La Rioja, Argentina',
      
    },
    {
      nombre: 'Olimpo',
      logo_url: 'https://copaargentina.s3.amazonaws.com/original/m107525_Club_Olimpo.svg',
      division: 'Torneo Federal A',
      fundacion: '1910',
      origen: 'Bahía Blanca, Buenos Aires, Argentina',
      
    },
    {
      nombre: 'Racing de Córdoba',
      logo_url: 'https://copaargentina.s3.amazonaws.com/original/m100082_Racing_de_Cordoba.svg',
      division: 'Torneo Federal A',
      fundacion: '1924',
      origen: 'Córdoba, Argentina',
      
    },
    {
      nombre: 'San Martín de Formosa',
      logo_url: 'https://copaargentina.s3.amazonaws.com/original/m100084_San-martin-F.svg',
      division: 'Torneo Federal A',
      fundacion: '1922',
      origen: 'Formosa, Argentina',
      
    },
    {
      nombre: 'Sarmiento de Resistencia',
      logo_url: 'https://copaargentina.s3.amazonaws.com/original/m100085_Sarmiento_de_Resistencia.svg',
      division: 'Torneo Federal A',
      fundacion: '1911',
      origen: 'Resistencia, Chaco, Argentina',
      
    },
    {
      nombre: 'Sol de Mayo',
      logo_url: 'https://copaargentina.s3.amazonaws.com/original/m100111_Sol-de-Mayo-Viedma_ok.svg',
      division: 'Torneo Federal A',
      fundacion: '1920',
      origen: 'Viedma, Río Negro, Argentina',
      
    },
    {
      nombre: 'Villa Mitre',
      logo_url: 'https://copaargentina.s3.amazonaws.com/original/m100091_Villa_mitre_bb.svg',
      division: 'Torneo Federal A',
      fundacion: '1929',
      origen: 'Bahía Blanca, Buenos Aires, Argentina',
      
    },
    {
      nombre: 'Argentino de Merlo',
      logo_url: 'https://copaargentina.s3.amazonaws.com/original/m100099_Argentino_de_merlo.svg',
      division: 'Primera C Metropolitana',
      fundacion: '1960',
      origen: 'Merlo, Buenos Aires, Argentina',
      
    },
    {
      nombre: 'Claypole',
      logo_url: 'https://copaargentina.s3.amazonaws.com/original/m111908_Claypole.svg',
      division: 'Primera C Metropolitana',
      fundacion: '1944',
      origen: 'Claypole, Buenos Aires, Argentina',
      
    },
    {
      nombre: 'Deportivo Español',
      logo_url: 'https://copaargentina.s3.amazonaws.com/original/m111527_Dep-Espanol.svg',
      division: 'Primera C Metropolitana',
      fundacion: '1956',
      origen: 'Buenos Aires, Argentina',
      
    },
    {
      nombre: 'Excursionistas',
      logo_url: 'https://copaargentina.s3.amazonaws.com/original/m112195_Excursionistas.svg',
      division: 'Primera C Metropolitana',
      fundacion: '1910',
      origen: 'Belgrano, Buenos Aires, Argentina',
      
    },
    {
      nombre: 'Centro Español',
      logo_url: 'https://copaargentina.s3.amazonaws.com/original/m111501_Escudo-Centro-1.svg',
      division: 'Primera D Metropolitana',
      fundacion: '1956',
      origen: 'Tapiales, Buenos Aires, Argentina',
      
    },
    {
      nombre: 'Yupanqui',
      logo_url: 'https://copaargentina.s3.amazonaws.com/original/m111518_Yupanqui.svg',
      division: 'Primera D Metropolitana',
      fundacion: '1922',
      origen: 'Villa Lugano, Buenos Aires, Argentina',
      
    }
  ]

  module.exports = teams