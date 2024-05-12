const uuid = require("uuid");

const users = [
   { nome: "Renzi Fidele", nrLugares: 3, photoURL: "dummyPhoto", uid: "u1" },
   { nome: "Renzi Fidele", nrLugares: 3, photoURL: "dummyPhoto", uid: "u2" },
   { nome: "Renzi Fidele", nrLugares: 3, photoURL: "dummyPhoto", uid: "u3" },
   { nome: "Renzi Fidele", nrLugares: 3, photoURL: "dummyPhoto", uid: "u4" },
   { nome: "Renzi Fidele", nrLugares: 3, photoURL: "dummyPhoto", uid: "u5" },
   { nome: "Renzi Fidele", nrLugares: 1, photoURL: "dummyPhoto", uid: "u6" },
];

const getUsuarios = (req, res) => {
   res.json({ usuarios: users });
};

const registarUsuario = (req, res) => {
   const { email, password, nome } = req.body;
   // TODO: Cadastrar o usuário no banco de dados

   if (email && password && nome) {
      res.status(201).json({ usuario: { id: uuid.v4(), email, password, nome } });
   } else {
      res.status(500).json({ mensagem: "Envie todos os dados necessários para criar uma conta" });
   }
};

const fazerLogin = (req, res) => {
   const { email, password } = req.body;
   // TODO: Validar o login do usuário

   if (email && password) {
      res.status(201).json({ usuario: { id: uuid.v4(), email, password } });
   } else {
      res.status(500).json({ mensagem: "Envie todos os dados necessários para fazer o login" });
   }
};

exports.getUsuarios = getUsuarios;
exports.registarUsuario = registarUsuario;
exports.fazerLogin = fazerLogin;
