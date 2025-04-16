
const form = document.getElementById("form-evento");

form.addEventListener("submit", async (event) => {
  event.preventDefault();


  // Captura os dados do formulário
  const novoEvento = {
    nomeevento: document.getElementById("titulo").value,
    local: document.getElementById("local").value,
    data: document.getElementById("data").value,
    equipamentos: document.getElementById("equipamentos").value,
    horainicial: document.getElementById("horaInicial").value,
    horafinal: document.getElementById("horaFinal").value,
    //imagem: document.getElementById("imagem").value,
    vagas: document.getElementById("vagas").value,
    descricao: document.getElementById("descricao").value
  }; 
  console.log(novoEvento);

  try {
    // Envia os dados para o backend
    const resposta = await fetch("http://localhost:3000/criarEventos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(novoEvento)
    });

    if (resposta.ok) {
      alert("Evento criado com sucesso!");
      window.location.href = "index.html"; // Redireciona para a página inicial
    } else {
      alert("Erro ao criar evento!");
    }
  } catch (error) {
    console.error("Erro ao criar evento:", error);
    alert("Erro ao criar evento!");
  }
});