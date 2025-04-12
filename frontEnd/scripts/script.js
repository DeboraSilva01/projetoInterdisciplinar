// Variáveis
let currentIndex = 0; // Índice do item atual
const items = document.querySelectorAll('.carrossel-item'); // Todos os itens do carrossel
const totalItems = items.length; // Total de itens
const nextButton = document.querySelector('.next'); // Botão próximo
const prevButton = document.querySelector('.prev'); // Botão anterior
const carouselItemsContainer = document.querySelector('.carrossel-itens');

// Função para mostrar o item atual
function showItem(index) {
    if (index >= totalItems) {
        currentIndex = 0; // Volta para o primeiro item
    } else if (index < 0) {
        currentIndex = totalItems - 1; // Vai para o último item
    }
    const offset = -currentIndex * 100; // Calcula o deslocamento com base no índice
    carouselItemsContainer.style.transform = `translateX(${offset}%)`; // Aplica o deslocamento
}

// Função para passar para o próximo item
nextButton.addEventListener('click', function() {
    currentIndex++;
    showItem(currentIndex);
});

// Função para voltar para o item anterior
prevButton.addEventListener('click', function() {
    currentIndex--;
    showItem(currentIndex);
});

// Inicia com o primeiro item
showItem(currentIndex);
