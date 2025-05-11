
const form = document.getElementById("form-evento");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const novoEvento = {
    nomeevento: document.getElementById("titulo").value,
    local: document.getElementById("local").value,
    data: document.getElementById("data").value,
    equipamentos: document.getElementById("equipamentos").value,
    horainicial: document.getElementById("horaInicial").value,
    horafinal: document.getElementById("horaFinal").value,
    vagas: document.getElementById("vagas").value,
    descricao: document.getElementById("descricao").value,
    qr_code: null, // O QR Code será gerado no backend
    imagem: document.getElementById("imagem").value // O caminho da imagem pode ser enviado, se necessário
  };
  console.log("Dados do evento enviados:", novoEvento);

  try {
    const resposta = await fetch("http://localhost:3000/criarEventos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(novoEvento)
    });

    if (resposta.status === 201) {
      const dados = await resposta.json(); // Lê a resposta como JSON
      console.log("Resposta do backend:", dados);
      alert("Evento criado com sucesso: " + dados.mensagem);
      window.location.href = "index.html"; // Redireciona para a página inicial
    } else {
      const erro = await resposta.json(); // Lê o erro como JSON
      console.error("Erro na resposta do backend:", erro);
      alert("Erro ao criar evento: " + (erro.mensagem || "Erro desconhecido"));
    }
  } 
  catch (error) {
    console.error("Erro ao criar evento:", error);
    alert("Erro ao criar evento. Tente novamente mais tarde.");
  }
});
