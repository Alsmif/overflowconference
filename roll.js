document.addEventListener("DOMContentLoaded", function() {
    const rows = document.querySelectorAll('.gallery-row');

    // Criar a sobreposição e adicioná-la ao body
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.innerHTML = '<span class="close-btn">&times;</span><img src="" alt="Imagem em destaque">';
    document.body.appendChild(overlay);

    const overlayImage = overlay.querySelector('img');
    const closeButton = overlay.querySelector('.close-btn');

    rows.forEach((row, index) => {
        const rowWidth = row.scrollWidth;
        let scrollSpeed = (index === 1) ? -1 : 1;
        let isMouseDown = false;
        let startX;
        let scrollLeft;
        let scrollPos = 0;

        // Clonar as imagens para criar um loop contínuo
        const rowContent = row.innerHTML;
        row.innerHTML += rowContent + rowContent;

        function scroll() {
            if (!isMouseDown) {
                scrollPos += scrollSpeed;
                row.style.transform = `translateX(-${scrollPos}px)`;

                if (scrollPos >= rowWidth) {
                    scrollPos = 0;
                } else if (scrollPos <= 0) {
                    scrollPos = rowWidth;
                }
            }
            requestAnimationFrame(scroll);
        }

        row.addEventListener('mousedown', (e) => {
            isMouseDown = true;
            startX = e.pageX - row.offsetLeft;
            scrollLeft = scrollPos;
            row.style.cursor = 'grabbing';
            scrollSpeed = 0;
        });

        row.addEventListener('mousemove', (e) => {
            if (!isMouseDown) return;
            e.preventDefault();
            const x = e.pageX - row.offsetLeft;
            const walk = (x - startX) * 0.5;
            scrollPos = scrollLeft - walk;
            row.style.transform = `translateX(-${scrollPos}px)`;
        });

        row.addEventListener('mouseleave', () => {
            if (isMouseDown) {
                isMouseDown = false;
                row.style.cursor = 'grab';
                scrollSpeed = (scrollPos - scrollLeft > 0) ? 1 : -1;
                if (index === 1) scrollSpeed *= -1;
            }
        });

        row.addEventListener('mouseup', () => {
            isMouseDown = false;
            row.style.cursor = 'grab';
            scrollSpeed = (scrollPos - scrollLeft > 0) ? 1 : -1;
            if (index === 1) scrollSpeed *= -1;
        });

        // Evento de clique em uma imagem para abrir a sobreposição
        row.querySelectorAll('img').forEach(img => {
            img.addEventListener('click', (e) => {
                if (!isMouseDown) {
                    overlayImage.src = img.src;
                    overlay.classList.add('active');
                }
            });
        });

        // Iniciar a rolagem
        scroll();
    });

    // Fechar a sobreposição ao clicar no botão "X"
    closeButton.addEventListener('click', () => {
        overlay.classList.remove('active');
    });

    // Fechar a sobreposição ao clicar fora da imagem
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.classList.remove('active');
        }
    });
});
