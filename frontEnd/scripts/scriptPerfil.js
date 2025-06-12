document.addEventListener("DOMContentLoaded", async () => {
  const idusuario = localStorage.getItem("idusuario");
  if (!idusuario) return;
    console.log("ID do usuário:", idusuario);

    try {
    const resposta = await fetch(`http://localhost:3000/usuarios/${idusuario}`);
    if (!resposta.ok) throw new Error("Erro ao buscar dados do usuário");

    const usuario = await resposta.json();

    // Preenche no HTML
    document.querySelector(".profile-info h1").textContent = usuario.nome;
    document.querySelector(".profile-info .email").textContent = usuario.email;

  } catch (error) {
    console.error("Erro ao carregar dados do usuário:", error);
  }


  try {
    const inscricaoRes = await fetch(`http://localhost:3000/inscricoes/${idusuario}`);
    const inscricoes = await inscricaoRes.json();

    // ✅ Filtrar somente inscrições com status "Confirmado"
    const inscricoesConfirmadas = inscricoes.filter(inscricao => inscricao.status === "Confirmado");
    console.log("Inscrições recebidas:", inscricoes);


    const contador = document.getElementById("eventos-participados-count");
    contador.textContent = `${inscricoesConfirmadas.length} eventos participados`;

    if (inscricoesConfirmadas.length > 0) {
      const listaEventosDiv = document.getElementById("eventos-participados-lista");
      listaEventosDiv.innerHTML = "";

      for (const inscricao of inscricoesConfirmadas) {
        const eventoRes = await fetch(`http://localhost:3000/eventos/${inscricao.idevento}`);
        const evento = await eventoRes.json();

        const card = criarCardEvento(evento);
        listaEventosDiv.appendChild(card);
      }
    }

  } catch (err) {
    console.error("Erro ao carregar eventos participados:", err);
  }
});

function criarCardEvento(evento) {
  const div = document.createElement("div");
  div.className = "evento-card";

  div.innerHTML = `
    <div class="evento-img-container">
      <img src="${evento.imagem || 'https://via.placeholder.com/150'}" alt="${evento.nomeevento}" class="evento-img" />
    </div>
    <div class="evento-info">
      <h3 class="evento-titulo">${evento.nomeevento}</h3>
      <p class="evento-detalhes">${new Date(evento.data).toLocaleDateString()} às ${evento.horainicial}</p>
      <p class="evento-detalhes">${evento.local}</p>
    </div>
  `;

  return div;
}
