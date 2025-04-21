document.getElementById("form-login").addEventListener("submit", async function (event) {
  event.preventDefault();
  const token = localStorage.getItem('token');


  // Captura os valores dos campos de entrada
  const nome = document.getElementById("nome").value;
  const senha = document.getElementById("senha").value;
  

  try {
    const resposta = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome, senha }),
    });

    if (resposta.ok) {
      const dados = await resposta.json();
      alert("Login realizado com sucesso!");
      console.log("Usuário logado:", dados.usuario);
      // Redirecionar para outra página, se necessário
      window.location.href = "index.html";
      localStorage.setItem("idusuario", usuario.id); // Armazena o ID do usuário no localStorage
    } else {
      document.getElementById("erro-login").style.display = "block";
    }
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    alert("Erro ao fazer login. Tente novamente mais tarde.");
  }
});