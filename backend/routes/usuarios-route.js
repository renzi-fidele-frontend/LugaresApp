const express = require("express");
const { getLugaresDoUsuarioById, getUsuarios, registarUsuario, fazerLogin } = require("../controllers/usuarios-controller");

const router = express.Router();

router.get("/", getUsuarios);

router.get("/:uid", getLugaresDoUsuarioById);

router.post("/cadastro", registarUsuario);

router.post("/login", fazerLogin);

module.exports = router;
