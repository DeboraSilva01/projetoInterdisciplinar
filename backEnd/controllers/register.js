const bcrypt = require("bcryptjs");

const Usuario = require("../models/modelUsuario"); // Importa o modelo de usuário

async function register(req, res) {
  const { nome, email, senha, cpf, contato, endereco } = req.body;

  try {
    // Verifica se o e-mail já está cadastrado
    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ message: "Email já cadastrado." });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Salva o usuário no banco de dados com Sequelize
    await Usuario.create({
      nome,
      email,
      senha: hashedPassword, // Salva a senha com hash
      cpf,
      contato,
      endereco,
    });

    res.status(201).json({ message: "Usuário salvo com sucesso!" });
  } catch (error) {
    console.error("Erro ao salvar usuário:", error);
    res.status(500).json({ message: "Erro ao salvar usuário." });
  }
}

module.exports = { register };
