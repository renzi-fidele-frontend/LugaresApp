const { apanharCoordernadasPorEndereco } = require("../utils/localizacao");
const Lugar = require("../models/Lugar");
const fs = require("fs");

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
   const { titulo, descricao, endereco } = req.body;
   const foto = req?.file?.path;

   if (req.userId) {
      coordenadas = await apanharCoordernadasPorEndereco(endereco);
      try {
         let lugarCriado = {
            titulo,
            descricao,
            idCriador: req.userId,
            endereco,
            foto,
            coordenadas,
         };
         let lugarAdicionado = new Lugar(lugarCriado);
         await lugarAdicionado.save();
         res.json({ lugar: lugarCriado });
      } catch (error) {
         console.log(error.message);
         res.status(500).json({ mensagem: "Erro ao criar o lugar" });
         if (foto) {
            fs.unlink(foto, (unlinkError) => {
               if (unlinkError) {
                  console.error("Falha ao remover:", unlinkError);
               } else {
                  console.log("Foto temporária removida com sucesso");
               }
            });
         }
      }
   } else {
      res.status(401).json({ mensagem: "Você não tem permissão para isso!" });
   }
};

const atualizarLugarById = async (req, res) => {
   let { idLugar } = req.params;
   const { titulo, descricao } = req.body;
   const foto = req?.file?.path;
   const lugar = await Lugar.findById(idLugar);
   if (lugar?.idCriador?.toString() === req.userId) {
      const dadosAtualizados = { titulo, descricao };
      if (foto) {
         // Removendo a foto antiga foto do lugar
         const fotoAntiga = lugar.foto;
         fs.unlink(fotoAntiga, (unlinkError) => {
            if (unlinkError) {
               console.error("Falha ao remover foto antiga:", unlinkError);
            } else {
               console.log("Foto antiga removida com sucesso");
            }
         });
         dadosAtualizados.foto = foto;
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
         // Removendo a foto pertecente ao lugar
         const lugar = await Lugar.findById(idLugar);
         const foto = lugar.foto;
         fs.unlink(foto, (unlinkError) => {
            if (unlinkError) {
               console.error("Falha ao remover:", unlinkError);
            } else {
               console.log("Foto temporária removida com sucesso");
            }
         });
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
