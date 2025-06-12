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

    const container = document.getElementById("recompensas-container");

    if (!resposta.ok) {
      if (resposta.status === 404) {
        // Não há recompensas para o usuário
        container.innerHTML = `<p class="text-center mt-4">Você ainda não possui recompensas. Participe de eventos para ganhar!</p>`;
        return;
      }
      throw new Error("Erro ao buscar recompensas.");
    }

    const recompensas = await resposta.json();
    container.innerHTML = ""; // Limpa o conteúdo existente

    if (recompensas.length === 0) {
      container.innerHTML = `<p class="text-center mt-4">Você ainda não possui recompensas. Participe de eventos para ganhar!</p>`;
      return;
    }

    // Exibe recompensas no HTML
    recompensas.forEach(recompensa => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <span class="categoria">Recompensa</span>
        <h3>${recompensa.descricao}</h3>
        <p>${recompensa.desconto}.</p>
        <small>Validade: ${recompensa.validade}</small>
        <button>Resgatar</button>
      `;

      container.appendChild(card);
    });

  } catch (error) {
    console.error("Erro ao carregar recompensas:", error);
    document.getElementById("recompensas-container").innerHTML = `<p class="text-center mt-4 text-danger">Erro ao carregar recompensas.</p>`;
  }
}

// Chama a função ao carregar a página
window.onload = carregarRecompensas;