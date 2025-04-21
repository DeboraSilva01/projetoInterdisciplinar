
  function mostrarSenha() {
    const senha = document.getElementById("senha");
    const confirmar = document.getElementById("confirmar");

    const tipo = senha.type === "password" ? "text" : "password";
    senha.type = tipo;
    confirmar.type = tipo;
  }
