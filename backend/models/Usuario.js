const mongoose = require("mongoose");

const schemaDoUsuario = new mongoose.Schema(
   {
      nome: { type: String, required: true },
      email: { type: String, required: true },
      password: { type: String, required: true },
   },
   { collection: "usuarios" }
);

const Usuario = mongoose.model("Usuario", schemaDoUsuario);

module.exports = Usuario;
