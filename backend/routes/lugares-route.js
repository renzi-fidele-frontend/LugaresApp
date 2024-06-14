const express = require("express");

const {
   getLugares,
   getLugarById,
   adicionarLugar,
   atualizarLugarById,
   removerLugarById,
   getLugaresDoUsuarioById,
} = require("../controllers/lugares-controller");

const fileUpload = require("../middlewares/fileUpload");
const verificarToken = require("../middlewares/auth");

const router = express.Router();

// Rotas públicas

router.get("/", getLugares);

router.get("/:idLugar", getLugarById);

router.get("/usuario/:uid", getLugaresDoUsuarioById);

// Rotas privadas

router.use(verificarToken);

router.post("/", fileUpload.single("foto"), adicionarLugar);

router.patch("/:idLugar", atualizarLugarById);

router.delete("/:idLugar", removerLugarById);




module.exports = router;
