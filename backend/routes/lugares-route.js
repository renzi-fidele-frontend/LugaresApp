const express = require("express");

const { getLugares, getLugarById } = require("../controllers/lugares-controller");

const router = express.Router();

router.get("/", getLugares);

router.get("/:idLugar", getLugarById);

module.exports = router;
