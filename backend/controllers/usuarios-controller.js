const uuid = require("uuid");
const Usuario = require("../models/Usuario");

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
   // TODO: Apanhar todos os usuários no banco de dados
};

const registarUsuario = async (req, res) => {
   const { email, password, nome } = req.body;
   // TODO: Cadastrar o usuário no banco de dados
   let usuarioAdicionado;
   try {
      let existeUsuario = await Usuario.findOne({ email });
      if (existeUsuario) {
         console.log("O usuário existe");
         res.json({ mensagem: "Este email já foi utilizad opara criar uma conta" });
      } else {
         console.log("O usuario não existe");
         usuarioAdicionado = new Usuario({
            nome,
            email,
            password,
            foto: "https://firebasestorage.googleapis.com/v0/b/miniblog-c5fa5.appspot.com/o/fotosPerfil%2Fff7db268-a753-464e-b420-b9e859ec6ab9281224678_2115790858626371_7861766981112604163_n.jpg?alt=media&token=02d8c35e-5262-4f67-9970-7edac0216a8e",
         });
         await usuarioAdicionado.save();
         res.json({ mensagem: "Conta criada com sucesso" });
      }
   } catch (error) {
      console.log(error.message);
      res.status(401).json({ mensagem: "Erro ao criar conta" });
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
