const express = require("express");

const {
   getLugares,
   getLugarById,
   adicionarLugar,
   atualizarLugarById,
   removerLugarById,
   getLugaresDoUsuarioById,
} = require("../controllers/lugares-controller");

const multer = require("../middlewares/multer");
const verificarToken = require("../middlewares/auth");

const router = express.Router();

// Rotas públicas

router.get("/", getLugares);

router.get("/:idLugar", getLugarById);

router.get("/usuario/:uid", getLugaresDoUsuarioById);

// Rotas privadas

router.use(verificarToken);

router.post("/", multer.single("foto"), adicionarLugar);

router.patch("/:idLugar", multer.single("foto"), atualizarLugarById);

router.delete("/:idLugar", removerLugarById);

module.exports = router;
