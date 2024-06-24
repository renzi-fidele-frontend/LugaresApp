const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {
   // Lidando com o erro de CORS
   if (req.method === "OPTIONS") return next();

   const token = req.header("Authorization")?.split(" ")[1];

   if (!token) {
      res.status(401).json({ mensagem: "Acesso negado! Faça a autenticação como deve ser." });
   } else {
      try {
         let desencriptado = jwt.verify(token, process.env.SENHA_JWT);
         console.log(desencriptado);
         req.userId = desencriptado.userId;
         req.password = desencriptado.password;
         next();
      } catch (error) {
         console.log(error);
         res.status(500).json({ mensagem: "Erro do servidor, tente novamente." });
      }
   }
};

module.exports = verificarToken;
