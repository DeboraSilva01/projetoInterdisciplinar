const express = require("express");
const { inscreverUsuario } = require("../controllers/inscricoes");

const router = express.Router();

// Rota para inscrever um usuário em um evento
router.post("/eventos/:id/inscrever", inscreverUsuario);

module.exports = router;