const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/modelUsuario");

const segredo = "seu-segredo"; // Substitua por uma chave secreta segura

async function login(req, res) {
  const { nome, senha } = req.body;

  try {
    // Verifica se o usuário existe
    const usuario = await Usuario.findOne({ where: { nome } });
    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário não encontrado." });
    }

    // Verifica a senha
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ mensagem: "Senha inválida." });
    }

    // Gera o token JWT com o ID e o role do usuário
    const token = jwt.sign(
      { id: usuario.idusuario, role: usuario.role },
      segredo,
      { expiresIn: "1h" }
    );

    // Retorna o token e o ID do usuário
    res.status(200).json({
      mensagem: "Login realizado com sucesso!",
      token,
      idusuario: usuario.idusuario,
      role: usuario.role, // Inclui o papel do usuário na resposta
    });
  } catch (error) {
    console.error("Erro ao realizar login:", error);
    res.status(500).json({ mensagem: "Erro ao realizar login." });
  }
}

module.exports = { login };