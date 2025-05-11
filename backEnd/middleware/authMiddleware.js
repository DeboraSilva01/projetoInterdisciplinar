const jwt = require("jsonwebtoken");
const segredo = "seu-segredo"; // Substitua por uma chave secreta segura

function verificarToken(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1]; // Extrai o token do cabeçalho

  if (!token) {
    return res.status(403).json({ mensagem: "Token não fornecido" });
  }

  jwt.verify(token, segredo, (erro, decoded) => {
    if (erro) {
      return res.status(401).json({ mensagem: "Token inválido" });
    }

    req.usuarioId = decoded.id; // Coloca o ID do usuário na requisição
    next();
  });
}

module.exports = verificarToken;