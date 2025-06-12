async function carregarHeader() {
  try {
    const resposta = await fetch("/frontEnd/components/header.html");
    if (!resposta.ok) {
      throw new Error("Erro ao carregar o cabeçalho.");
    }
    const headerHTML = await resposta.text();
    document.getElementById("header").innerHTML = headerHTML;

        // Carrega o CSS do footer
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/frontEnd/style/header.css"; // Caminho para seu CSS
    document.head.appendChild(link);

    // Verifica o papel do usuário após carregar o header
    const role = localStorage.getItem("role");

    // Oculta o item "Evento" se não for organizacao
    if (role !== "org") {
      const menuEvento = document.getElementById("menu-evento");
      const ocutarCriarEvento = document.getElementById("CreateEvent");
      if (menuEvento || ocutarCriarEvento) {
        menuEvento.style.display = "none";
        ocutarCriarEvento.style.display = "none";
      }
    }

  } catch (error) {
    console.error("Erro ao carregar o cabeçalho:", error);
  }
}



document.addEventListener("DOMContentLoaded", carregarHeader);