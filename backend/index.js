const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//  Rotas
const rotalugares = require("./routes/lugares-route");
const rotaUsuarios = require("./routes/usuarios-route");

const app = express();

app.use(bodyParser.json());
app.use("/api/lugares", rotalugares);
app.use("/api/usuarios", rotaUsuarios);

// Caso se navegue para uma rota inexistente
app.use((req, res) => {
   res.status(404).json({ mensagem: "Essa rota não foi configurada" });
});

const port = 3000;

mongoose
   .connect("mongodb+srv://admin:Ratinho00@cluster0.dcvywkf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
   .then(() => {
      console.log("Conectado ao MongoDB!");
      app.listen(port, () => console.log("Inicializando o servidor"));
   })
   .catch((err) => console.log("Erro ao conectar"));
