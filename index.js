// ========================================
// MOBILE HAMBURGER MENU
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            const isOpen = navLinks.classList.toggle('open');
            hamburger.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', isOpen);
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('open');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ========================================
    // SCROLL ANIMATIONS FOR FEATURE CARDS
    // ========================================
    const featureCards = document.querySelectorAll('.feature-card');
    const stepCards = document.querySelectorAll('.step-card');
    const quickLinks = document.querySelectorAll('.quick-link-card');
    const statItems = document.querySelectorAll('.stat-item');

    // Combine all elements to animate
    const animateElements = [...featureCards, ...stepCards, ...quickLinks, ...statItems];

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    } else {
        // Fallback for older browsers
        animateElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }

    // ========================================
    // STATS COUNTER ANIMATION
    // ========================================
    const statNumbers = document.querySelectorAll('.stat-number');

    if ('IntersectionObserver' in window) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const text = el.textContent;
                    const num = parseInt(text.replace(/[^0-9]/g, ''));
                    const suffix = text.replace(/[0-9]/g, '').trim();

                    if (!isNaN(num)) {
                        let current = 0;
                        const increment = Math.ceil(num / 50);
                        const duration = 2000;
                        const stepTime = Math.floor(duration / (num / increment));

                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= num) {
                                current = num;
                                clearInterval(timer);
                            }
                            el.textContent = current + suffix;
                        }, stepTime);
                    }
                    counterObserver.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(el => {
            counterObserver.observe(el);
        });
    }

    // ========================================
    // SMOOTH SCROLL FOR NAVIGATION LINKS
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ========================================
    // QUICK LINK CARD INTERACTION
    // ========================================
    document.querySelectorAll('.quick-link-card').forEach(card => {
        card.addEventListener('click', function(e) {
            const link = this.getAttribute('href');
            if (link && !link.startsWith('#')) {
                // Allow normal navigation
                return;
            }
            // If it's an internal link, add a small animation
            if (link && link.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(link);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // ========================================
    // PARALLAX EFFECT ON HERO
    // ========================================
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            const heroBackground = hero.querySelector('.hero-background');
            if (heroBackground) {
                heroBackground.style.transform = `translateY(${scrollPosition * 0.4}px)`;
            }
        });
    }

    // ========================================
    // LOGO HOVER EFFECT
    // ========================================
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            this.querySelector('.logo-icon').style.transform = 'rotate(-10deg) scale(1.1)';
        });
        logo.addEventListener('mouseleave', function() {
            this.querySelector('.logo-icon').style.transform = 'rotate(0deg) scale(1)';
        });
    }

    console.log('WAY IN STUDIO - We innovate in every frame! 🎬');
});