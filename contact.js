document.addEventListener('DOMContentLoaded', function() {

    // ========================================
    // MOBILE HAMBURGER MENU
    // ========================================
    var hamburger = document.getElementById('hamburger');
    var navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            var isOpen = navLinks.classList.toggle('open');
            hamburger.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', isOpen);
        });

        navLinks.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                navLinks.classList.remove('open');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ========================================
    // WHATSAPP CONTACT FORM
    // ========================================
    var form = document.getElementById('contactForm');
    var formSuccess = document.getElementById('formSuccess');
    var whatsappRedirect = document.getElementById('whatsappRedirect');

    // Your WhatsApp number (with country code, no + sign)
    var whatsappNumber = '2376XXXXXXXX'; // REPLACE WITH YOUR NUMBER

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Reset errors
            document.querySelectorAll('.form-group').forEach(function(group) {
                group.classList.remove('error');
            });

            var isValid = true;

            // Validate Name
            var name = document.getElementById('name');
            if (!name.value.trim()) {
                name.closest('.form-group').classList.add('error');
                isValid = false;
            }

            // Validate Email
            var email = document.getElementById('email');
            var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email.value.trim())) {
                email.closest('.form-group').classList.add('error');
                isValid = false;
            }

            // Validate Phone
            var phone = document.getElementById('phone');
            if (!phone.value.trim()) {
                phone.closest('.form-group').classList.add('error');
                isValid = false;
            }

            // Validate Message
            var message = document.getElementById('message');
            if (!message.value.trim()) {
                message.closest('.form-group').classList.add('error');
                isValid = false;
            }

            if (isValid) {
                // Build WhatsApp message
                var service = document.getElementById('service');
                var serviceText = service.value ? 'Service: ' + service.options[service.selectedIndex].text : 'Not specified';

                var whatsappMessage = 
                    'Hello WAY IN STUDIO! 👋\n\n' +
                    '📝 New Message from Contact Form:\n\n' +
                    '👤 Name: ' + name.value + '\n' +
                    '📧 Email: ' + email.value + '\n' +
                    '📱 Phone: ' + phone.value + '\n' +
                    '📂 ' + serviceText + '\n\n' +
                    '💬 Message:\n' + message.value + '\n\n' +
                    '🙏 Please get back to me. Thank you!';

                var encodedMessage = encodeURIComponent(whatsappMessage);
                var whatsappURL = 'https://wa.me/' + whatsappNumber + '?text=' + encodedMessage;

                // Show success message
                form.style.display = 'none';
                formSuccess.classList.add('show');

                // Set the WhatsApp redirect link
                whatsappRedirect.href = whatsappURL;

                // Auto-open WhatsApp in new tab
                window.open(whatsappURL, '_blank');

                console.log('Message prepared for WhatsApp!');
            }
        });

        // Real-time validation
        document.querySelectorAll('#contactForm input, #contactForm textarea').forEach(function(field) {
            field.addEventListener('blur', function() {
                var group = this.closest('.form-group');
                if (this.value.trim()) {
                    group.classList.remove('error');
                }
            });
        });
    }

    // ========================================
    // FAQ ACCORDION
    // ========================================
    var faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(function(question) {
        question.addEventListener('click', function() {
            var isActive = this.classList.contains('active');
            
            faqQuestions.forEach(function(q) {
                q.classList.remove('active');
                q.setAttribute('aria-expanded', 'false');
                q.nextElementSibling.classList.remove('open');
            });

            if (!isActive) {
                this.classList.add('active');
                this.setAttribute('aria-expanded', 'true');
                this.nextElementSibling.classList.add('open');
            }
        });
    });

    // ========================================
    // SMOOTH SCROLL FOR CTA BUTTON
    // ========================================
    var ctaButton = document.querySelector('.cta-button[href="#contactForm"]');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            var target = document.getElementById('contactForm');
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    console.log('WAY IN STUDIO - Contact page loaded! 🎬');
    console.log('We innovate in every frame! ✨');
});