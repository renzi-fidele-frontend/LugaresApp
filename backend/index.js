const express = require("express");
const bodyParser = require("body-parser");

//  Rotas
const rotalugares = require("./routes/lugares-route");
const rotaUsuarios = require("./routes/usuarios-route");

const app = express();

app.use("/api/lugares", rotalugares);
app.use("/api/usuarios", rotaUsuarios);

const port = 3000;

app.listen(port, () => {
   console.log("Observando o servidor...");
});
