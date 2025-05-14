document.addEventListener('DOMContentLoaded', function() {
    // Efeito de flutuação nas tech cards
    const techCards = document.querySelectorAll('.tech-card');
    
    techCards.forEach((card, index) => {
        // Adicionar delay progressivo
        card.style.animationDelay = `${index * 0.1}s`;
        
        // Efeito de hover personalizado
        card.addEventListener('mouseenter', function() {
            const tech = this.getAttribute('data-tech');
            this.style.transform = 'translateY(-10px)';
            
            // Efeito de cor baseado na tecnologia
            switch(tech) {
                case 'html':
                    this.style.boxShadow = '0 10px 20px rgba(227, 79, 38, 0.2)';
                    break;
                case 'css':
                    this.style.boxShadow = '0 10px 20px rgba(38, 77, 227, 0.2)';
                    break;
                case 'js':
                    this.style.boxShadow = '0 10px 20px rgba(247, 223, 30, 0.2)';
                    break;
                case 'react':
                    this.style.boxShadow = '0 10px 20px rgba(97, 218, 251, 0.2)';
                    break;
                case 'ai':
                    this.style.boxShadow = '0 10px 20px rgba(255, 101, 132, 0.2)';
                    break;
                case 'ux':
                    this.style.boxShadow = '0 10px 20px rgba(101, 132, 255, 0.2)';
                    break;
                default:
                    this.style.boxShadow = '0 10px 20px rgba(108, 99, 255, 0.2)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Efeito de digitação no título
    const typedElements = document.querySelectorAll('[data-typed]');
    
    if (typedElements.length > 0) {
        typedElements.forEach(el => {
            const texts = JSON.parse(el.getAttribute('data-typed'));
            let currentTextIndex = 0;
            let currentCharIndex = 0;
            let isDeleting = false;
            let typingSpeed = 100;
            
            function type() {
                const currentText = texts[currentTextIndex];
                
                if (isDeleting) {
                    el.textContent = currentText.substring(0, currentCharIndex - 1);
                    currentCharIndex--;
                    typingSpeed = 50;
                } else {
                    el.textContent = currentText.substring(0, currentCharIndex + 1);
                    currentCharIndex++;
                    typingSpeed = 100;
                }
                
                if (!isDeleting && currentCharIndex === currentText.length) {
                    isDeleting = true;
                    typingSpeed = 1500; // Pausa no final
                } else if (isDeleting && currentCharIndex === 0) {
                    isDeleting = false;
                    currentTextIndex = (currentTextIndex + 1) % texts.length;
                    typingSpeed = 500; // Pausa antes de começar novo texto
                }
                
                setTimeout(type, typingSpeed);
            }
            
            // Iniciar após um delay
            setTimeout(type, 1000);
        });
    }
    
    // Efeito parallax
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        parallaxElements.forEach(el => {
            const speed = parseFloat(el.getAttribute('data-parallax'));
            el.style.transform = `translateY(${scrollPosition * speed}px)`;
        });
    });
});