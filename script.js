document.addEventListener('DOMContentLoaded', () => {

    // 1. DATA DINÂMICA NA BARRA DE URGÊNCIA
    const dateSpan = document.getElementById('current-date');
    if (dateSpan) {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
        const yyyy = today.getFullYear();
        dateSpan.textContent = dd + '/' + mm + '/' + yyyy;
    }

    // 2. TIMER DE 15 MINUTOS NO FORMATO MM:SS
    function startTimer(duration, displayMin, displaySec) {
        let timer = duration, minutes, seconds;
        setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            displayMin.textContent = minutes;
            displaySec.textContent = seconds;

            if (--timer < 0) {
                timer = duration; // Reinicia o timer ao chegar a zero
            }
        }, 1000);
    }

    const fifteenMinutes = 60 * 15;
    const displayMin = document.querySelector('#minutes');
    const displaySec = document.querySelector('#seconds');
    if (displayMin && displaySec) {
        startTimer(fifteenMinutes, displayMin, displaySec);
    }

    // 3. FAQ ACCORDION (NOVO COMPORTAMENTO)
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Fecha todos os outros primeiro
            faqItems.forEach(i => i.classList.remove('active'));

            // Se não estava selecionado, abre este
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // 4. ANIMAÇÕES NO SCROLL (INTERSECTION OBSERVER)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px" // Dispara um pouquinho antes
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Adiciona classe de visibilidade baseado na animação definida no css/html
                entry.target.style.animationPlayState = 'running';
                entry.target.classList.add('visible'); // caso precise de chave class based
                // Parar de observar após animar uma vez para performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-up, .slide-up');

    // Configura os delays para estarem pausados antes do scroll
    animatedElements.forEach(el => {
        // Usa css para lidar com a opacidade inicial
        el.style.opacity = '0';
        observer.observe(el);
    });

    // 5. SMOOTH SCROLL PARA BOTÕES DE CTA
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Considera a altura da barra fixa (40px) no scroll
                const headerOffset = 50;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
