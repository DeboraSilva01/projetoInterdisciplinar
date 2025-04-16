

// Captura o ID do evento da URL
const params = new URLSearchParams(window.location.search);
const eventoId = params.get("idevento");
console.log("ID do evento:", eventoId);

// Função para carregar os detalhes do evento
async function carregarDetalhesEvento() {
  try {
    const resposta = await fetch(`http://localhost:3000/eventos/${eventoId}`);
    const eventos = await resposta.json(); // Recebe um array
    console.log(eventos);

    // Verifica se o array contém dados
    if (eventos.length > 0) {
      const evento = eventos[0]; // Acessa o primeiro elemento do array

      // Atualiza os elementos da página com os detalhes do evento
      document.querySelector(".evento-titulo").textContent = evento.nomeevento;
      document.querySelector(".descricao-evento").textContent = evento.descricao;
      document.querySelector(".equipamentos-evento").textContent =`Equipamentos Necessários: ${evento.equipamentos}`;
      document.querySelector(".data-evento").textContent = `Data: ${new Date(evento.data).toLocaleDateString()}`;
      document.querySelector(".hora-evento").textContent = `Hora: ${evento.horainicial} - ${evento.horafinal}`;
      document.querySelector(".local-evento").textContent = `Local: ${evento.local}`;
      document.querySelector(".vagas-evento").textContent = `Número de voluntários necessários: ${evento.vagas}`;
    } else {
      console.error("Nenhum evento encontrado.");
      alert("Evento não encontrado.");
    }
  } catch (error) {
    console.error("Erro ao carregar os detalhes do evento:", error);
  }
}

// Chama a função ao carregar a página
document.addEventListener("DOMContentLoaded", carregarDetalhesEvento);