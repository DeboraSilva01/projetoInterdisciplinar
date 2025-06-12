async function carregarEventos() {
  const idusuario = localStorage.getItem("idusuario"); // ID do usuário autenticado
  console.log("ID do usuário:", idusuario);

  try {
    // Carrega os eventos
    const respostaEventos = await fetch("http://localhost:3000/eventos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!respostaEventos.ok) {
      alert("Erro ao carregar eventos. Faça login novamente.");
      window.location.href = "login.html";
      return;
    }

    const eventos = await respostaEventos.json();
    console.log("Eventos carregados:", eventos);

    // Carrega as inscrições do usuário
    const respostaInscricoes = await fetch(`http://localhost:3000/inscricoes/${idusuario}`);
    const inscricoes = await respostaInscricoes.json();

    // Verifica se são objetos ou IDs diretos
    const eventosInscritos = inscricoes.map(i => i.idevento ?? i);
    // Renderiza os eventos na página
    const container = document.getElementById("eventos-container");
    container.innerHTML = ""; // Limpa o container antes de renderizar os eventos

    eventos.forEach((evento) => {
      const eventoDiv = document.createElement("div");
      eventoDiv.classList.add("exemplo-postagem");

      // Usa a imagem do evento ou uma imagem padrão
      const imagem = evento.imagem || "/frontEnd/images/default-event.png";

      // Define o texto e o estado do botão com base no organizador e nas inscrições
      let botaoInscreverTexto = "Inscrever-se";
      let botaoInscreverDesabilitado = false;

      if (evento.idorganizacao == idusuario) {
        botaoInscreverTexto = "Seu Evento";
        botaoInscreverDesabilitado = true;
      } else if (eventosInscritos.includes(evento.idevento)) {
        botaoInscreverTexto = "Inscrito";
        botaoInscreverDesabilitado = true;
      }

      eventoDiv.innerHTML = `
        <img src="${imagem}" alt="${evento.nomeevento}" class="evento-img">
        <div class="evento-info">
          <h3 class="evento-titulo">${evento.nomeevento}</h3>
          <p class="evento-local"><strong>Local:</strong> ${evento.local}</p>
          <p class="descricao-evento"><strong>Descrição:</strong> ${evento.descricao}</p>
          <p class="descricao-evento"><strong>Equipamento:</strong> ${evento.equipamentos || 'Nenhum equipamento especificado'}</p>
          <p class="descricao-evento"><strong>Data:</strong> ${new Date(evento.data).toLocaleDateString()}</p>
          <p class="descricao-evento"><strong>Hora:</strong> ${evento.horainicial} - ${evento.horafinal}</p>
          <p class="descricao-evento"><strong>Vagas:</strong> ${evento.vagas}</p>
          <div class="evento-botoes">
            <button class="btn btn-secondary btn-lg mt-3" onclick="abrirDescricaoEvento(${evento.idevento})">Ver Detalhes</button>
            <button class="btn btn-primary btn-lg mt-3" data-id="${evento.idevento}" ${botaoInscreverDesabilitado ? "disabled" : ""}>
              ${botaoInscreverTexto}
            </button>
          </div>
        </div>
      `;

      // Permite editar apenas se for o organizador
      if (evento.idorganizacao == idusuario) {
        eventoDiv.addEventListener("dblclick", () => {
          editarEvento(evento, eventoDiv);
        });
        eventoDiv.title = "Clique duplo para editar seu evento";
        eventoDiv.style.cursor = "pointer";
      }

      // Adiciona evento de clique ao botão "Inscrever-se"
      const botaoInscrever = eventoDiv.querySelector(".btn-primary");
      botaoInscrever.addEventListener("click", () => {
        if (!botaoInscreverDesabilitado) {
          inscreverEvento(evento.idevento).then(() => {
            botaoInscrever.textContent = "Inscrito";
            botaoInscrever.disabled = true;

            // Atualiza o botão na descrição do evento, se necessário
            atualizarBotaoDescricao(evento.idevento);
          });
        }
      });

      container.appendChild(eventoDiv);
    });
  } catch (error) {
    console.error("Erro ao carregar eventos:", error);
    alert("Ocorreu um erro ao carregar os eventos. Tente novamente mais tarde.");
  }
}

// Função para atualizar o botão na descrição do evento
function atualizarBotaoDescricao(idevento) {
  const botaoDescricao = document.querySelector(`#botao-inscricao-${idevento}`);
  if (botaoDescricao) {
    botaoDescricao.textContent = "Inscrito";
    botaoDescricao.disabled = true;
  }
}

// Função para redirecionar para a página de descrição do evento
function abrirDescricaoEvento(idevento) {
  window.location.href = `descricaoEvento.html?idevento=${idevento}`;
}

// Inicializa as funções ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  carregarEventos();
});

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
      return true; // Retorna sucesso
    } else {
      alert("Erro ao realizar inscrição.");
      return false; // Retorna falha
    }
  } catch (error) {
    console.error("Erro ao realizar inscrição:", error);
    return false; // Retorna falha
  }
}

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