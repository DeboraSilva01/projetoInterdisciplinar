async function carregarDescricaoEvento() {
  const idusuario = localStorage.getItem("idusuario"); // ID do usuário autenticado
  const params = new URLSearchParams(window.location.search);
  const idevento = params.get("idevento"); // Obtém o ID do evento da URL

  try {
    // Carrega os detalhes do evento
    const respostaEvento = await fetch(`http://localhost:3000/eventos/${idevento}`);
    if (!respostaEvento.ok) {
      throw new Error("Erro ao carregar os detalhes do evento.");
    }
    const evento = await respostaEvento.json();

    // Atualiza os detalhes do evento na página
    document.querySelector(".evento-titulo").textContent = evento.nomeevento;
    document.querySelector(".descricao-evento").textContent = `Descrição: ${evento.descricao}`;
    document.querySelector(".equipamentos-evento").textContent = `Equipamentos: ${evento.equipamentos || 'Nenhum equipamento especificado'}`;
    document.querySelector(".data-evento").textContent = `Data: ${new Date(evento.data).toLocaleDateString()}`;
    document.querySelector(".hora-evento").textContent = `Hora: ${evento.horainicial} - ${evento.horafinal}`;
    document.querySelector(".local-evento").textContent = `Local: ${evento.local}`;
    document.querySelector(".vagas-evento").textContent = `Vagas: ${evento.vagas}`;

    // Atualiza o botão de inscrição
    const botaoInscricao = document.getElementById("botao-inscricao");

    if (evento.idorganizacao == idusuario) {
      // Se o usuário for o organizador, exibe o QR Code
      const qrCodeContainer = document.getElementById("qrCodeContainer");
      const qrCodePath = evento.qrCodePath || `/frontEnd/images/qrcodes/${evento.qr_code}.png`;

      qrCodeContainer.innerHTML = `
        <h3>QR Code do Evento</h3>
        <img src="${qrCodePath}" alt="QR Code do Evento" class="qr-code-img">
      `;

      // Remove o botão de inscrição
      botaoInscricao.innerHTML = ""; 
    } else {
      // Verifica se o usuário já está inscrito no evento
      const respostaInscricoes = await fetch(`http://localhost:3000/inscricoes/${idusuario}`);
      if (!respostaInscricoes.ok) {
        throw new Error("Erro ao carregar inscrições.");
      }
      const eventosInscritos = await respostaInscricoes.json();
      const inscrito = eventosInscritos.includes(parseInt(idevento));

      botaoInscricao.innerHTML = inscrito
        ? `<button class="btn btn-success btn-lg mt-3" disabled>Inscrito</button>`
        : `<button class="btn btn-primary btn-lg mt-3" onclick="inscreverEvento(${idevento})">Inscrever-se</button>`;
    }
  } catch (error) {
    console.error("Erro ao carregar a descrição do evento:", error);
  }
}

// Função para inscrever-se no evento
async function inscreverEvento(idevento) {
  const idusuario = localStorage.getItem("idusuario");

  try {
    const resposta = await fetch(`http://localhost:3000/eventos/${idevento}/inscrever`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idusuario }),
    });

    if (resposta.ok) {
      alert("Inscrição realizada com sucesso!");
      window.location.reload(); // Recarrega a página para atualizar o status
    } else {
      alert("Erro ao realizar inscrição.");
    }
  } catch (error) {
    console.error("Erro ao realizar inscrição:", error);
  }
}

// Inicializa a função ao carregar a página
document.addEventListener("DOMContentLoaded", carregarDescricaoEvento);