const express = require("express");
const {
  criarEvento,
  listarEventos,
  buscarEvento,
  atualizarEvento,
  deletarEvento,
} = require("../controllers/eventos");

const router = express.Router();

// Rotas para eventos
router.post("/criarEventos", criarEvento); // Criar evento
router.get("/eventos", listarEventos); // Listar todos os eventos
router.get("/eventos/:id", buscarEvento); // Buscar evento por ID
router.patch("/eventos/:id", atualizarEvento); // Atualizar evento por ID
router.delete("/eventos/:id", deletarEvento); // Deletar evento por ID

module.exports = router;