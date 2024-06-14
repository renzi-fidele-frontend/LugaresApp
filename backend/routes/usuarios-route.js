const express = require("express");
const { getUsuarios, registarUsuario, fazerLogin, getUsuarioById, atualizarPerfil } = require("../controllers/usuarios-controller");

const fileUpload = require("../middlewares/fileUpload");
const verificarToken = require("../middlewares/auth");

const router = express.Router();

//  Rotas públicas

router.get("/", getUsuarios);

router.get("/:uid", getUsuarioById);

router.post("/cadastro", fileUpload.single("foto"), registarUsuario);

router.post("/login", fazerLogin);

//  Rotas Privadas

router.use(verificarToken);

router.patch("/:uid", fileUpload.single("foto"), atualizarPerfil);

module.exports = router;
