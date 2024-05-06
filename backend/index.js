const express = require("express");
const bodyParser = require("body-parser");

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

app.listen(port, () => {
   console.log("Observando o servidor...");
});
