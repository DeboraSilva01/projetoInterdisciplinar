const usuario = require("../models/modelUsuario"); // Importa o modelo de usuário

// Função para salvar um novo usuário
async function salvarUsuario(dados) {
  return await usuario.create(dados);
}

// Função para listar todos os usuários
async function listarUsuarios() {
  return await usuario.findAll();
}

// Função para buscar um usuário pelo ID
async function buscarUsuario(id) {
  return await usuario.findByPk(id);
}

// Função para atualizar um usuário pelo ID
async function atualizarUsuario(id, dados) {
  return await usuario.update(dados, { where: { id } });
}

// Função para deletar um usuário pelo ID
async function deletarUsuario(id) {
  return await usuario.destroy({ where: { id } });
}

module.exports = {
  salvarUsuario,
  listarUsuarios,
  buscarUsuario,
  atualizarUsuario,
  deletarUsuario,
};