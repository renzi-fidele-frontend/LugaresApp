const express = require("express");

const { getLugares, getLugarById, adicionarLugar } = require("../controllers/lugares-controller");

const router = express.Router();

router.get("/", getLugares);

router.get("/:idLugar", getLugarById);

router.post("/", adicionarLugar);

module.exports = router;
