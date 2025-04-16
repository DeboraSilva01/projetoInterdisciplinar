

document.getElementById("form-login").addEventListener("submit", async function (event) {
  event.preventDefault(); // evita que o formulário recarregue a página

  const nome = document.getElementById("nome").value;
  console.log(nome);
  const senha = document.getElementById("senha").value;
  console.log(senha);

  try {
      const resposta = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ nome, senha }) // envia nome e senha
      }); 
  
      const dados = await resposta.json();
      console.log(dados);
  
      if (resposta.ok) {
        alert("Login realizado com sucesso!");
        window.location.href = "index.html"; // Redireciona para a página inicial
      } else {
        alert(dados.message); // exibe erro
      }
  
    } catch (erro) {
      console.error("Erro ao fazer login:", erro);
      alert("Erro ao tentar logar.");
    }
  });