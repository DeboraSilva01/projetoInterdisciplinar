const express = require("express");
const { inscreverUsuario, validarPresenca, listarInscricoesPorUsuario } = require("../controllers/inscricoes");

const router = express.Router();

// Rota para inscrever um usuário em um evento
router.post("/eventos/:id/inscrever", inscreverUsuario);

// Rota para validar presença via QR Code
router.post("/validar-presenca", validarPresenca);
router.get("/inscricoes/:idusuario", listarInscricoesPorUsuario);

// Rota para listar inscrições de um usuário
//router.get("/inscricoes/:idusuario", listarInscricoesPorUsuario);

module.exports = router;