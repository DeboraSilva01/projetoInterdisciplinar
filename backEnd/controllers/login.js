const bcrypt = require("bcryptjs");
const Usuario = require("../models/modelUsuario"); // Importa o modelo de usuário

async function login(req, res) {
  const { nome, senha } = req.body; // Usando nome como identificador

  try {
    // Busca o usuário pelo nome no banco de dados
    const usuario = await Usuario.findOne({ where: { nome } });

    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    // Compara a senha fornecida com o hash armazenado no banco
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ message: "Senha inválida." });
    }

    // Retorna uma mensagem de sucesso (aqui pode incluir um token JWT, se necessário)
    res.status(200).json({ 
      message: "Login realizado com sucesso!", 
      usuario: { idusuario: usuario.idusuario, nome: usuario.nome }
    });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    res.status(500).json({ message: "Erro no servidor." });
  }
}

module.exports = { login };
