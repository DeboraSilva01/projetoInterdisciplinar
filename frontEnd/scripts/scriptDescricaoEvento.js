// Captura o ID do evento da URL
const params = new URLSearchParams(window.location.search);
const eventoId = params.get("idevento");
console.log("ID do evento:", eventoId);

// Função para carregar os detalhes do evento
async function carregarDetalhesEvento() {
  try {
    const resposta = await fetch(`http://localhost:3000/eventos/${eventoId}`);
    const evento = await resposta.json(); // Recebe um único objeto
    console.log(evento);

    // Verifica se o objeto contém dados
    if (evento) {
      // Atualiza os elementos da página com os detalhes do evento
      document.querySelector(".evento-titulo").textContent = evento.nomeevento;
      document.querySelector(".descricao-evento").textContent = evento.descricao;
      document.querySelector(".equipamentos-evento").textContent = `Equipamentos Necessários: ${evento.equipamentos}`;
      document.querySelector(".data-evento").textContent = `Data: ${new Date(evento.data).toLocaleDateString()}`;
      document.querySelector(".hora-evento").textContent = `Hora: ${evento.horainicial} - ${evento.horafinal}`;
      document.querySelector(".local-evento").textContent = `Local: ${evento.local}`;
      document.querySelector(".vagas-evento").textContent = `Número de voluntários necessários: ${evento.vagas}`;
    } else {
      console.error("Evento não encontrado.");
      alert("Evento não encontrado.");
    }
  } catch (error) {
    console.error("Erro ao carregar os detalhes do evento:", error);
  }
}

// Chama a função ao carregar a página
document.addEventListener("DOMContentLoaded", carregarDetalhesEvento);

