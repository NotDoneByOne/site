// Project-specific scripts
document.addEventListener('DOMContentLoaded', function () {
    // Preloader
    const preloader = document.querySelector('.preloader');

    window.addEventListener('load', function () {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';

        setTimeout(function () {
            preloader.style.display = 'none';
        }, 500);
    });

    // Mobile Navigation
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav');

    burger.addEventListener('click', function () {
        nav.classList.toggle('active');
        burger.classList.toggle('toggle');
    });

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Animation for feature cards
    const featureCards = document.querySelectorAll('.feature-card');

    function animateFeatures() {
        featureCards.forEach((card, index) => {
            if (isElementInViewport(card) && !card.classList.contains('animated')) {
                card.classList.add('animated');
                card.style.animationDelay = `${index * 0.1}s`;
            }
        });
    }

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }

    window.addEventListener('scroll', animateFeatures);
    animateFeatures(); // Check on load
});