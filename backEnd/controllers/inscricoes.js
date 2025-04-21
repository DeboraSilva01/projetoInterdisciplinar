const inscricao = require("../models/inscricao"); // Importa o modelo de inscrição
const evento = require("../models/modelEventos"); // Importa o modelo de eventos

async function inscreverUsuario(req, res) {
  const idevento = req.params.id;
  const { idusuario } = req.body;

  console.log("Dados recebidos no backend:", { idevento, idusuario });

  if (!idusuario) {
    return res.status(400).json({ mensagem: "O campo 'idusuario' é obrigatório." });
  }

  try {
    // Verifica se o usuário já está inscrito no evento
    const inscricaoExistente = await inscricao.findOne({
      where: { idevento, idusuario }
    });

    if (inscricaoExistente) {
      return res.status(400).json({ mensagem: "Usuário já inscrito no evento." });
    }

    // Se não estiver inscrito, cria nova inscrição
    const novaInscricao = await inscricao.create({
      idevento,
      idusuario,
      datainscricao: new Date(),
      status: "pendente"
    });

    console.log("Inscrição criada com sucesso:", novaInscricao);
    res.status(201).json({ mensagem: "Inscrição realizada com sucesso!", inscricao: novaInscricao });
  } catch (error) {
    console.error("Erro ao inscrever usuário no evento:", error);
    res.status(500).json({ mensagem: "Erro ao inscrever usuário no evento." });
  }
}
module.exports = {
  inscreverUsuario,
};