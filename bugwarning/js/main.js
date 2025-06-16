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
    const navLinks = document.querySelectorAll('.nav-link');

    burger.addEventListener('click', function () {
        nav.classList.toggle('active');
        burger.classList.toggle('toggle');
        document.body.classList.toggle('no-scroll');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            nav.classList.remove('active');
            burger.classList.remove('toggle');
            document.body.classList.remove('no-scroll');
        });
    });

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

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

    // Animate Elements on Scroll
    const animateOnScroll = function () {
        const elements = document.querySelectorAll('.benefit-card, .project-card, .step, .join-contacts');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translate(0, 0)';
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Check on load

    // Project Card Hover Effect
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // Contact Method Hover Effect
    const contactMethods = document.querySelectorAll('.contact-method');

    contactMethods.forEach(method => {
        method.addEventListener('mouseenter', function () {
            this.style.transform = 'translateX(5px)';
            this.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
        });

        method.addEventListener('mouseleave', function () {
            this.style.transform = 'translateX(0)';
            this.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
        });
    });

    // Scroll Reveal Animation
    const scrollReveal = ScrollReveal({
        origin: 'bottom',
        distance: '60px',
        duration: 1000,
        delay: 200,
        reset: true
    });

    scrollReveal.reveal('.section-title, .about-text p, .team-photo, .benefit-card, .project-card, .step, .join-contacts', {
        interval: 200
    });
});

// Burger Menu Toggle Class
const burger = document.querySelector('.burger');
burger.addEventListener('click', function () {
    this.classList.toggle('toggle');
});