// ==========================================
// 1. СЧЕТЧИК ДНЕЙ ВМЕСТЕ
// ==========================================
// Укажи здесь точную дату начала ваших отношений: Год, Месяц (0-11!), День
// Обрати внимание: в JavaScript месяцы считаются с 0 (0 - январь, 10 - ноябрь и т.д.)
const startDate = new Date(2025, 10, 3); // Пример: 3 ноября 2025 года

function updateCounter() {
    const now = new Date();
    const diff = now - startDate;

    if (diff < 0) {
        document.getElementById('together-counter').innerText = "Наша история только начинается!";
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);

    document.getElementById('together-counter').innerText = 
        `${days} дн. ${hours} час. ${minutes} мин.`;
}

// Обновляем счетчик каждую минуту
updateCounter();
setInterval(updateCounter, 60000);


// ==========================================
// 2. ЛОГИКА КВЕСТА
// ==========================================
function checkAnswer(questionId, isCorrect) {
    const quizCard = document.getElementById(questionId);
    const buttons = quizCard.querySelectorAll('.option-btn');
    const feedback = document.getElementById(`feedback-${questionId}`);

    // Блокируем кнопки после выбора
    buttons.forEach(btn => btn.disabled = true);

    // Находим нажатую кнопку по объекту события
    const clickedBtn = event.target;

    if (isCorrect) {
        clickedBtn.classList.add('correct');
        feedback.style.color = '#155724';
        feedback.innerText = 'Ура! Ты абсолютно права! ❤️';
        
        // Небольшой вылет конфетти над вопросом
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 40,
                spread: 60,
                origin: { y: 0.7 }
            });
        }
    } else {
        clickedBtn.classList.add('wrong');
        feedback.style.color = '#721c24';
        feedback.innerText = 'Упс, не совпало! Но я все равно тебя люблю 💕';
    }
}


// ==========================================
// 3. ПРИГЛАШЕНИЕ НА СВИДАНИЕ
// ==========================================
function acceptInvitation() {
    const acceptBtn = document.getElementById('accept-btn');
    const acceptedMessage = document.getElementById('accepted-message');

    // Прячем кнопку и показываем финальное сообщение
    acceptBtn.style.display = 'none';
    acceptedMessage.style.display = 'block';

    // Запускаем праздничный салют из конфетти
    if (typeof confetti === 'function') {
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            
            // Запуск салюта с двух сторон экрана
            confetti(Object.assign({}, defaults, { 
                particleCount, 
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } 
            }));
            confetti(Object.assign({}, defaults, { 
                particleCount, 
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } 
            }));
        }, 250);
    }
}

function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
}