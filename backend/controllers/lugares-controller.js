const lugares = [
   {
      id: "l1",
      titulo: "Paragem de chapas Brigada",
      descricao:
         "A paragem de onibus localizada em maputo. Pelos vistos é o ponto onde todos os moçambicanos trabalhadores cruzam os caminhos a procura de transporte",
      foto: "https://www.moz.life/wp-content/uploads/2020/11/Salva-Vidas-.jpg",
      endereco: "Estrada EN2, Maputo, Moçambique",
      coordenadas: {
         lat: -25.9435604,
         long: 32.5417072,
      },
      idCriador: "u1",
      criadoEm: 2131231,
   },
   {
      id: "l2",
      titulo: "Paragem de chapas Brigada",
      descricao:
         "A paragem de onibus localizada em maputo. Pelos vistos é o ponto onde todos os moçambicanos trabalhadores cruzam os caminhos a procura de transporte",
      foto: "https://www.moz.life/wp-content/uploads/2020/11/Salva-Vidas-.jpg",
      endereco: "Estrada EN2, Maputo, Moçambique",
      coordenadas: {
         lat: -25.9435604,
         long: 32.5417072,
      },
      idCriador: "u1",
      criadoEm: 2131231,
   },
   {
      id: "l3",
      titulo: "Paragem de chapas Brigada",
      descricao:
         "A paragem de onibus localizada em maputo. Pelos vistos é o ponto onde todos os moçambicanos trabalhadores cruzam os caminhos a procura de transporte",
      foto: "https://www.moz.life/wp-content/uploads/2020/11/Salva-Vidas-.jpg",
      endereco: "Estrada EN2, Maputo, Moçambique",
      coordenadas: {
         lat: -25.9435604,
         long: 32.5417072,
      },
      idCriador: "u2",
      criadoEm: 2131231,
   },
   {
      id: "l4",
      titulo: "Paragem de chapas Brigada",
      descricao:
         "A paragem de onibus localizada em maputo. Pelos vistos é o ponto onde todos os moçambicanos trabalhadores cruzam os caminhos a procura de transporte",
      foto: "https://www.moz.life/wp-content/uploads/2020/11/Salva-Vidas-.jpg",
      endereco: "Estrada EN2, Maputo, Moçambique",
      coordenadas: {
         lat: -25.9435604,
         long: 32.5417072,
      },
      idCriador: "u2",
      criadoEm: 2131231,
   },
   {
      id: "l5",
      titulo: "Paragem de chapas Brigada",
      descricao:
         "A paragem de onibus localizada em maputo. Pelos vistos é o ponto onde todos os moçambicanos trabalhadores cruzam os caminhos a procura de transporte",
      foto: "https://www.moz.life/wp-content/uploads/2020/11/Salva-Vidas-.jpg",
      endereco: "Estrada EN2, Maputo, Moçambique",
      coordenadas: {
         lat: -25.9435604,
         long: 32.5417072,
      },
      idCriador: "u3",
      criadoEm: 2131231,
   },
   {
      id: "l6",
      titulo: "Paragem de chapas Brigada",
      descricao:
         "A paragem de onibus localizada em maputo. Pelos vistos é o ponto onde todos os moçambicanos trabalhadores cruzam os caminhos a procura de transporte",
      foto: "https://www.moz.life/wp-content/uploads/2020/11/Salva-Vidas-.jpg",
      endereco: "Estrada EN2, Maputo, Moçambique",
      coordenadas: {
         lat: -25.9435604,
         long: 32.5417072,
      },
      idCriador: "u3",
      criadoEm: 2131231,
   },
];

const getLugares = (req, res) => {
   console.log("GET feito na página lugares");
   res.json({ lugares });
};

const getLugarById = (req, res) => {
   console.log("GET feito para apanhar lugar individual");
   let { idLugar } = req.params;
   let lugar = lugares.filter((v) => v.id === idLugar)[0];
   if (!lugar) {
      res.status(404).json({ mensagem: "Não existe nenhum lugar com essa id" });
   }
   res.json(lugar);
};

const adicionarLugar = (req, res) => {
   const { titulo, descricao, coordenadas, idCriador } = req.body;
   let lugarCriado = { titulo, descricao, coordenadas, idCriador, foto: "" };
   res.status(201).json({ lugar: lugarCriado });
   //   TODO: Adicionar o lugar criado ao banco de dados
};

exports.getLugares = getLugares;
exports.getLugarById = getLugarById;
exports.adicionarLugar = adicionarLugar;
