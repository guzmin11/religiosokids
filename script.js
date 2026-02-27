document.addEventListener('DOMContentLoaded', () => {
    // Scroll Animation Logic
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Dispara quando 15% do elemento estiver visível
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Opcional: Descomente a linha abaixo para animar apenas uma vez
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Seleciona todos os elementos que têm as classes de animação
    const animatedElements = document.querySelectorAll(
        '.fade-in, .slide-in-left, .slide-in-right, .scale-up'
    );

    animatedElements.forEach(el => observer.observe(el));

    // Smooth Scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // FAQ Accordion Logic
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');

            // Fecha todos os outros abertos para manter apenas 1 visível (Opcional, mas boa prática)
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });

            // Se não estava ativo antes, a gente ativa ele agora
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
});
