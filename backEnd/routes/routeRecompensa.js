const express = require("express");
const router = express.Router();
const { criarRecompensa, buscarRecompensas } = require("../controllers/recompensa");
const { verificarRole } = require("../middleware/authMiddleware");

// Criar recompensa (somente para organizações)
router.post("/criarRecompensa", verificarRole("org"), criarRecompensa);

// Buscar recompensas do usuário que confirmou presença
router.get("/recompensas/:idusuario", buscarRecompensas);

module.exports = router;
