const recompensa = require("../models/modelsRecompensa"); // Importa o modelo de recompensas
const inscricao = require("../models/inscricao");


async function criarRecompensa(req, res) {
  try {
    const {idevento, descricao, desconto, validade} = req.body;
    console.log("Dados recebidos no controllers:", req.body);

    // Cria o evento no banco de dados com o ID do organizador
    const novaRecompensa = await recompensa.create({
      idevento: idevento,
      descricao,
      desconto,
      validade
    });
    console.log("Recompensa criada:", novaRecompensa);
      res.status(201).json({
      mensagem: "Recompensa criada com sucesso!",

      })


  } catch (error) {
    console.error("Erro ao cadastra Recompensa", error);
    res.status(500).json({ mensagem: "Erro ao criar Recompensa." });
  }
} 

async function buscarRecompensas(req, res) {
  const { idusuario } = req.params; // Recebe o ID do usuário da URL

  try {
    // Busca inscrições confirmadas do usuário
    const inscricoesConfirmadas = await inscricao.findAll({
      where: { idusuario, status: "Confirmado" }
    });

    if (!inscricoesConfirmadas.length) {
      return res.status(404).json({ mensagem: "Nenhuma inscrição confirmada encontrada." });
    }

    // Obtém os IDs dos eventos que ele confirmou presença
    const idsEventos = inscricoesConfirmadas.map(inscricao => inscricao.idevento);

    // Busca recompensas associadas a esses eventos
    const recompensas = await recompensa.findAll({
      where: { idevento: idsEventos }
    });

    res.status(200).json(recompensas);
  } catch (error) {
    console.error("Erro ao buscar recompensas:", error);
    res.status(500).json({ mensagem: "Erro ao buscar recompensas." });
  }
}

module.exports = {
    buscarRecompensas,
    criarRecompensa
};