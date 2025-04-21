const {
  salvarUsuario,
  listarUsuarios,
  buscarUsuario,
  atualizarUsuario,
  deletarUsuario,
} = require("../services/usuario");

// Criar um novo usuário
async function criarUsuario(req, res) {
  try {
    const usuario = await salvarUsuario(req.body);
    res.status(201).json(usuario);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
}

// Listar todos os usuários
async function listarTodosUsuarios(req, res) {
  try {
    const usuarios = await listarUsuarios();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar usuários" });
  }
}

// Buscar usuário por ID
async function buscarUsuarioPorId(req, res) {
  try {
    const usuario = await buscarUsuario(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuário" });
  }
}

// Atualizar usuário por ID
async function atualizarUsuarioPorId(req, res) {
  try {
    const atualizado = await atualizarUsuario(req.params.id, req.body);
    if (!atualizado[0]) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    res.json({ message: "Usuário atualizado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar usuário" });
  }
}

// Deletar usuário por ID
async function deletarUsuarioPorId(req, res) {
  try {
    const deletado = await deletarUsuario(req.params.id);
    if (!deletado) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    res.json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar usuário" });
  }
}

module.exports = {
  criarUsuario,
  listarTodosUsuarios,
  buscarUsuarioPorId,
  atualizarUsuarioPorId,
  deletarUsuarioPorId,
};