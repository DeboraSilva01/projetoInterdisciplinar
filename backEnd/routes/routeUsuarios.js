const express = require("express");
const Usuario = require("../models/modelUsuario");

const router = express.Router();

// Rota para listar todos os usuários
router.get("/usuarios", async (req, res) => {
  try {
    const usuarios = await Usuario.findAll(); // Busca todos os usuários no banco
    res.json(usuarios); // Retorna os dados em formato JSON
  } catch (error) {
    console.error("Erro ao buscar usuários:", error); // Log do erro no console
    res.status(500).json({ error: "Erro ao buscar usuários" }); // Retorna o erro ao cliente
  }
});

module.exports = router;