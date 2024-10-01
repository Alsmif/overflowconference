// Referências aos elementos do DOM
const countdownTimer = {
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds'),
};

// Define a data alvo (ajusta conforme necessário)
const targetDate = new Date("Feb 7, 2025 20:00:00").getTime();

// Função que atualiza a contagem regressiva
const updateCountdown = () => {
    const now = new Date().getTime(); // Obtém a data e hora atuais
    const distance = targetDate - now; // Calcula a diferença de tempo

    // Calcula os dias, horas, minutos e segundos restantes
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Atualiza o conteúdo dos elementos do DOM
    countdownTimer.days.textContent = days;
    countdownTimer.hours.textContent = hours;
    countdownTimer.minutes.textContent = minutes;
    countdownTimer.seconds.textContent = seconds;

    // Se o tempo acabar, para a contagem regressiva
    if (distance < 0) {
        clearInterval(interval);
        countdownTimer.days.textContent = '0';
        countdownTimer.hours.textContent = '0';
        countdownTimer.minutes.textContent = '0';
        countdownTimer.seconds.textContent = '0';
    }
};

// Atualiza a contagem a cada segundo
const interval = setInterval(updateCountdown, 1000);


