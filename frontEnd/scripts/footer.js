async function carregarFooter() {
  try {
    const resposta = await fetch("/frontEnd/components/footer.html");
    if (!resposta.ok) {
      throw new Error("Erro ao carregar o rodapé.");
    }
    const footerHTML = await resposta.text();
    document.querySelector("footer").innerHTML = footerHTML;

    // Carrega o CSS do footer
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/frontEnd/style/footer.css"; // Caminho para seu CSS
    document.head.appendChild(link);

  } catch (error) {
    console.error("Erro ao carregar o rodapé:", error);
  }
}

document.addEventListener("DOMContentLoaded", carregarFooter);