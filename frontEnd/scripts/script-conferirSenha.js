
  function mostrarSenha() {
    const senha = document.getElementById("senha");
    const confirmar = document.getElementById("confirmar");

    const tipo = senha.type === "password" ? "text" : "password";
    senha.type = tipo;
    confirmar.type = tipo;
  }

  function validarSenhas() {
    const senha = document.getElementById("senha").value;
    const confirmar = document.getElementById("confirmar").value;
    const erro = document.getElementById("erro-senha");

    if (senha !== confirmar) {
      erro.style.display = "block";
      return false; // impede o envio do formulário
    }

    erro.style.display = "none";
    return true; // permite o envio
  }
