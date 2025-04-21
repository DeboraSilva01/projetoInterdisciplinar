const evento = require("../models/modelEventos"); // Importa o modelo de eventos
const inscricao = require("../models/inscricao"); // Importa o modelo de inscrições

// Criar um novo evento
async function criarEvento(req, res) {
  try {
    const { nomeevento, data, horainicial, horafinal, local, equipamentos, vagas, descricao } = req.body;

    // Cria o evento
    await evento.create({
      nomeevento,
      data,
      horainicial,
      horafinal,
      local,
      equipamentos,
      vagas,
      descricao,
    });

    res.status(201).json({ mensagem: "Evento criado com sucesso!" });
  } catch (error) {
    console.error("Erro ao criar evento:", error);
    res.status(500).json({ mensagem: "Erro ao criar evento." });
  }
}

// Listar todos os eventos
async function listarEventos(req, res) {
  try {
    const eventos = await evento.findAll(); // Recupera todos os eventos
    console.log("Eventos recuperados:", eventos); // Log para depuração
    res.json(eventos); // Retorna os eventos como JSON
  } catch (error) {
    console.error("Erro ao listar eventos:", error);
    res.status(500).json({ mensagem: "Erro ao listar eventos." });
  }
}

// Buscar um evento pelo ID
async function buscarEvento(req, res) {
  try {
    const eventoEncontrado = await evento.findByPk(req.params.id); // Busca pelo ID
    if (!eventoEncontrado) {
      return res.status(404).json({ mensagem: "Evento não encontrado." });
    }
    res.json(eventoEncontrado);
  } catch (error) {
    console.error("Erro ao buscar evento:", error);
    res.status(500).json({ mensagem: "Erro ao buscar evento." });
  }
}

// Atualizar um evento pelo ID
async function atualizarEvento(req, res) {
  try {
    const [atualizado] = await evento.update(req.body, { where: { idevento: req.params.id } });
    if (!atualizado) {
      return res.status(404).json({ mensagem: "Evento não encontrado para atualizar." });
    }
    res.status(200).json({ mensagem: "Evento atualizado com sucesso!" });
  } catch (error) {
    console.error("Erro ao atualizar evento:", error);
    res.status(500).json({ mensagem: "Erro ao atualizar evento." });
  }
}

// Deletar um evento pelo ID
async function deletarEvento(req, res) {
  try {
    const deletado = await evento.destroy({ where: { id: req.params.id } });
    if (!deletado) {
      return res.status(404).json({ mensagem: "Evento não encontrado para deletar." });
    }
    res.status(204).json({ mensagem: "Evento deletado com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar evento:", error);
    res.status(500).json({ mensagem: "Erro ao deletar evento." });
  }
}


module.exports = {
  criarEvento,
  listarEventos,
  buscarEvento,
  atualizarEvento,
  deletarEvento,

};