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
    // IMAGE MODAL - Full Size Viewer
    // ========================================
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalCategory = document.getElementById('modalCategory');
    const modalDescription = document.getElementById('modalDescription');
    const modalClose = document.getElementById('imageModalClose');

    // All "View Project" buttons
    const viewButtons = document.querySelectorAll('.portfolio-link-btn');

    viewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            // Get data from button attributes
            const imageSrc = this.getAttribute('data-image');
            const title = this.getAttribute('data-title');
            const category = this.getAttribute('data-category');
            const description = this.getAttribute('data-description');

            // Populate modal
            modalImage.src = imageSrc;
            modalImage.alt = title;
            modalTitle.textContent = title;
            modalCategory.textContent = category;
            modalDescription.textContent = description;

            // Show modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal functions
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // Close on outside click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // ========================================
    // FILTER FUNCTIONALITY
    // ========================================
    const filterTabs = document.querySelectorAll('.filter-tab');
    const serviceCards = document.querySelectorAll('.service-card');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const portfolioCount = document.getElementById('portfolioCount');
    const portfolioEmpty = document.getElementById('portfolioEmpty');

    function getCategoryFromHash() {
        const hash = window.location.hash.replace('#', '');
        if (hash && hash !== 'all') {
            return hash;
        }
        return 'all';
    }

    function filterPortfolio(category) {
        let visibleCount = 0;

        serviceCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            if (category === 'all' || cardCategory === category) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });

        portfolioItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            if (category === 'all' || itemCategory === category) {
                item.classList.remove('hidden');
                visibleCount++;
            } else {
                item.classList.add('hidden');
            }
        });

        filterTabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.getAttribute('data-filter') === category) {
                tab.classList.add('active');
            }
        });

        if (portfolioCount) {
            portfolioCount.textContent = `Showing ${visibleCount} project${visibleCount !== 1 ? 's' : ''}`;
        }

        if (portfolioEmpty) {
            if (visibleCount === 0) {
                portfolioEmpty.classList.add('show');
            } else {
                portfolioEmpty.classList.remove('show');
            }
        }

        if (history.pushState) {
            history.pushState(null, null, `#${category}`);
        }
    }

    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.getAttribute('data-filter');
            filterPortfolio(category);

            const showcase = document.getElementById('portfolioShowcase');
            if (showcase) {
                setTimeout(() => {
                    showcase.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        });
    });

    document.querySelectorAll('.service-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const service = this.getAttribute('data-service');
            filterTabs.forEach(tab => {
                if (tab.getAttribute('data-filter') === service) {
                    tab.click();
                }
            });
        });
    });

    const initialCategory = getCategoryFromHash();
    filterPortfolio(initialCategory);

    // ========================================
    // SCROLL ANIMATIONS
    // ========================================
    const animatedElements = document.querySelectorAll(
        '.service-card, .portfolio-item, .process-step'
    );

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 80);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    } else {
        animatedElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }

    // ========================================
    // LOGO HOVER EFFECT
    // ========================================
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.logo-icon');
            if (icon) {
                icon.style.transition = 'transform 0.3s ease';
                icon.style.transform = 'rotate(-10deg) scale(1.1)';
            }
        });
        logo.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.logo-icon');
            if (icon) {
                icon.style.transform = 'rotate(0deg) scale(1)';
            }
        });
    }

    console.log('WAY IN STUDIO - What We Do page loaded! 🎬');
    console.log('We innovate in every frame! ✨');
});