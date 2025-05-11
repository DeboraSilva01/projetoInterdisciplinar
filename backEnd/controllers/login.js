const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/modelUsuario"); // Certifique-se de que o modelo está correto

async function login(req, res) {
  const { nome, senha } = req.body; // Obtém os dados do corpo da requisição

  try {
    // Busca o usuário no banco de dados
    const usuario = await Usuario.findOne({ where: { nome } });

    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário não encontrado." });
    }

    // Compara a senha fornecida com o hash armazenado no banco
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ mensagem: "Senha inválida." });
    }

    // Gera o token JWT com o ID do usuário
    const token = jwt.sign({ id: usuario.idusuario }, "seu-segredo", { expiresIn: "1h" });

    // Retorna o token e o ID do usuário
    res.status(200).json({
      mensagem: "Login realizado com sucesso!",
      token,
      idusuario: usuario.idusuario,
    });
  } catch (error) {
    console.error("Erro ao realizar login:", error);
    res.status(500).json({ mensagem: "Erro ao realizar login." });
  }
}

module.exports = { login };