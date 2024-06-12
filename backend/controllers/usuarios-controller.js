const Usuario = require("../models/Usuario");
const fs = require("fs");
const bcrypt = require("bcrypt");

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
         res.json({ mensagem: "Conta criada com sucesso", usuario: usuarioAdicionado });
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
   // TODO: Validar o login do usuário
   try {
      let existeUsuario = await Usuario.findOne({ email });
      if (existeUsuario) {
         if (existeUsuario.password === password) {
            res.json({ mensagem: "Logado com sucesso!", usuario: existeUsuario });
         } else {
            res.status(401).json({ mensagem: `Olá ${existeUsuario.nome}, a senha inserida é inválida!` });
         }
      } else {
         res.status(401).json({ mensagem: "Esse usuário não existe" });
      }
   } catch (error) {
      res.status(500).json({ mensagem: "Erro do servidor ao fazer login" });
   }
};

// Adicionar middleware para editar Perfil

exports.getUsuarios = getUsuarios;
exports.registarUsuario = registarUsuario;
exports.fazerLogin = fazerLogin;
exports.getUsuarioById = getUsuarioById;
