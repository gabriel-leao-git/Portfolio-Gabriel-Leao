document.addEventListener('DOMContentLoaded', function() {
    // Menu Hamburguer (mantido igual)
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const bars = document.querySelectorAll('.bar');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Adiciona um overlay quando o menu está aberto
        if (navMenu.classList.contains('active')) {
            const overlay = document.createElement('div');
            overlay.className = 'menu-overlay';
            overlay.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                overlay.remove();
            });
            document.body.appendChild(overlay);
        } else {
            document.querySelector('.menu-overlay')?.remove();
        }
    });

    // Carrossel de Projetos
    const carousel = document.querySelector('.carousel');
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    
    const slides = [
        { id: 1, title: 'Projeto contador de passos', img: 'imagens/contador.png', link: 'https://gabriel-leao-git.github.io/Contador/' },
        { id: 2, title: 'Projeto Tabuada', img: 'imagens/tabuada.png', link: 'https://gabriel-leao-git.github.io/Tabuada/' },
        { id: 3, title: 'Projeto Coletor de dados', img: 'imagens/coletor-de-dados.png', link: 'https://gabriel-leao-git.github.io/Coletor-de-dados/' },
        { id: 4, title: 'Projeto Verificador de idade', img: 'imagens/verificador-de-idade.png', link: 'https://gabriel-leao-git.github.io/Verificador-de-idade/' },
        { id: 5, title: 'Projeto Hora e minuto do dia', img: 'imagens/hora-do-dia.png', link: 'https://gabriel-leao-git.github.io/Hora-do-dia/' },
        { id: 6, title: 'Projeto rede social', img: 'imagens/rede-social.png', link: 'https://gabriel-leao-git.github.io/projeto-rede-social/' },
        { id: 7, title: 'Projeto 7', img: 'imagens/android.png', link: 'https://gabriel-leao-git.github.io/projeto-android/' },
        { id: 8, title: 'Projeto Site de reciclagem', img: 'imagens/reciclagem.png', link: 'https://gabriel-leao-git.github.io/kata-reciclagem/' },
        { id: 9, title: 'Projeto Site do Supermercados Vianense', img: 'imagens/vianense.png', link: 'https://gabriel-leao-git.github.io/Site-vianense/' }
    ];

    // slides no DOM
    slides.forEach((slide) => {
        const slideElement = document.createElement('div');
        slideElement.className = 'slide';
        slideElement.innerHTML = `
            <a href="${slide.link}" target="_blank" rel="noopener noreferrer" aria-label="${slide.title}">
                <div class="image-container">
                    <img src="${slide.img}" alt="${slide.title}" loading="lazy">
                    <div class="neon-border"></div>
                </div>
            </a>
        `;
        carousel.appendChild(slideElement);
    });

    // Variáveis de controle
    let currentSlideIndex = 0;
    const slideElements = document.querySelectorAll('.slide');
    const totalSlides = slideElements.length;

    // Função para centralizar o slide
    function centerSlide(index) {
        if (totalSlides === 0) return;
        
        // Ajusta o índice para ficar dentro dos limites
        currentSlideIndex = (index + totalSlides) % totalSlides;
        
        // Remove a classe 'center' de todos os slides
        slideElements.forEach(slide => {
            slide.classList.remove('center');
            slide.style.transform = 'scale(1)';
            slide.style.zIndex = '0';
        });
        
        // Adiciona a classe 'center' ao slide atual
        const currentSlide = slideElements[currentSlideIndex];
        currentSlide.classList.add('center');
        currentSlide.style.transform = 'scale(1.2)';
        currentSlide.style.zIndex = '1';
        
        // Calcula a posição de scroll para centralizar
        const slideWidth = currentSlide.offsetWidth;
        const carouselWidth = carousel.offsetWidth;
        const scrollPosition = currentSlide.offsetLeft - (carouselWidth / 2) + (slideWidth / 2);
        
        // Aplica o scroll suave
        carousel.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    }

    // Navegação
    nextBtn.addEventListener('click', () => {
        centerSlide(currentSlideIndex + 1);
    });

    prevBtn.addEventListener('click', () => {
        centerSlide(currentSlideIndex - 1);
    });

    // Controle por touch/swipe
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, {passive: true});

    function handleSwipe() {
        const threshold = 50;
        if (touchEndX < touchStartX - threshold) {
            // Swipe para esquerda (próximo)
            centerSlide(currentSlideIndex + 1);
        } else if (touchEndX > touchStartX + threshold) {
            // Swipe para direita (anterior)
            centerSlide(currentSlideIndex - 1);
        }
    }

    // Inicialização
    centerSlide(0);

    // Ajustar ao redimensionar a tela
    window.addEventListener('resize', () => {
        centerSlide(currentSlideIndex);
    });

    // Restante do seu código (mantido igual)
    // Animação de scroll para as seções
    const scrollTriggers = document.querySelectorAll('.scroll-trigger');

    function checkScroll() {
        scrollTriggers.forEach(trigger => {
            const triggerTop = trigger.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (triggerTop < windowHeight * 0.75) {
                trigger.classList.add('show');
            }
        });
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Verificar ao carregar a página

    // Atualizar ano no footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Efeito de flutuação aleatória para as tecnologias
    const techCards = document.querySelectorAll('.tech-card');
    
    techCards.forEach((card, index) => {
        // Atraso aleatório para a animação
        const delay = Math.random() * 2;
        card.style.animationDelay = `${delay}s`;
        
        // Efeito hover personalizado
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 10px 20px rgba(100, 255, 218, 0.3)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });
    });
});