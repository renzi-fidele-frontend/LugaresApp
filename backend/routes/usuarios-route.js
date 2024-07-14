const express = require("express");
const {
   getUsuarios,
   registarUsuario,
   fazerLogin,
   getUsuarioById,
   atualizarPerfil,
   removerFotoPerfil,
} = require("../controllers/usuarios-controller");

const multer = require("../middlewares/multer");
const verificarToken = require("../middlewares/auth");

const router = express.Router();

//  Rotas públicas

router.get("/", getUsuarios);

router.get("/:uid", getUsuarioById);

router.post("/cadastro", multer.single("foto"), registarUsuario);

router.post("/login", fazerLogin);

//  Rotas Privadas

router.use(verificarToken);

router.patch("/:uid", multer.single("foto"), atualizarPerfil);

router.patch("/remover_foto", removerFotoPerfil);

module.exports = router;
