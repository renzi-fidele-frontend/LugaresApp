const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

require("dotenv").config();

//  Rotas
const rotalugares = require("./routes/lugares-route");
const rotaUsuarios = require("./routes/usuarios-route");

const app = express();

app.use(cors());

console.log(process.env.PORT);

app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(function (req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
   res.header("Access-Control-Allow-Methods", "*");
   next();
});

app.use("/api/lugares", rotalugares);
app.use("/api/usuarios", rotaUsuarios);

// Caso se navegue para uma rota inexistente
app.use((req, res) => {
   res.status(404).json({ mensagem: "Essa rota não foi configurada" });
});

mongoose
   .connect(process.env.MONGO_URL)
   .then(() => {
      console.log("Conectado ao MongoDB!");
      app.listen(process.env.PORT, () => console.log("Inicializando o servidor"));
   })
   .catch((err) => console.log("Erro ao conectar"));
