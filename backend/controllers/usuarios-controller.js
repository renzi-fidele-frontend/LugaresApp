const Usuario = require("../models/Usuario");
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getUsuarioById = async (req, res) => {
   try {
      const usuario = await Usuario.findById(req.params.uid, "-password");
      res.json({ usuario });
   } catch (error) {
      res.status(401).json({ mensagem: "Erro ao apanhar o usuário " + req.params.uid });
   }
};

const getUsuarios = async (req, res) => {
   try {
      let usuarios = await Usuario.find({}, "-password -email");
      res.json({ usuarios });
   } catch (error) {
      res.status(401).json({ mensagem: "Erro ao criar conta" });
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
         fs.unlink(foto, (unlinkError) => {
            if (unlinkError) {
               console.error("Falha ao remover:", unlinkError);
            } else {
               console.log("Foto temporária removida com sucesso");
            }
         });
      } else {
         console.log("O usuario não existe, criando a conta...");

         // Tornando o password secreto
         let passwordSecreto;
         try {
            passwordSecreto = await bcrypt.hash(password, 10);
         } catch (error) {
            console.log("Erro ao tornar o password em secreto");
         }

         usuarioAdicionado = new Usuario({
            nome,
            email,
            password: passwordSecreto,
            foto,
         });
         await usuarioAdicionado.save();

         const token = jwt.sign({ userId: usuarioAdicionado._id }, "Ratinho00");

         res.json({ mensagem: "Conta criada com sucesso", usuario: { ...usuarioAdicionado, password }, token });
      }
   } catch (error) {
      console.log(error.message);
      res.status(422).json({ mensagem: "Erro ao criar conta" });
      fs.unlink(foto, (unlinkError) => {
         if (unlinkError) {
            console.error("Falha ao remover:", unlinkError);
         } else {
            console.log("Foto temporária removida com sucesso");
         }
      });
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
               const token = jwt.sign({ userId: existeUsuario._id }, "Ratinho00");

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

const atualizarPerfil = async (req, res) => {
   let { uid } = req.params;
   let { nome, password } = req.body;
   let foto = req?.file?.path;

   let novaSenhaEncriptada;
   try {
      novaSenhaEncriptada = await bcrypt.hash(password, 10);
   } catch (error) {
      console.log("Erro ao encriptar nova senha");
   }

   let novosDados = { nome, password: novaSenhaEncriptada };
   if (foto) novosDados.foto = foto;

   try {
      const perfilAtualizado = await Usuario.findByIdAndUpdate(uid, novosDados, { new: true });
      // TODO: Remover a antiga foto de perfil após atualizar uma nova foto de perfil
      res.json({ mensagem: "Perfil atualizado com sucesso!", usuario: { ...perfilAtualizado.toObject(), password } });
   } catch (error) {
      res.status(500).json({ mensagem: "Erro ao atualizar o perfil" });
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
};

exports.getUsuarios = getUsuarios;
exports.registarUsuario = registarUsuario;
exports.fazerLogin = fazerLogin;
exports.getUsuarioById = getUsuarioById;
exports.atualizarPerfil = atualizarPerfil;
