const form = document.getElementById("form-evento");


form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const token = localStorage.getItem("token");
  console.log("Token:", token);
  if (!token) {
    alert("Você precisa estar logado para criar um evento.");
    return;
  }

  // Criar evento
  const novoEvento = {
    nomeevento: document.getElementById("titulo").value,
    local: document.getElementById("local").value,
    data: document.getElementById("data").value,
    equipamentos: document.getElementById("equipamentos").value,
    horainicial: document.getElementById("horaInicial").value,
    horafinal: document.getElementById("horaFinal").value,
    vagas: document.getElementById("vagas").value,
    descricao: document.getElementById("descricao").value,
    imagem: document.getElementById("imagem").value,
  };

  try {
    // Criar evento primeiro
    const respostaEvento = await fetch("http://localhost:3000/criarEventos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(novoEvento)
    });

    if (respostaEvento.status !== 201) {
      const erro = await respostaEvento.json();
      throw new Error(erro.mensagem || "Erro ao criar evento");
    }

    const dadosEvento = await respostaEvento.json();
    console.log("Dados do evento recebido:", dadosEvento);

    // Pegando corretamente o ID do evento
    const idevento = dadosEvento.evento?.idevento || dadosEvento.idevento;
    if (!idevento) {
      throw new Error("O ID do evento não foi encontrado.");
    }

    console.log("ID do evento:", idevento);

    // Criar a recompensa associada ao evento
    const novaRecompensa = {
      idevento: idevento,
      descricao: document.getElementById("descricaoRecompensa").value,
      desconto: document.getElementById("desconto").value,
      validade: document.getElementById("validade").value
    };

    console.log("Dados da recompensa:", novaRecompensa);

    const respostaRecompensa = await fetch("http://localhost:3000/criarRecompensa", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(novaRecompensa)
    });

    if (respostaRecompensa.status !== 201) {
      const erro = await respostaRecompensa.json();
      throw new Error(erro.mensagem || "Erro ao criar recompensa");
    }

    alert("Evento e recompensa criados com sucesso!");
    window.location.href = "index.html";

  } catch (error) {
    console.error("Erro:", error);
    alert("Erro: " + error.message);
  }
});
