document.getElementById("form-login").addEventListener("submit", async (event) => {
  event.preventDefault();

  const nome = document.getElementById("nome").value;
  const senha = document.getElementById("senha").value;

  try {
    const resposta = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, senha }),
    });

    if (resposta.ok) {
      const dados = await resposta.json();

      // Armazena o token e o idusuario no localStorage
      localStorage.setItem("token", dados.token);
      localStorage.setItem("idusuario", dados.idusuario);
        localStorage.setItem("role", dados.role); // <-- ADICIONE AQUI

      alert("Login realizado com sucesso!");
      window.location.href = "index.html"; // Redireciona para a página inicial
    } else {
      const erro = await resposta.json();
      alert(erro.message || "Erro ao realizar login.");
    }
  } catch (error) {
    console.error("Erro ao realizar login:", error);
    alert("Erro ao realizar login. Tente novamente mais tarde.");
  }
});