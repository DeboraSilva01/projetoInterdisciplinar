async function validarPresenca(qrCodeMessage) {
  try {
    // O QR Code contém um JSON, então precisamos parsear o conteúdo
    const qrCodeData = JSON.parse(qrCodeMessage); // Converte o texto do QR Code para um objeto JSON
    const token = qrCodeData.token; // Extrai o token do QR Code

    // Recupera o ID do usuário do localStorage
    const idusuario = localStorage.getItem("idusuario");
    if (!idusuario) {
      document.getElementById("resultado").textContent = "Erro: Usuário não autenticado.";
      return;
    }

    // Envia o token e o ID do usuário para o backend
    const resposta = await fetch("http://localhost:3000/validar-presenca", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ qrCode: token, idusuario }), // Envia o token e o ID do usuário
    });

    if (resposta.ok) {
      const resultado = await resposta.json();
      document.getElementById("resultado").textContent = `Presença validada com sucesso para: ${resultado.nomeevento}`;
    } else {
      const erro = await resposta.json();
      document.getElementById("resultado").textContent = `Erro: ${erro.mensagem}`;
    }
  } catch (error) {
    console.error("Erro ao validar presença:", error);
    document.getElementById("resultado").textContent = "Erro ao validar presença. Tente novamente.";
  }
}


// Inicializa o leitor de QR Code
function iniciarLeitorQrCode() {
  const html5QrCode = new Html5Qrcode("reader");

  html5QrCode.start(
    { facingMode: "environment" }, // Usa a câmera traseira
    {
      fps: 10, // Frames por segundo
      qrbox: { width: 250, height: 250 }, // Tamanho da área de leitura
    },
    (decodedText) => {
      console.log("QR Code detectado:", decodedText);
      html5QrCode.stop(); // Para o leitor após a leitura
      validarPresenca(decodedText); // Chama a função para validar a presença
    },
    (errorMessage) => {
      console.warn("Erro na leitura do QR Code:", errorMessage);
    }
  ).catch((err) => {
    console.error("Erro ao iniciar o leitor de QR Code:", err);
    document.getElementById("resultado").textContent = "Erro ao iniciar o leitor de QR Code.";
  });
}




// Inicializa o leitor ao carregar a página
document.addEventListener("DOMContentLoaded", iniciarLeitorQrCode);