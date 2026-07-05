document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // 2. Header Scroll Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. Active Link Highlight on Scroll
    const sections = document.querySelectorAll('section, .hero');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id') || '';
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // 4. Form Validation & Simulation
    const registrationForm = document.getElementById('registrationForm');
    const formStatus = document.getElementById('formStatus');

    if (registrationForm && formStatus) {
        registrationForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Clear previous status
            formStatus.style.display = 'none';
            formStatus.className = 'form-status';
            formStatus.textContent = '';

            // Get form fields
            const studentName = document.getElementById('studentName').value.trim();
            const parentName = document.getElementById('parentName').value.trim();
            const whatsapp = document.getElementById('whatsapp').value.trim();
            const course = document.getElementById('course').value;
            const gender = document.getElementById('gender').value;

            // Simple validation
            if (!studentName || !parentName || !whatsapp || !course || !gender) {
                showStatus('براہ کرم تمام لازمی فیلڈز پُر کریں۔', 'error');
                return;
            }

            // Submit Button loading state
            const submitBtn = registrationForm.querySelector('.submit-btn');
            const originalBtnText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'درخواست جمع کی جا رہی ہے...';

            // Simulate API request (1.5s delay)
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;

                // Success response
                showStatus('ماشاءاللہ! آپ کی درخواست موصول ہو گئی ہے۔ ہم جلد ہی آپ سے واٹس ایپ پر رابطہ کریں گے۔ جزاک اللہ خیر!', 'success');
                registrationForm.reset();
            }, 1500);
        });
    }

    function showStatus(message, type) {
        formStatus.textContent = message;
        formStatus.classList.add(type);
        formStatus.style.display = 'block';

        // Scroll to status message
        formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
});
