const mongoose = require("mongoose");

const schemaDoLugar = new mongoose.Schema(
   {
      titulo: { type: String, required: true },
      descricao: { type: String, required: true },
      foto: { type: String, required: true },
      endereco: { type: String, required: true },
      coordenadas: {
         lat: { type: Number, required: true },
         lng: { type: Number, required: true },
      },
      idCriador: { type: String, required: true },
      criadoEm: { type: Number, default: Date.now },
   },
   { collection: "lugares" }
);

const Lugar = mongoose.model("Lugar", schemaDoLugar);

module.exports = Lugar;
