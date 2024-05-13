const uuid = require("uuid");
const { apanharCoordernadasPorEndereco } = require("../utils/localizacao");

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

const getLugaresDoUsuarioById = (req, res) => {
   let { uid } = req.params;
   let lugares_do_usuario = lugares.filter((v) => v.idCriador === uid);
   if (lugares_do_usuario.length === 0) {
      res.status(404).json({ mensagem: `O usuário ${uid} não existe!` });
   } else {
      res.json({ lugares_do_usuario });
   }
};

const adicionarLugar = async (req, res) => {
   const { titulo, descricao, endereco, idCriador } = req.body;
   coordenadas = await apanharCoordernadasPorEndereco(endereco);
   let lugarCriado = { id: uuid.v4(), titulo, descricao, idCriador, foto: "", coordenadas };

   res.status(201).json({ lugar: lugarCriado });

   //   TODO: Adicionar o lugar criado ao banco de dados
};

const atualizarLugarById = (req, res) => {
   let { idLugar } = req.params;
   const { titulo, descricao } = req.body;
   let lugarAtualizado = { ...dadosLugar, titulo, descricao };
   // TODO: Atualizar o lugar no banco de dados

   res.status(200).json({ lugar: lugarAtualizado });
};

const removerLugarById = (req, res) => {
   let { idLugar } = req.params;
   // TODO: Remover o lugar no banco de dados
};

exports.getLugares = getLugares;
exports.getLugarById = getLugarById;
exports.adicionarLugar = adicionarLugar;
exports.atualizarLugarById = atualizarLugarById;
exports.removerLugarById = removerLugarById;
exports.getLugaresDoUsuarioById = getLugaresDoUsuarioById;
