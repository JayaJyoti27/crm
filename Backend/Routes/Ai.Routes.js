const express = require("express");
const router = express.Router();
const aiController = require("../Controllers/Ai.controllers");

router.post("/generate", aiController.generateMessage);

module.exports = router;
