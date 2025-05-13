let html5QrCode;

function abrirModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "flex";

  setTimeout(() => {
    const qrCodeDiv = document.getElementById("reader");
    html5QrCode = new Html5Qrcode("reader");

    Html5Qrcode.getCameras().then(devices => {
      if (devices.length) {
        html5QrCode.start(
          devices[0].id,
          { fps: 10, qrbox: 250 },
          onScanSuccess,
          error => {
           () => {}  // Ignora os erros silenciosamente

          }
        );
      }
    });
  }, 300);
}

function fecharModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "none";

  if (html5QrCode) {
    html5QrCode.stop()
      .then(() => html5QrCode.clear())
      .catch(err => console.warn("Erro ao parar leitor:", err));
  }
}

async function onScanSuccess(decodedText) {
  try {

    // Parar o leitor imediatamente após a leitura
    await html5QrCode.stop();
    await html5QrCode.clear();

    const dados = JSON.parse(decodedText);
    const token = dados.token;
    const idusuario = localStorage.getItem("idusuario");

    if (!token || !idusuario) {
      alert("QR Code inválido ou usuário não autenticado.");
      return;
    }

    const resposta = await fetch("http://localhost:3000/validar-presenca", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ qrCode: token, idusuario }),
    });

    if (resposta.ok) {
      const resultado = await resposta.json();
      alert(`✅ ${resultado.mensagem}`);
    } else {
      const erro = await resposta.json();
      alert(`❌ ${erro.mensagem}`);
    }

    fecharModal();
  } catch (err) {
    console.error("Erro ao processar QR Code:", err);
    alert("QR Code inválido.");
  }
}

window.abrirModal = abrirModal;
window.fecharModal = fecharModal;