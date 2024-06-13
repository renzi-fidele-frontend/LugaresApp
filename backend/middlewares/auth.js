const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {
   const token = req.header("Authorization");
   if (!token) {
      return res.status(401).json({ error: "Access denied" });
   } else {
      try {
         let desencriptado = jwt.verify(token, "Ratinho00");
         console.log(desencriptado);
         next();
      } catch (error) {
         console.log(error);
      }
   }
};

module.exports = verificarToken;
