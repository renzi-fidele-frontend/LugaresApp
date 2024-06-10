const express = require("express");
const { getUsuarios, registarUsuario, fazerLogin, getUsuarioById } = require("../controllers/usuarios-controller");

const fileUpload = require("../middlewares/fileUpload");

const router = express.Router();

router.get("/", getUsuarios);

router.post("/cadastro", fileUpload.single("foto"), registarUsuario);

router.get("/:uid", getUsuarioById);

router.post("/login", fazerLogin);

module.exports = router;
