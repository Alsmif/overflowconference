document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav-links');
    const dropdowns = document.querySelectorAll('.dropdown');
    const subtopicLinks = document.querySelectorAll('.dropdown-content a'); // Links dentro de subtópicos

    // Controle do menu principal
    menuIcon.addEventListener('click', function () {
        navLinks.classList.toggle('show');
        menuIcon.classList.toggle('open');
        // Reseta os subtópicos ao fechar o menu principal
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('show');
            const link = dropdown.querySelector('a');
            link.style.color = '#ffffff'; // Volta a cor para branco quando fecha o menu
        });
    });

    // Controle dos subtópicos
    dropdowns.forEach(dropdown => {
        const parentLink = dropdown.querySelector('a');

        parentLink.addEventListener('click', function (e) {
            e.preventDefault(); // Previne a navegação

            // Alterna a classe "show" para exibir/ocultar subtópicos
            const isOpen = dropdown.classList.toggle('show');

            // Fecha outros dropdowns abertos ao clicar em um novo
            dropdowns.forEach(d => {
                if (d !== dropdown) {
                    d.classList.remove('show');
                    d.querySelector('a').style.color = '#ffffff'; // Fecha os outros dropdowns e retorna a cor ao branco
                }
            });

            // Muda a cor do link quando o menu está aberto ou fechado
            parentLink.style.color = isOpen ? '#E76012' : '#ffffff';
        });
    });

    // Fecha o nav ao clicar em um subtópico que direciona para um ID na página
    subtopicLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            // Verifica se o href começa com "#"
            if (link.getAttribute('href').startsWith('#')) {
                // Fecha o nav
                if (navLinks.classList.contains('show')) {
                    navLinks.classList.remove('show');
                    menuIcon.classList.remove('open');
                    // Reseta os subtópicos para fechados e a cor dos links para branco
                    dropdowns.forEach(dropdown => {
                        dropdown.classList.remove('show');
                        const parentLink = dropdown.querySelector('a');
                        parentLink.style.color = '#ffffff';
                    });
                }
            }
        });
    });
});
