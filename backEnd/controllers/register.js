const bcrypt = require("bcryptjs");
const Usuario = require("../models/modelUsuario");

async function register(req, res) {
  const { nome, cpf, contato, email, senha, endereco } = req.body;

  try {
    console.log("Dados recebidos para cadastro:", req.body);

    // Verifica se o nome já está cadastrado
    const existingUser = await Usuario.findOne({ where: { nome } });
    if (existingUser) {
      return res.status(400).json({ mensagem: "Nome já cadastrado." });
    }

    // Valida CPF ou CNPJ
    if (!cpf || (cpf.length !== 11 && cpf.length !== 14)) {
      return res.status(400).json({ mensagem: "CPF ou CNPJ inválido." });
    }

    // Define o papel (role) com base no CPF ou CNPJ
    const role = cpf.length === 11 ? "user" : "org";

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Cria o usuário no banco de dados
    const novoUsuario = await Usuario.create({
      nome,
      cpf,
      contato,
      email,
      senha: hashedPassword,
      endereco,
      role,
    });

    res.status(201).json({ mensagem: "Usuário registrado com sucesso!", idusuario: novoUsuario.idusuario });
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    res.status(500).json({ mensagem: "Erro ao registrar usuário." });
  }
}

module.exports = { register };