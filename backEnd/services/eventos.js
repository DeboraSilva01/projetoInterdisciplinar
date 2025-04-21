const evento = require("../models/modelEventos"); // Importa o modelo de evento

// Função para salvar um novo evento
async function salvarEvento(dados) {
  return await evento.create(dados);
}

// Função para listar todos os eventos
async function listarEventos() {
  return await evento.findAll();
}

// Função para buscar um evento pelo ID
async function buscarEvento(id) {
  return await evento.findByPk(id);
}

// Função para atualizar um evento pelo ID
async function atualizarEvento(id, dados) {
  return await evento.update(dados, { where: { id } });
}

// Função para deletar um evento pelo ID
async function deletarEvento(id) {
  return await evento.destroy({ where: { id } });
}

module.exports = {
  salvarEvento,
  listarEventos,
  buscarEvento,
  atualizarEvento,
  deletarEvento,
};