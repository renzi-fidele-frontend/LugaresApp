const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {
   const token = req.header("Authorization");
   if (!token) {
      res.status(401).json({ mensagem: "Acesso negado! Faça a autenticação como deve ser." });
   } else {
      try {
         let desencriptado = jwt.verify(token, "Ratinho00");
         console.log(desencriptado);
         req.userId = desencriptado.userId;

         next();
      } catch (error) {
         console.log(error);
         res.status(500).json({ mensagem: "Erro do servidor, tente novamente." });
      }
   }
};

module.exports = verificarToken;
