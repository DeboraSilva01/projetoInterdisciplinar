document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const qrCodePath = params.get("qrCodePath");
    const nomeEvento = params.get("nomeEvento");
  
    // Atualiza a imagem do QR Code
    const qrCodeImage = document.getElementById("qrCodeImage");
    if (qrCodePath) {
      qrCodeImage.src = qrCodePath;
      qrCodeImage.alt = `QR Code do Evento ${nomeEvento}`;
    } else {
      qrCodeImage.alt = "QR Code não disponível";
    }
  
    // Atualiza o nome do evento
    const eventoNome = document.getElementById("eventoNome");
    eventoNome.textContent = nomeEvento ? `Evento: ${nomeEvento}` : "Evento não especificado.";
  
    // Adiciona funcionalidade para validar presença
    const validarButton = document.createElement("button");
    validarButton.textContent = "Validar Presença";
    validarButton.className = "btn btn-primary btn-lg mt-3";
    validarButton.onclick = async () => {
      const idusuario = localStorage.getItem("idusuario");
      if (!idusuario) {
        alert("Usuário não autenticado.");
        return;
      }
  
      const token = qrCodePath.split("/").pop().replace(".png", ""); // Extrai o token do caminho do QR Code
      try {
        const resposta = await fetch("http://localhost:3000/validar-presenca", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ qrCode: token, idusuario }),
          });
  
        if (resposta.ok) {
          const resultado = await resposta.json();
          alert(`Presença validada com sucesso para: ${resultado.nome}`);
        } else {
          const erro = await resposta.json();
          alert(`Erro: ${erro.mensagem}`);
        }
      } catch (error) {
        console.error("Erro ao validar presença:", error);
        alert("Erro ao validar presença. Tente novamente.");
      }
    };
  
 
  });