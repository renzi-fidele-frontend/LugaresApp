const { apanharCoordernadasPorEndereco } = require("../utils/localizacao");
const Lugar = require("../models/Lugar");
const { uploadImage, removerFoto } = require("../middlewares/cloudinary");

const getLugares = async (req, res) => {
   console.log("GET feito na página lugares");
   // Definindo o offset e o limite da query para paginação
   const page = req.query.page || 1;
   const limit = 5;
   const offset = (page - 1) * limit;

   try {
      let lugares = await Lugar.find().limit(5).skip(offset);
      const totalDocs = await Lugar.countDocuments();
      const totalPaginas = Math.ceil(totalDocs / limit);

      res.json({ lugares, totalPaginas });
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
   const { titulo, descricao, endereco } = req.body;
   const foto = req?.file?.path;

   if (req.userId) {
      coordenadas = await apanharCoordernadasPorEndereco(endereco);
      try {
         const response = await uploadImage(foto);
         console.log(response.public_id);

         let lugarCriado = {
            titulo,
            descricao,
            idCriador: req.userId,
            endereco,
            foto: response.url,
            coordenadas,
         };
         let lugarAdicionado = new Lugar(lugarCriado);
         await lugarAdicionado.save();
         res.json({ lugar: lugarCriado });
      } catch (error) {
         console.log(error.message);
         res.status(500).json({ mensagem: "Erro ao criar o lugar" });
      }
   } else {
      res.status(401).json({ mensagem: "Você não tem permissão para isso!" });
   }
};

const atualizarLugarById = async (req, res) => {
   let { idLugar } = req.params;
   const { titulo, descricao, endereco } = req.body;
   const foto = req?.file?.path;

   // Gerando novas coordenadas
   let novasCoordenadas;
   try {
      novasCoordenadas = await apanharCoordernadasPorEndereco(endereco);
   } catch (error) {
      console.log(error.message);
      return res.status(500).json({ mensagem: "Erro ao apanhar enderecos" });
   }

   const lugar = await Lugar.findById(idLugar);
   if (lugar?.idCriador?.toString() === req.userId) {
      const dadosAtualizados = { titulo, descricao, endereco, coordenadas: novasCoordenadas };

      if (foto) {
         const novaFoto = await uploadImage(foto);
         dadosAtualizados.foto = novaFoto.url;

         // Removendo a foto antiga foto do lugar
         const fotoAntiga = lugar.foto;
         const response = await removerFoto(fotoAntiga.split("/").slice(-1)[0].split(".")[0]);
      }

      try {
         const lugarAtualizado = await Lugar.updateOne({ _id: idLugar }, dadosAtualizados);

         res.json({ mensagem: "Lugar atualizado com sucesso!", lugarAtualizado });
      } catch (erro) {
         res.status(500).json({ mensagem: "Erro ao atualizar o lugar" });
      }
   } else {
      res.status(401).json({ mensagem: "Você não tem permissão para isso!" });
   }
};

const removerLugarById = async (req, res) => {
   let { idLugar } = req.params;
   const lugar = await Lugar.findById(idLugar);
   if (lugar?.idCriador?.toString() === req.userId) {
      try {
         const lugar = await Lugar.findById(idLugar);
         // Removendo a foto pertecente ao lugar
         const response = await removerFoto(lugar.foto.split("/").slice(-1)[0].split(".")[0]);

         const lugarRemovido = await Lugar.deleteOne({ _id: idLugar });
         res.json({ mensagem: "Lugar removido com sucesso!" });
      } catch (erro) {
         res.status(500).json({ mensagem: "Erro ao remover o lugar no DB" });
      }
   } else {
      res.status(401).json({ mensagem: "Você não tem permissão para isso!" });
   }
};

exports.getLugares = getLugares;
exports.getLugarById = getLugarById;
exports.adicionarLugar = adicionarLugar;
exports.atualizarLugarById = atualizarLugarById;
exports.removerLugarById = removerLugarById;
exports.getLugaresDoUsuarioById = getLugaresDoUsuarioById;
