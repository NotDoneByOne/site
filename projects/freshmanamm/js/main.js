// Основной JavaScript файл для FreshmanAMM

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация всех компонентов
    initPreloader();
    initNavigation();
    initAnimations();
    initCounters();
    initProgressBars();
    initChart();
    initDemoPlayer();
    initScrollEffects();
});

// Прелоадер
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1000);
    });
}

// Навигация
function initNavigation() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav');
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Бургер-меню
    burger.addEventListener('click', function() {
        nav.classList.toggle('active');
        burger.classList.toggle('toggle');
    });
    
    // Закрытие меню при клике на ссылку
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            burger.classList.remove('toggle');
        });
    });
    
    // Эффект скролла для хедера
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Анимации
function initAnimations() {
    // Анимация появления элементов при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Элементы для анимации
    const animatedElements = document.querySelectorAll(
        '.feature-card, .tech-item, .stat-card, .feature-highlight, .support-card, .version-card'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Анимация заголовка героя
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const titleWords = heroTitle.querySelectorAll('.title-word');
        titleWords.forEach((word, index) => {
            word.style.animationDelay = `${index * 0.2}s`;
            word.classList.add('fade-in-up');
        });
    }
}

// Счетчики
function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
    
    function startCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000; // 2 секунды
        const step = target / (duration / 16); // 60 FPS
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target + (element.getAttribute('data-count').includes('+') ? '+' : '');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
}

// Прогресс-бары
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar[data-width]');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width + '%';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => {
        observer.observe(bar);
    });
}

// График использования
function initChart() {
    const ctx = document.getElementById('usageChart');
    if (!ctx) return;
    
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт'],
            datasets: [{
                label: 'Активные пользователи',
                data: [45, 60, 75, 90, 110, 130, 120, 135, 145, 150],
                borderColor: '#ffffff',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff'
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)'
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)'
                    }
                }
            }
        }
    });
}

// Демо-плеер
function initDemoPlayer() {
    const playBtn = document.querySelector('.play-btn');
    const progress = document.querySelector('.progress');
    const timeDisplay = document.querySelector('.time-display');
    
    if (!playBtn) return;
    
    let isPlaying = false;
    
    playBtn.addEventListener('click', function() {
        isPlaying = !isPlaying;
        
        if (isPlaying) {
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            simulatePlayback();
        } else {
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    });
    
    function simulatePlayback() {
        if (!isPlaying) return;
        
        let currentTime = 0;
        const totalTime = 150; // 2:30 в секундах
        
        const interval = setInterval(() => {
            if (!isPlaying) {
                clearInterval(interval);
                return;
            }
            
            currentTime += 1;
            const progressPercent = (currentTime / totalTime) * 100;
            progress.style.width = progressPercent + '%';
            
            // Форматирование времени
            const minutes = Math.floor(currentTime / 60);
            const seconds = currentTime % 60;
            const totalMinutes = Math.floor(totalTime / 60);
            const totalSeconds = totalTime % 60;
            
            timeDisplay.textContent = 
                `${minutes}:${seconds.toString().padStart(2, '0')} / ${totalMinutes}:${totalSeconds.toString().padStart(2, '0')}`;
            
            if (currentTime >= totalTime) {
                clearInterval(interval);
                isPlaying = false;
                playBtn.innerHTML = '<i class="fas fa-play"></i>';
                progress.style.width = '0%';
                timeDisplay.textContent = '0:00 / 2:30';
            }
        }, 1000);
    }
}

// Эффекты скролла
function initScrollEffects() {
    // Параллакс для фона
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.shape');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Полифиллы для старых браузеров
// IntersectionObserver полифилл
if (!window.IntersectionObserver) {
    console.warn('IntersectionObserver not supported, some animations may not work');
}

// Добавление CSS классов для анимаций
const style = document.createElement('style');
style.textContent = `
    .fade-in-up {
        animation: fadeInUp 0.8s ease-out forwards;
        opacity: 0;
    }
    
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
    
    .animated {
        animation: fadeIn 0.6s ease-out forwards;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);