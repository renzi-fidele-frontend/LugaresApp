const express = require("express");
const { getLugaresDoUsuarioById, getUsuarios } = require("../controllers/usuarios-controller");

const router = express.Router();

router.get("/", getUsuarios);

router.get("/:uid", getLugaresDoUsuarioById);

module.exports = router;
