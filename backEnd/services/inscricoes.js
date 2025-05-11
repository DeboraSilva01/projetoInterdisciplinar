const inscricao = require("../models/inscricao"); // Importa o modelo de inscrição



// Função para salvar uma nova inscrição
async function salvarInscricao(dados) {
  try {
    return await inscricao.create(dados);
  } catch (error) {
    console.error("Erro ao salvar inscrição:", error);
    throw error;
  }
}

// Função para listar todas as inscrições
async function listarInscricoes() {
  try {
    return await inscricao.findAll();
  } catch (error) {
    console.error("Erro ao listar inscrições:", error);
    throw error;
  }
}

// Função para buscar inscrições por ID do evento ou ID do usuário
async function buscarInscricoes(filtro) {
  try {
    return await inscricao.findAll({ where: filtro });
  } catch (error) {
    console.error("Erro ao buscar inscrições:", error);
    throw error;
  }
}

// Função para atualizar o status de uma inscrição
async function atualizarInscricao(idinscricao, dados) {
  try {
    return await inscricao.update(dados, { where: { idinscricao } });
  } catch (error) {
    console.error("Erro ao atualizar inscrição:", error);
    throw error;
  }
}

// Função para deletar uma inscrição pelo ID
async function deletarInscricao(idinscricao) {
  try {
    return await inscricao.destroy({ where: { idinscricao } });
  } catch (error) {
    console.error("Erro ao deletar inscrição:", error);
    throw error;
  }
}

module.exports = {
  salvarInscricao,
  listarInscricoes,
  buscarInscricoes,
  atualizarInscricao,
  deletarInscricao,
};