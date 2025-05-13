async function carregarRecompensas() {
  const idusuario = localStorage.getItem("idusuario"); // Obtém o ID do usuário
  console.log("ID do usuário:", idusuario);

  if (!idusuario) {
    alert("Você precisa estar logado para ver suas recompensas.");
    return;
  }

  try {
    // Faz requisição para buscar recompensas do usuário que confirmou presença
    const resposta = await fetch(`http://localhost:3000/recompensas/${idusuario}`, {
      method: "GET",
      headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
    });

    if (!resposta.ok) {
      throw new Error("Erro ao buscar recompensas.");
    }

    const recompensas = await resposta.json();
    const container = document.getElementById("recompensas-container");
    container.innerHTML = ""; // Limpa o conteúdo existente

    // Exibe recompensas no HTML
    recompensas.forEach(recompensa => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <span class="categoria">Desconto</span>
        <span class="pontos-recompensa">${recompensa.pontos} pontos</span>
        <h3>${recompensa.descricao}</h3>
        <p>${recompensa.desconto}% de desconto.</p>
        <small>Validade: ${recompensa.validade}</small>
        <button>Resgatar</button>
      `;

      container.appendChild(card);
    });

  } catch (error) {
    console.error("Erro ao carregar recompensas:", error);
    alert("Erro ao carregar recompensas.");
  }
}

// Chama a função ao carregar a página
window.onload = carregarRecompensas;
