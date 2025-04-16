
// Função para carregar eventos do backend e exibi-los no frontend
async function carregarEventos() {
  try {
    // Faz uma requisição para a API do backend
    const resposta = await fetch("http://localhost:3000/eventos"); // Substitua pela URL correta do backend
    const eventos = await resposta.json(); // Converte a resposta para JSON

    // Seleciona o contêiner onde os eventos serão exibidos
    const container = document.getElementById("eventos-container");

    // Itera sobre os eventos e cria elementos HTML para exibi-los
    eventos.forEach(evento => {
      const eventoDiv = document.createElement("div");
      eventoDiv.classList.add("exemplo-postagem");
      console.log(evento)
    
      eventoDiv.innerHTML = `
        <img src="${evento.imagem || '/frontEnd/images/default-event.png'}" alt="${evento.nomeevento}" class="evento-img">
        <div class="evento-info">
          <h3 class="evento-titulo">${evento.nomeevento}</h3>
          <p class="evento-local"><strong>Local:</strong> ${evento.local}</p>
          <p class="descricao-evento"><strong>Descrição:</strong> ${evento.descricao}</p>
          <p class="descricao-evento"><strong>Equipamento:</strong> ${evento.equipamentos || 'Nenhum equipamento especificado'}</p>
          <p class="descricao-evento"><strong>Data:</strong> ${new Date(evento.data).toLocaleDateString()}</p>
          <p class="descricao-evento"><strong>Hora:</strong> ${evento.horainicial} - ${evento.horafinal}</p>
          <p class="descricao-evento"><strong>Vagas:</strong> ${evento.vagas}</p>
          <a href="/frontEnd/pages/descricaoEvento.html?idevento=${evento.idevento}" class="btn btn-primary btn-lg mt-3">Ver Detalhes</a>
        </div>
      `;
    
      // Adiciona o evento de duplo clique para editar o evento
      eventoDiv.addEventListener("dblclick", () => {
        editarEvento(evento, eventoDiv);
      });
    
      container.appendChild(eventoDiv);
    });
  } catch (error) {
    console.error("Erro ao carregar eventos:", error);
  }
}


// Inicializa as funções ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  carregarEventos();
});



function editarEvento(evento, eventoDiv) {
  // Armazena o conteúdo original do card diretamente no atributo dataset
  eventoDiv.dataset.conteudoOriginal = eventoDiv.innerHTML;

  // Substitui o conteúdo do card por inputs editáveis
  eventoDiv.innerHTML = `
    <div class="evento-info evento-edicao">
      <input type="text" id="titulo-${evento.idevento}" value="${evento.nomeevento}" class="form-control mb-2" />
      <input type="text" id="local-${evento.idevento}" value="${evento.local}" class="form-control mb-2" />
      <textarea id="descricao-${evento.idevento}" class="form-control mb-2">${evento.descricao}</textarea>
      <input type="text" id="equipamentos-${evento.idevento}" value="${evento.equipamentos || ''}" class="form-control mb-2" placeholder="Equipamentos necessários" />
      <input type="date" id="data-${evento.idevento}" value="${evento.data.split("T")[0]}" class="form-control mb-2" />
      <input type="time" id="horaInicial-${evento.idevento}" value="${evento.horainicial}" class="form-control mb-2" />
      <input type="time" id="horaFinal-${evento.idevento}" value="${evento.horafinal}" class="form-control mb-2" />
      <input type="number" id="vagas-${evento.idevento}" value="${evento.vagas}" class="form-control mb-2" />
      <button class="btn btn-success btn-sm" onclick="salvarAlteracoes(${evento.idevento})">Salvar</button>
      <button class="btn btn-danger btn-sm" onclick="cancelarEdicao(this)">Cancelar</button>
    </div>
  `;
}

function cancelarEdicao(botao) {
  // Encontra o elemento do card (eventoDiv) a partir do botão
  const eventoDiv = botao.closest(".exemplo-postagem");

  // Verifica se o conteúdo original foi armazenado
  if (eventoDiv.dataset.conteudoOriginal) {
    // Restaura o conteúdo original do card
    eventoDiv.innerHTML = eventoDiv.dataset.conteudoOriginal;
  } else {
    console.error("Conteúdo original não encontrado.");
  }
}

async function salvarAlteracoes(eventoId) {
  const titulo = document.getElementById(`titulo-${eventoId}`).value;
  const local = document.getElementById(`local-${eventoId}`).value;
  const descricao = document.getElementById(`descricao-${eventoId}`).value;
  const equipamentos = document.getElementById(`equipamentos-${eventoId}`).value;
  const data = document.getElementById(`data-${eventoId}`).value;
  const horaInicial = document.getElementById(`horaInicial-${eventoId}`).value;
  const horaFinal = document.getElementById(`horaFinal-${eventoId}`).value;
  const vagas = document.getElementById(`vagas-${eventoId}`).value;

  const eventoAtualizado = {
    nomeevento: titulo,
    local,
    descricao,
    equipamentos,
    data,
    horainicial: horaInicial,
    horafinal: horaFinal,
    vagas
  };

  try {
    const resposta = await fetch(`http://localhost:3000/eventos/${eventoId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(eventoAtualizado)
    });

    if (resposta.ok) {
      alert("Evento atualizado com sucesso!");
      window.location.reload(); // Recarrega a página para exibir os dados atualizados
    } else {
      alert("Erro ao atualizar o evento.");
    }
  } catch (error) {
    console.error("Erro ao atualizar o evento:", error);
  }
}
