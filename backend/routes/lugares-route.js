const express = require("express");

const {
   getLugares,
   getLugarById,
   adicionarLugar,
   atualizarLugarById,
   removerLugarById,
   getLugaresDoUsuarioById,
} = require("../controllers/lugares-controller");

const router = express.Router();

router.get("/", getLugares);

router.get("/:idLugar", getLugarById);

router.get("/usuario/:uid", getLugaresDoUsuarioById);

router.post("/", adicionarLugar);

router.patch("/:idLugar", atualizarLugarById);

router.delete("/:idLugar", removerLugarById);

module.exports = router;
