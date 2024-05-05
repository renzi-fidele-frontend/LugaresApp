const express = require("express");

const lugares_controller = require("../controllers/lugares-controller");

const router = express.Router();

router.get("/", lugares_controller.getLugares);

router.get("/:idLugar", lugares_controller.getLugarById);

module.exports = router;
