const inscricao = require("../models/inscricao"); // Importa o modelo de inscrição
const evento = require("../models/modelEventos"); // Importa o modelo de eventos

// Controlador para inscrever um usuário em um evento
async function inscreverUsuario(req, res) {
  const idevento = req.params.id;
  const { idusuario } = req.body;

  console.log("Dados recebidos no backend:", { idevento, idusuario });

  try {
    // Verifica se o evento existe
    const eventoExistente = await evento.findOne({ where: { idevento } });
    if (!eventoExistente) {
      return res.status(404).json({ mensagem: "Evento não encontrado." });
    }

    // Verifica se o evento tem vagas disponíveis
    if (eventoExistente.vagas <= 0) {
      return res.status(400).json({ mensagem: "Não há vagas disponíveis para este evento." });
    }

    // Verifica se o usuário já está inscrito no evento
    const inscricaoExistente = await inscricao.findOne({
      where: { idevento, idusuario },
    });

    if (inscricaoExistente) {
      return res.status(400).json({ mensagem: "Usuário já inscrito no evento." });
    }

    // Se não estiver inscrito, cria nova inscrição
    const novaInscricao = await inscricao.create({
      idevento,
      idusuario,
      datainscricao: new Date(),
      status: "pendente",
    });

    // Atualiza o número de vagas do evento
    await evento.update(
      { vagas: eventoExistente.vagas - 1 },
      { where: { idevento } }
    );

    console.log("Inscrição criada com sucesso:", novaInscricao);
    res.status(201).json({ mensagem: "Inscrição realizada com sucesso!", inscricao: novaInscricao });
  } catch (error) {
    console.error("Erro ao inscrever usuário no evento:", error);
    res.status(500).json({ mensagem: "Erro ao inscrever usuário no evento." });
  }
}

async function listarInscricoesPorUsuario(req, res) {
  const { idusuario } = req.params;

  try {
    const inscricoes = await inscricao.findAll({
      where: { idusuario },
      attributes: ["idevento", "status"], // Aqui você já está pedindo o status (certo!)
    });

    // 🔧 Retorna o array diretamente, sem map
    res.status(200).json(inscricoes);
  } catch (error) {
    console.error("Erro ao listar inscrições:", error);
    res.status(500).json({ mensagem: "Erro ao listar inscrições." });
  }
}



// Controlador para validar presença via QR Code
async function validarPresenca(req, res) {
  const { qrCode, idusuario } = req.body; // O frontend envia o token e o ID do usuário

  if (!qrCode) {
    return res.status(400).json({ mensagem: "O campo 'qrCode' é obrigatório." });
  }

  if (!idusuario) {
    return res.status(400).json({ mensagem: "O campo 'idusuario' é obrigatório." });
  }

  try {
    // Busca o evento pelo token no campo 'qr_code'
    const eventoEncontrado = await evento.findOne({ where: { qr_code: qrCode } });
    if (!eventoEncontrado) {
      return res.status(404).json({ mensagem: "QR Code inválido ou evento não encontrado." });
    }

    // Verifica se o usuário está inscrito no evento
    const inscricaoExistente = await inscricao.findOne({
      where: { idevento: eventoEncontrado.idevento, idusuario },
    });

    if (!inscricaoExistente) {
      return res.status(400).json({ mensagem: "Usuário não inscrito no evento." });
    }

    // Atualiza o status da inscrição para "Confirmado"
    await inscricao.update(
      { status: "Confirmado" },
      { where: { idevento: eventoEncontrado.idevento, idusuario } }
    );

    res.status(200).json({ mensagem: "Presença validada com sucesso!" });
  } catch (error) {
    console.error("Erro ao validar presença:", error);
    res.status(500).json({ mensagem: "Erro ao validar presença." });
  }
}

module.exports = {
  inscreverUsuario,
  validarPresenca,
  listarInscricoesPorUsuario,
};