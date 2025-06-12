async function carregarDescricaoEvento() {
  const idusuario = localStorage.getItem("idusuario");
  const params = new URLSearchParams(window.location.search);
  const idevento = params.get("idevento");

  try {
    // Carrega os detalhes do evento
    const respostaEvento = await fetch(`http://localhost:3000/eventos/${idevento}`);
    if (!respostaEvento.ok) throw new Error("Erro ao carregar os detalhes do evento.");
    const evento = await respostaEvento.json();

    // Preenche os dados na tela
    document.querySelector(".evento-titulo").textContent = evento.nomeevento;
    document.querySelector(".descricao-evento").textContent = `Descrição: ${evento.descricao}`;
    document.querySelector(".equipamentos-evento").textContent = `Equipamentos: ${evento.equipamentos || 'Nenhum equipamento especificado'}`;
    document.querySelector(".data-evento").textContent = `Data: ${new Date(evento.data).toLocaleDateString()}`;
    document.querySelector(".hora-evento").textContent = `Hora: ${evento.horainicial} - ${evento.horafinal}`;
    document.querySelector(".local-evento").textContent = `Local: ${evento.local}`;
    document.querySelector(".vagas-evento").textContent = `Vagas: ${evento.vagas}`;

    const botaoInscricao = document.getElementById("botao-inscricao");
    const qrCodeContainer = document.getElementById("qrCodeContainer");

    if (evento.idorganizacao == idusuario) {
      // Organizador: mostra QRCode e botão de download
      const qrCodePath = evento.qrCodePath || `/frontEnd/images/qrcodes/${evento.qr_code}.png`;
      qrCodeContainer.innerHTML = `
    <a href="${qrCodePath}" download="qrcode-evento-${evento.idevento}.png" class="btn btn-success mt-2 mb-3">
      Baixar QR Code
    </a>
  `;

      botaoInscricao.innerHTML = ""; // Não mostra botão de inscrição para organizador
    } else {
      // Participante: mostra botão de inscrição ou inscrito
      const respostaInscricoes = await fetch(`http://localhost:3000/inscricoes/${idusuario}`);
      const inscricoes = await respostaInscricoes.json();
      const eventosInscritos = inscricoes.map(i => i.idevento ?? i);
      const inscrito = eventosInscritos.includes(parseInt(idevento));
      botaoInscricao.innerHTML = inscrito
        ? `<button class="btn btn-success btn-lg mt-3" disabled>Inscrito</button>`
        : `<button class="btn btn-primary btn-lg mt-3" onclick="inscreverEvento(${idevento})">Inscrever-se</button>`;
      qrCodeContainer.innerHTML = ""; // Não mostra QRCode para não organizador
    }
  } catch (error) {
    console.error("Erro ao carregar a descrição do evento:", error);
  }
}

async function inscreverEvento(idevento) {
  const idusuario = localStorage.getItem("idusuario");
  try {
    const resposta = await fetch(`http://localhost:3000/eventos/${idevento}/inscrever`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idusuario }),
    });
    if (resposta.ok) {
      alert("Inscrição realizada com sucesso!");
      window.location.reload();
    } else {
      alert("Erro ao realizar inscrição.");
    }
  } catch (error) {
    console.error("Erro ao realizar inscrição:", error);
  }
}

document.addEventListener("DOMContentLoaded", carregarDescricaoEvento);