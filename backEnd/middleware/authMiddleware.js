const jwt = require("jsonwebtoken");
const segredo = "seu-segredo"; // Substitua por uma chave secreta segura

function verificarRole(roleRequerido) {
  return (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      console.log("Token não fornecido");
      return res.status(403).json({ mensagem: "Token não fornecido" });
    }

    jwt.verify(token, segredo, (erro, decoded) => {
      if (erro) {
        console.log("Erro ao verificar token:", erro.message);
        return res.status(401).json({ mensagem: "Token inválido" });
      }

      console.log("Payload decodificado:", decoded);

      if (decoded.role !== roleRequerido) {
        console.log("Acesso negado: papel inválido");
        return res.status(403).json({ mensagem: "Acesso negado: somente organizações podem criar eventos." });
      }

      req.usuarioId = decoded.id; // Use o ID do usuário do token decodificado
      console.log("ID do usuário:", req.usuarioId);
      req.role = decoded.role; // Papel do usuário
      next();
    });
  };
}

module.exports = { verificarRole };