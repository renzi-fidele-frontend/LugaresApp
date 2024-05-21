const uuid = require("uuid");
const { apanharCoordernadasPorEndereco } = require("../utils/localizacao");
const Lugar = require("../models/Lugar");

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

const getLugares = async (req, res) => {
   console.log("GET feito na página lugares");
   try {
      let lugares = await Lugar.find();
      res.json({ lugares });
   } catch (erro) {
      res.json({ mensagem: "Erro ao apanhar os lugares no DB" });
      console.log(erro.message);
   }
};

const getLugarById = async (req, res) => {
   console.log("GET feito para apanhar lugar individual");
   let { idLugar } = req.params;
   let lugar;
   try {
      lugar = await Lugar.findById(idLugar);
      res.json({ lugar });
   } catch (erro) {
      res.status(401).json({ mensagem: erro });
   }

};

const getLugaresDoUsuarioById = (req, res) => {
   let { uid } = req.params;
   let lugares_do_usuario = lugares.filter((v) => v.idCriador === uid);
   if (lugares_do_usuario.length === 0) {
      res.status(404).json({ mensagem: `O usuário ${uid} não existe!` });
   } else {
      res.json({ lugares_do_usuario });
   }

   // TODO: Apanhar os lugares de usuário pela sua id
};

const adicionarLugar = async (req, res) => {
   const { titulo, descricao, endereco, idCriador } = req.body;
   coordenadas = await apanharCoordernadasPorEndereco(endereco);
   let lugarCriado = {
      titulo,
      descricao,
      idCriador,
      endereco,
      foto: "https://www.moz.life/wp-content/uploads/2020/11/Salva-Vidas-.jpg",
      coordenadas,
   };

   res.json({ lugar: lugarCriado });

   let lugarAdicionado = new Lugar(lugarCriado);
   await lugarAdicionado.save();
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
