const express = require("express");
const { getUsuarios, registarUsuario, fazerLogin } = require("../controllers/usuarios-controller");

const router = express.Router();

router.get("/", getUsuarios);

router.post("/cadastro", registarUsuario);

router.post("/login", fazerLogin);

module.exports = router;
