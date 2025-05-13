document.getElementById("form-cadastro").addEventListener("submit", async function (event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value;
  const cpf = document.getElementById("CPF").value;
  const contato = document.getElementById("Telefone").value;
  const endereco = document.getElementById("endereco").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const confirmarSenha = document.getElementById("confirmar").value;

  if (senha !== confirmarSenha) {
    document.getElementById("erro-senha").style.display = "block";
    return;
  }

  try {
    const resposta = await fetch("http://localhost:3000/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome, cpf, contato, endereco, email, senha }),
    });

    if (resposta.ok) {
      alert("Cadastro realizado com sucesso!");
      window.location.href = "telaLogin.html"; // Redireciona para a tela de login
    } else {
      const erro = await resposta.json();
      alert(`Erro ao cadastrar: ${erro.mensagem}`);
    }
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    alert("Erro ao cadastrar usuário. Tente novamente mais tarde.");
  }
});