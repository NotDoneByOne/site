document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    
    window.addEventListener('load', function() {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        
        setTimeout(function() {
            preloader.style.display = 'none';
        }, 500);
    });
    
    // Mobile Navigation
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav');
    
    burger.addEventListener('click', function() {
        nav.classList.toggle('active');
        burger.classList.toggle('toggle');
    });
    
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (this.classList.contains('nav-link')) {
                nav.classList.remove('active');
                burger.classList.remove('toggle');
            }
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Header Scroll Effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Animate Stats on Scroll
    const statsSection = document.querySelector('.about');
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;
    
    function animateStats() {
        if (!animated && isElementInViewport(statsSection)) {
            animated = true;
            
            statNumbers.forEach(number => {
                const target = parseInt(number.getAttribute('data-count'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                
                const updateCount = () => {
                    current += step;
                    if (current < target) {
                        number.textContent = Math.floor(current);
                        requestAnimationFrame(updateCount);
                    } else {
                        number.textContent = target;
                    }
                };
                
                number.classList.add('animated');
                updateCount();
            });
        }
    }
    
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    window.addEventListener('scroll', animateStats);
    animateStats(); // Check on load
    
    // Founder Card Animation on Scroll
    const founderCards = document.querySelectorAll('.founder-card');
    
    function animateFounders() {
        founderCards.forEach((card, index) => {
            if (isElementInViewport(card) && !card.classList.contains('animated')) {
                card.classList.add('animated');
                card.style.animationDelay = `${index * 0.1}s`;
            }
        });
    }
    
    window.addEventListener('scroll', animateFounders);
    animateFounders(); // Check on load
    
    // Project Card Animation on Scroll
    const projectCards = document.querySelectorAll('.project-card');
    
    function animateProjects() {
        projectCards.forEach((card, index) => {
            if (isElementInViewport(card) && !card.classList.contains('animated')) {
                card.classList.add('animated');
                card.style.animationDelay = `${index * 0.1}s`;
            }
        });
    }
    
    window.addEventListener('scroll', animateProjects);
    animateProjects(); // Check on load
});

document.querySelectorAll('.project-details').forEach(button => {
    button.addEventListener('click', function(e) {
        const projectType = this.getAttribute('data-project-type');
        
        if (projectType === 'closed') {
            e.preventDefault();
            alert('Извините, этот проект имеет закрытый исходный код и недоступен для публичного просмотра.');
        }
        // Для open-source переход произойдет автоматически
    });
});