const users = [
   { nome: "Renzi Fidele", nrLugares: 3, photoURL: "dummyPhoto", uid: "u1" },
   { nome: "Renzi Fidele", nrLugares: 3, photoURL: "dummyPhoto", uid: "u2" },
   { nome: "Renzi Fidele", nrLugares: 3, photoURL: "dummyPhoto", uid: "u3" },
   { nome: "Renzi Fidele", nrLugares: 3, photoURL: "dummyPhoto", uid: "u4" },
   { nome: "Renzi Fidele", nrLugares: 3, photoURL: "dummyPhoto", uid: "u5" },
   { nome: "Renzi Fidele", nrLugares: 1, photoURL: "dummyPhoto", uid: "u6" },
];

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

const getUsuarios = (req, res) => {
   res.json({ usuarios: users });
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

const registarUsuario = (req, res) => {
   const { email, password, nome } = req.body;
   // TODO: Cadastrar o usuário no banco de dados

   if (email && password && nome) {
      res.status(201).json({ usuario: { email, password, nome } });
   } else {
      res.status(500).json({ mensagem: "Envie todos os dados necessários para criar uma conta" });
   }
};

const fazerLogin = (req, res) => {
   const { email, password, nome } = req.body;
   // TODO: Validar o login do usuário

   if (email && password && nome) {
      res.status(201).json({ usuario: { email, password, nome } });
   } else {
      res.status(500).json({ mensagem: "Envie todos os dados necessários para criar uma conta" });
   }
};

exports.getUsuarios = getUsuarios;
exports.getLugaresDoUsuarioById = getLugaresDoUsuarioById;
exports.registarUsuario = registarUsuario;
exports.fazerLogin = fazerLogin;
