document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. THEME SWITCHER (DARK / LIGHT MODE)
       ========================================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const bodyElement = document.body;

    // Check for saved theme preference, otherwise default to dark theme
    const savedTheme = localStorage.getItem('kasham-theme');
    
    if (savedTheme) {
        bodyElement.className = savedTheme;
    } else {
        // Check system preference
        const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
        if (prefersLight) {
            bodyElement.className = 'light-theme';
        } else {
            bodyElement.className = 'dark-theme';
        }
    }

    themeToggleBtn.addEventListener('click', () => {
        if (bodyElement.classList.contains('dark-theme')) {
            bodyElement.classList.replace('dark-theme', 'light-theme');
            localStorage.setItem('kasham-theme', 'light-theme');
        } else {
            bodyElement.classList.replace('light-theme', 'dark-theme');
            localStorage.setItem('kasham-theme', 'dark-theme');
        }
    });


    /* ==========================================================================
       2. SCROLL PROGRESS INDICATOR
       ========================================================================== */
    const scrollProgress = document.getElementById('scroll-progress');

    window.addEventListener('scroll', () => {
        const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalScrollHeight > 0) {
            const progress = (window.pageYOffset / totalScrollHeight) * 100;
            scrollProgress.style.width = `${progress}%`;
        } else {
            scrollProgress.style.width = '0%';
        }
    });


    /* ==========================================================================
       3. MOBILE DRAWER NAVIGATION
       ========================================================================== */
    const mobileMenuTrigger = document.getElementById('mobile-menu-trigger');
    const mobileNavDrawer = document.getElementById('mobile-nav-drawer');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    const toggleMobileMenu = () => {
        mobileMenuTrigger.classList.toggle('open');
        mobileNavDrawer.classList.toggle('open');
        // Prevent background scrolling when menu is open
        if (mobileNavDrawer.classList.contains('open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    mobileMenuTrigger.addEventListener('click', toggleMobileMenu);

    // Close menu when clicking on any mobile nav links
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileNavDrawer.classList.contains('open')) {
                toggleMobileMenu();
            }
        });
    });


    /* ==========================================================================
       4. INTERACTIVE SERVICE DASHBOARD PREVIEW
       ========================================================================== */
    const previewTabs = document.querySelectorAll('.preview-tab-btn');
    const previewBodies = document.querySelectorAll('.window-body');
    const previewUrl = document.getElementById('preview-url');

    previewTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.getAttribute('data-target');
            
            // Toggle active buttons
            previewTabs.forEach(btn => btn.classList.remove('active'));
            tab.classList.add('active');

            // Show corresponding dashboard mockup
            previewBodies.forEach(body => {
                if (body.id === targetId) {
                    body.classList.add('active');
                } else {
                    body.classList.remove('active');
                }
            });

            // Update mockup browser URL
            if (targetId === 'mentospace-preview') {
                previewUrl.textContent = 'kasham.in/mentospace';
            } else {
                previewUrl.textContent = 'kasham.in/attendix';
            }
        });
    });


    /* ==========================================================================
       5. REVEAL ON SCROLL ANIMATION (INTERSECTION OBSERVER)
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Unobserve after showing to avoid re-triggering animations on scroll back
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12, // Trigger slightly before full element is in view
        rootMargin: '0px 0px -50px 0px' // Offset trigger point slightly
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });


    /* ==========================================================================
       6. CONTACT FORM SUBMISSION HANDLING (SIMULATION)
       ========================================================================== */
    const contactForm = document.getElementById('kasham-contact-form');
    const formSuccessMessage = document.getElementById('form-success');
    const submitBtn = document.getElementById('form-submit-btn');
    const resetBtn = document.getElementById('form-reset-btn');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Simple validation checks (though inputs are marked 'required')
        const name = document.getElementById('form-name').value.trim();
        const email = document.getElementById('form-email').value.trim();
        const institution = document.getElementById('form-institution').value.trim();
        const service = document.getElementById('form-service').value;
        const message = document.getElementById('form-message').value.trim();

        if (!name || !email || !institution || !service || !message) {
            alert('Please fill out all fields before submitting.');
            return;
        }

        // Enter loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';

        // Simulate API call delay (1.2 seconds)
        setTimeout(() => {
            // Hide Form and Show Success message
            contactForm.style.display = 'none';
            formSuccessMessage.classList.add('visible');
            
            // Restore button text
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
            
            // Reset input values
            contactForm.reset();
        }, 1200);
    });

    resetBtn.addEventListener('click', () => {
        // Hide success message and show form again
        formSuccessMessage.classList.remove('visible');
        setTimeout(() => {
            contactForm.style.display = 'flex';
        }, 300); // Wait for transition out
    });
});
