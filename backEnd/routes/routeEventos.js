const express = require("express");
const {
  criarEvento,
  listarEventos,
  buscarEvento,
  atualizarEvento,
  deletarEvento,
} = require("../controllers/eventos");
const { verificarRole } = require("../middleware/authMiddleware");

const router = express.Router();

// Rotas para eventos
router.post("/criarEventos", verificarRole("org"), criarEvento); // Criar evento (protegido)
router.get("/eventos", listarEventos); // Listar todos os eventos (protegido)
router.get("/eventos/:id", buscarEvento); // Buscar evento por ID (protegido)
router.patch("/eventos/:id", atualizarEvento); // Atualizar evento por ID (protegido)
router.delete("/eventos/:id", deletarEvento); // Deletar evento por ID (protegido)

module.exports = router;