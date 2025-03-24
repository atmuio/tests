// Gestione del menu hamburger per dispositivi mobili
const hamburgerMenu = document.querySelector('.hamburger-menu');
const mainNav = document.querySelector('.main-nav');

hamburgerMenu.addEventListener('click', () => {
    // Toggle per mostrare/nascondere il menu
    if (mainNav.style.display === 'block') {
        mainNav.style.display = 'none';
        // Rimuovi la classe active dalle barre
        document.querySelectorAll('.bar').forEach(bar => {
            bar.classList.remove('active');
        });
    } else {
        mainNav.style.display = 'block';
        // Aggiungi la classe active alle barre per l'animazione
        document.querySelectorAll('.bar').forEach(bar => {
            bar.classList.add('active');
        });
    }
});

// Aggiungi animazione alle barre del menu hamburger
document.querySelectorAll('.bar').forEach((bar, index) => {
    bar.addEventListener('mouseenter', () => {
        bar.style.width = '30px';
    });
    
    bar.addEventListener('mouseleave', () => {
        bar.style.width = '25px';
    });
});

// Gestione della sezione hero con animazione al caricamento
window.addEventListener('DOMContentLoaded', () => {
    const heroContent = document.querySelector('.hero-content');
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(20px)';
    
    // Animazione con un leggero ritardo
    setTimeout(() => {
        heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
    }, 200);
});

// Animazione per le card al loro apparire nel viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function handleScrollAnimations() {
    const cards = document.querySelectorAll('.card');
    const testimonials = document.querySelectorAll('.testimonial');
    
    // Animazione per le card
    cards.forEach(card => {
        if (isElementInViewport(card) && !card.classList.contains('animated')) {
            card.classList.add('animated');
            card.style.animation = 'fadeInUp 0.6s ease forwards';
        }
    });
    
    // Animazione per le testimonianze
    testimonials.forEach((testimonial, index) => {
        if (isElementInViewport(testimonial) && !testimonial.classList.contains('animated')) {
            testimonial.classList.add('animated');
            // Ritardo differente per ogni testimonianza
            testimonial.style.animation = `fadeInUp 0.6s ease ${index * 0.2}s forwards`;
        }
    });
}

// Aggiungi stile per le animazioni
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .card, .testimonial {
        opacity: 0;
    }
`;
document.head.appendChild(style);

// Eventi per il controllo delle animazioni
window.addEventListener('scroll', handleScrollAnimations);
window.addEventListener('resize', handleScrollAnimations);
window.addEventListener('load', handleScrollAnimations);

// Gestione del pulsante CTA
const ctaButton = document.querySelector('.cta-button');
ctaButton.addEventListener('click', function() {
    // Scorri alla sezione features
    document.querySelector('.features').scrollIntoView({ 
        behavior: 'smooth' 
    });
});