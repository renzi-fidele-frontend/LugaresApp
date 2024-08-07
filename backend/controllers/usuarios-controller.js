const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { uploadImage, removerFoto } = require("../middlewares/cloudinary");

const getUsuarioById = async (req, res) => {
   try {
      const usuario = await Usuario.findById(req.params.uid, "-password");
      res.json({ usuario });
   } catch (error) {
      res.status(401).json({ mensagem: "Erro ao apanhar o usuário " + req.params.uid });
   }
};

const getUsuarios = async (req, res) => {
   // Definindo o offset e o limite da query para paginação
   const page = req.query.page || 1;
   const limit = 5;
   const offset = (page - 1) * limit;
   try {
      let usuarios = await Usuario.find({}, "-password -email").limit(5).skip(offset);
      const totalDocs = await Usuario.countDocuments();
      const totalPaginas = Math.ceil(totalDocs / limit);
      res.json({ usuarios, totalPaginas });
   } catch (error) {
      res.status(401).json({ mensagem: "Erro ao apanhar usuários" });
   }
};

const registarUsuario = async (req, res) => {
   const { email, password, nome } = req.body;
   const foto = req.file.path;
   let usuarioAdicionado;
   try {
      let existeUsuario = await Usuario.findOne({ email });
      if (existeUsuario) {
         console.log("O usuário existe");
         res.status(401).json({ mensagem: "Este email já foi utilizado para criar uma conta!" });
      } else {
         console.log("O usuario não existe, criando a conta...");

         // Tornando o password secreto
         let passwordSecreto;
         try {
            passwordSecreto = await bcrypt.hash(password, 10);
         } catch (error) {
            console.log("Erro ao tornar o password em secreto");
         }

         // Fazendo upload da foto do perfil
         const response = await uploadImage(foto);

         usuarioAdicionado = new Usuario({
            nome,
            email,
            password: passwordSecreto,
            foto: response.url,
         });
         await usuarioAdicionado.save();

         const token = jwt.sign({ userId: usuarioAdicionado._id, password }, process.env.SENHA_JWT);

         res.json({ mensagem: "Conta criada com sucesso", usuario: { ...usuarioAdicionado.toObject(), password }, token });
      }
   } catch (error) {
      console.log(error.message);
      res.status(422).json({ mensagem: "Erro ao criar conta" });
   }
};

const fazerLogin = async (req, res) => {
   const { email, password } = req.body;
   try {
      let existeUsuario = await Usuario.findOne({ email });
      if (existeUsuario) {
         try {
            const passwordValido = await bcrypt.compare(password, existeUsuario.password);

            if (passwordValido) {
               const token = jwt.sign({ userId: existeUsuario._id, password }, process.env.SENHA_JWT);

               res.json({
                  mensagem: "Logado com sucesso!",
                  usuario: { ...existeUsuario.toObject(), password },
                  token,
               });
            } else {
               res.status(401).json({ mensagem: `Olá ${existeUsuario.nome}, a senha inserida é inválida!` });
            }
         } catch (error) {
            res.status(500).json({ mensagem: "Erro no servidor, tente novamente!" });
         }
      } else {
         res.status(401).json({ mensagem: "Esse usuário não existe" });
      }
   } catch (error) {
      res.status(500).json({ mensagem: "Erro do servidor ao fazer login" });
   }
};

const atualizarPerfil = async (req, res, next) => {
   let { uid } = req.params;
   console.log(uid);
   if (uid === "remover_foto") {
      next();
   } else {
      let { nome, password, fotoRemovida } = req.body;
      let foto = req?.file?.path;

      let novaSenhaEncriptada;
      try {
         novaSenhaEncriptada = await bcrypt.hash(password, 10);
      } catch (error) {
         console.log("Erro ao encriptar nova senha");
      }

      let novosDados = { nome, password: novaSenhaEncriptada };
      if (foto) {
         const response = await uploadImage(foto);
         novosDados.foto = response.url;
      }

      try {
         const perfilAtualizado = await Usuario.findByIdAndUpdate(uid, novosDados, { new: true });
         // Removendo a foto no backend
         if (foto) {
            const response = await removerFoto(fotoRemovida.split("/").slice(-1)[0].split(".")[0]);
         }
         res.json({ mensagem: "Perfil atualizado com sucesso!", usuario: { ...perfilAtualizado.toObject(), password } });
      } catch (error) {
         res.status(500).json({ mensagem: "Erro ao atualizar o perfil" });
      }
   }
};

const removerFotoPerfil = async (req, res) => {
   let { fotoRemovida } = req.body;
   let fotoPadrao = "https://res.cloudinary.com/dtm3uwkmw/image/upload/v1721267822/fotoPerfilPadrao.jpg";
   try {
      const perfilAtualizado = await Usuario.findByIdAndUpdate(req.userId, { foto: fotoPadrao }, { new: true });

      // Removendo a foto antiga no cloudinary
      if (fotoRemovida !== fotoPadrao) {
         const response = await removerFoto(fotoRemovida.split("/").slice(-1)[0].split(".")[0]);
      }

      res.json({ mensagem: "Foto Removida com sucesso", usuario: { ...perfilAtualizado.toObject(), password: req.password } });
   } catch (error) {
      res.status(500).json({ mensagem: "Erro ao remover a foto do perfil" });
   }
};

exports.getUsuarios = getUsuarios;
exports.registarUsuario = registarUsuario;
exports.fazerLogin = fazerLogin;
exports.getUsuarioById = getUsuarioById;
exports.atualizarPerfil = atualizarPerfil;
exports.removerFotoPerfil = removerFotoPerfil;
