const express = require("express");
const {
  listarTodosUsuarios,
  buscarUsuarioPorId,
  criarUsuario,
  atualizarUsuarioPorId,
  deletarUsuarioPorId,
} = require("../controllers/usuarios");

const router = express.Router();

// Rota para listar todos os usuários
router.get("/usuarios", listarTodosUsuarios);

// Rota para buscar usuário por ID
router.get("/usuarios/:id", buscarUsuarioPorId);

// Rota para criar usuário
router.post("/usuarios", criarUsuario);

// Rota para atualizar usuário por ID
router.put("/usuarios/:id", atualizarUsuarioPorId);

// Rota para deletar usuário por ID
router.delete("/usuarios/:id", deletarUsuarioPorId);

module.exports = router;
