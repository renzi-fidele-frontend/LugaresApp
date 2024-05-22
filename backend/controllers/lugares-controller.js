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

const getLugaresDoUsuarioById = async (req, res) => {
   let { uid } = req.params;
   try {
      let lugares_do_usuario = await Lugar.find({ idCriador: uid });
      res.json({ lugares_do_usuario });
      console.log("Lugares do usuário apanhados com sucesso");
   } catch (erro) {
      res.json({ mensagem: "Erro ao se enviar a mensagem" });
      console.log("Erro ao apanhar os lugares do usuário");
   }
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

   let lugarAdicionado = new Lugar(lugarCriado);
   await lugarAdicionado.save();
   res.json({ lugar: lugarCriado });
};

const atualizarLugarById = async (req, res) => {
   let { idLugar } = req.params;
   const { titulo, descricao } = req.body;
   try {
      const lugarAtualizado = await Lugar.updateOne({ _id: idLugar }, { titulo, descricao });
      res.json({ mensagem: "Lugar atualizado com sucesso!", lugarAtualizado });
   } catch (erro) {
      res.status(401).json({ mensagem: "Erro ao atualizar o lugar" });
   }
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
