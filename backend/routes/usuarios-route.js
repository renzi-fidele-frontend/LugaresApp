const express = require("express");
const { getUsuarios, registarUsuario, fazerLogin, getUsuarioById } = require("../controllers/usuarios-controller");

const router = express.Router();

router.get("/", getUsuarios);

router.post("/cadastro", registarUsuario);

router.get("/:uid", getUsuarioById);

router.post("/login", fazerLogin);

module.exports = router;
