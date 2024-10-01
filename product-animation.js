document.addEventListener("DOMContentLoaded", function() {
    // Verifica se a largura da tela é menor ou igual a 768px
    if (window.innerWidth <= 768) {
        const productBox = document.querySelector('.product-box');
        const images = document.querySelectorAll('.product-img');
        let currentIndex = 0;
        const totalImages = images.length;

        function slideImages() {
            currentIndex = (currentIndex + 1) % totalImages;
            productBox.style.transform = `translateX(-${currentIndex * 95}%)`;
        }

        // Inicia o carrossel e define o intervalo para alternar as imagens
        setInterval(slideImages, 5000); // Alterna as imagens a cada 2 segundos
    }
});

window.onload = function() {
    window.scrollTo(0, 0);
};

