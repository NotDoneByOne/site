document.addEventListener('DOMContentLoaded', function() {
    // Инициализация частиц фона
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#ff3e00" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#ff3e00",
                    opacity: 0.2,
                    width: 1
                },
                move: { enable: true, speed: 2, direction: "none", random: true }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" }
                }
            }
        });
    }

    // Preloader
    const preloader = document.querySelector('.preloader');
    
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 500);
        }, 1500); // Увеличиваем время загрузки для эффекта
    });
    
    // Mobile Navigation
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav');
    
    burger.addEventListener('click', function() {
        nav.classList.toggle('active');
        burger.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });
    
    // Закрытие меню при клике на ссылку
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            burger.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
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
    
    // Network Canvas Animation
    const networkCanvas = document.getElementById('network-canvas');
    if (networkCanvas) {
        const ctx = networkCanvas.getContext('2d');
        let nodes = [];
        let connections = [];
        
        function initNetwork() {
            // Установка размера canvas
            networkCanvas.width = networkCanvas.offsetWidth;
            networkCanvas.height = networkCanvas.offsetHeight;
            
            // Создание узлов
            nodes = [];
            const nodeCount = 15;
            
            for (let i = 0; i < nodeCount; i++) {
                nodes.push({
                    x: Math.random() * networkCanvas.width,
                    y: Math.random() * networkCanvas.height,
                    radius: Math.random() * 3 + 1,
                    speedX: (Math.random() - 0.5) * 0.5,
                    speedY: (Math.random() - 0.5) * 0.5
                });
            }
            
            // Создание соединений
            connections = [];
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 150) {
                        connections.push({
                            node1: nodes[i],
                            node2: nodes[j],
                            distance: distance
                        });
                    }
                }
            }
        }
        
        function animateNetwork() {
            ctx.clearRect(0, 0, networkCanvas.width, networkCanvas.height);
            
            // Обновление позиций узлов
            nodes.forEach(node => {
                node.x += node.speedX;
                node.y += node.speedY;
                
                // Отскок от границ
                if (node.x < 0 || node.x > networkCanvas.width) node.speedX *= -1;
                if (node.y < 0 || node.y > networkCanvas.height) node.speedY *= -1;
                
                // Отрисовка узлов
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255, 62, 0, 0.7)';
                ctx.fill();
            });
            
            // Отрисовка соединений
            connections.forEach(conn => {
                const dx = conn.node1.x - conn.node2.x;
                const dy = conn.node1.y - conn.node2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    ctx.beginPath();
                    ctx.moveTo(conn.node1.x, conn.node1.y);
                    ctx.lineTo(conn.node2.x, conn.node2.y);
                    ctx.strokeStyle = `rgba(255, 62, 0, ${0.2 * (1 - distance/150)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            });
            
            requestAnimationFrame(animateNetwork);
        }
        
        // Инициализация и запуск анимации
        initNetwork();
        animateNetwork();
        
        // Обновление при изменении размера окна
        window.addEventListener('resize', initNetwork);
    }
    
    // Анимация появления элементов при скролле
    const animatedElements = document.querySelectorAll('.process-step, .founder-card, .project-card, .sphere-item');
    
    function checkScroll() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('fade-in-up');
            }
        });
    }
    
    // Проверка при загрузке и скролле
    window.addEventListener('load', checkScroll);
    window.addEventListener('scroll', checkScroll);
    
    // Интерактивность для сфер технологий
    const sphereItems = document.querySelectorAll('.sphere-item');
    sphereItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 0.5s';
        });
        
        item.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });
    
    // Glitch эффект для логотипа
    const glitchText = document.querySelector('.glitch');
    if (glitchText) {
        setInterval(() => {
            glitchText.classList.remove('glitch');
            void glitchText.offsetWidth; // Trigger reflow
            glitchText.classList.add('glitch');
        }, 5000);
    }
    
    // Анимация сетевых соединений для команды
    function initTeamConnections() {
        const founderCards = document.querySelectorAll('.founder-card');
        const networkContainer = document.querySelector('.network-connections');
        
        if (!founderCards.length || !networkContainer) return;
        
        // Создаем SVG для соединений
        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute('class', 'connections-svg');
        svg.style.position = 'absolute';
        svg.style.top = '0';
        svg.style.left = '0';
        svg.style.width = '100%';
        svg.style.height = '100%';
        svg.style.pointerEvents = 'none';
        svg.style.zIndex = '1';
        
        networkContainer.appendChild(svg);
        
        // Функция для обновления соединений
        function updateConnections() {
            // Очищаем предыдущие соединения
            while (svg.firstChild) {
                svg.removeChild(svg.firstChild);
            }
            
            // Создаем соединения между всеми карточками
            for (let i = 0; i < founderCards.length; i++) {
                for (let j = i + 1; j < founderCards.length; j++) {
                    const card1 = founderCards[i];
                    const card2 = founderCards[j];
                    
                    const rect1 = card1.getBoundingClientRect();
                    const rect2 = card2.getBoundingClientRect();
                    
                    const containerRect = networkContainer.getBoundingClientRect();
                    
                    const x1 = rect1.left + rect1.width / 2 - containerRect.left;
                    const y1 = rect1.top + rect1.height / 2 - containerRect.top;
                    const x2 = rect2.left + rect2.width / 2 - containerRect.left;
                    const y2 = rect2.top + rect2.height / 2 - containerRect.top;
                    
                    const line = document.createElementNS(svgNS, "line");
                    line.setAttribute('x1', x1);
                    line.setAttribute('y1', y1);
                    line.setAttribute('x2', x2);
                    line.setAttribute('y2', y2);
                    line.setAttribute('stroke', 'rgba(255, 62, 0, 0.3)');
                    line.setAttribute('stroke-width', '1');
                    line.setAttribute('stroke-dasharray', '5,5');
                    
                    svg.appendChild(line);
                }
            }
        }
        
        // Обновляем соединения при загрузке и изменении размера
        window.addEventListener('load', updateConnections);
        window.addEventListener('resize', updateConnections);
        
        // Анимируем пунктирные линии
        let offset = 0;
        function animateDashes() {
            offset = (offset + 1) % 10;
            const lines = svg.querySelectorAll('line');
            lines.forEach(line => {
                line.setAttribute('stroke-dashoffset', offset);
            });
            requestAnimationFrame(animateDashes);
        }
        
        animateDashes();
    }
    
    // Инициализация соединений команды
    initTeamConnections();
    
    // Parallax эффект для некоторых элементов
    function initParallax() {
        const parallaxElements = document.querySelectorAll('.sphere-item, .project-card');
        
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            parallaxElements.forEach(element => {
                element.style.transform = `translateY(${rate}px)`;
            });
        });
    }
    
    // Инициализация параллакса
    initParallax();
    
    // Интерактивность для карточек проектов
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 10;
            const angleY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(-10px)';
        });
    });
});