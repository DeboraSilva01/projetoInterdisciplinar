document.addEventListener("DOMContentLoaded", () => {
  const botaoInscrever = document.getElementById("btn-inscrever");

  // Obtenha o ID do evento da URL (se ele estiver na query string)
  const urlParams = new URLSearchParams(window.location.search);
  const eventoId = urlParams.get("idevento"); // Certifique-se de que o ID do evento está na URL

  // Verifique o estado da inscrição no localStorage
  const inscrito = localStorage.getItem(`inscrito_evento_${eventoId}`);
  if (inscrito === "true") {
    botaoInscrever.textContent = "Inscrito!";
    botaoInscrever.classList.remove("btn-primary");
    botaoInscrever.classList.add("btn-success");
    botaoInscrever.disabled = true;
  }

  botaoInscrever.addEventListener("click", async () => {
    if (!eventoId) {
      alert("ID do evento não encontrado!");
      return;
    }

    try {
      // Envia a inscrição para o backend
      const resposta = await fetch(`http://localhost:3000/eventos/${eventoId}/inscrever`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ usuarioId: 1 }) // Substitua pelo ID do usuário autenticado
      });

      if (resposta.ok) {
        alert("Inscrição realizada com sucesso!");

        // Atualize o botão e salve o estado no localStorage
        botaoInscrever.textContent = "Inscrito!";
        botaoInscrever.classList.remove("btn-primary");
        botaoInscrever.classList.add("btn-success");
        botaoInscrever.disabled = true;

        // Salve o estado da inscrição no localStorage
        localStorage.setItem(`inscrito_evento_${eventoId}`, "true");
      } else {
        alert("Erro ao realizar inscrição.");
      }
    } catch (error) {
      console.error("Erro ao inscrever usuário:", error);
      alert("Erro ao realizar inscrição. Tente novamente mais tarde.");
    }
  });
});