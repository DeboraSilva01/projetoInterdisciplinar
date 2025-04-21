document.addEventListener("DOMContentLoaded", () => {
  const botaoInscrever = document.getElementById("btn-inscrever");

  const urlParams = new URLSearchParams(window.location.search);
  const idevento = urlParams.get("idevento");


  // Verifica se o usuário já está inscrito via localStorage
  if (localStorage.getItem(`inscrito_evento_${idevento}`) === "true") {
    botaoInscrever.textContent = "Inscrito!";
    botaoInscrever.classList.remove("btn-primary");
    botaoInscrever.classList.add("btn-success");
    botaoInscrever.disabled = true;
  }

  botaoInscrever.addEventListener("click", async () => {
    if (!idevento) {
      alert("ID do evento não encontrado!");
      return;
    }

    const idusuario = 2; // <-- Substituir com o ID real do usuário logado
    if (!idusuario) {
      alert("ID do usuário não encontrado.");
      return;
    }

    try {
      const resposta = await fetch(`http://localhost:3000/eventos/${idevento}/inscrever`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ idusuario: 2 }),
      });
    
      const dados = await resposta.json();
    
      if (resposta.ok) {
        // Sucesso
        alert("Inscrição realizada com sucesso!");
    
        botaoInscrever.textContent = "Inscrito!";
        botaoInscrever.classList.remove("btn-primary");
        botaoInscrever.classList.add("btn-success");
        botaoInscrever.disabled = true;
    
        localStorage.setItem(`inscrito_evento_${idevento}`, "true");
      } else {
        // Caso o backend retorne erro, mas com mensagem útil
        if (dados.mensagem === "Usuário já inscrito no evento.") {
          alert("Você já está inscrito neste evento!");
        } else {
          alert("Erro ao realizar inscrição: " + dados.mensagem);
        }
      }
    } catch (error) {
      console.error("Erro ao inscrever usuário:", error);
      alert("Erro ao realizar inscrição. Tente novamente mais tarde.");
    }
    
  });
});
