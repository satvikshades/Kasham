document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. THEME SWITCHER (DARK / LIGHT MODE)
       ========================================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const bodyElement = document.body;

    const savedTheme = localStorage.getItem('kasham-theme');
    if (savedTheme) {
        bodyElement.className = savedTheme;
    } else {
        const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
        bodyElement.className = prefersLight ? 'light-theme' : 'dark-theme';
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            if (bodyElement.classList.contains('dark-theme')) {
                bodyElement.classList.replace('dark-theme', 'light-theme');
                localStorage.setItem('kasham-theme', 'light-theme');
            } else {
                bodyElement.classList.replace('light-theme', 'dark-theme');
                localStorage.setItem('kasham-theme', 'dark-theme');
            }
        });
    }


    /* ==========================================================================
       2. SCROLL PROGRESS INDICATOR
       ========================================================================== */
    const scrollProgress = document.getElementById('scroll-progress');

    if (scrollProgress) {
        window.addEventListener('scroll', () => {
            const totalH = document.documentElement.scrollHeight - window.innerHeight;
            scrollProgress.style.width = totalH > 0 ? `${(window.pageYOffset / totalH) * 100}%` : '0%';
        });
    }


    /* ==========================================================================
       3. MOBILE DRAWER NAVIGATION
       ========================================================================== */
    const mobileMenuTrigger = document.getElementById('mobile-menu-trigger');
    const mobileNavDrawer   = document.getElementById('mobile-nav-drawer');
    const mobileLinks       = document.querySelectorAll('.mobile-nav-link');

    if (mobileMenuTrigger && mobileNavDrawer) {
        const toggleMobileMenu = () => {
            mobileMenuTrigger.classList.toggle('open');
            mobileNavDrawer.classList.toggle('open');
            document.body.style.overflow = mobileNavDrawer.classList.contains('open') ? 'hidden' : '';
        };
        mobileMenuTrigger.addEventListener('click', toggleMobileMenu);
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mobileNavDrawer.classList.contains('open')) toggleMobileMenu();
            });
        });
    }


    /* ==========================================================================
       4. INTERACTIVE SERVICE DASHBOARD PREVIEW
       ========================================================================== */
    const previewTabs   = document.querySelectorAll('.preview-tab-btn');
    const previewBodies = document.querySelectorAll('.window-body');
    const previewUrl    = document.getElementById('preview-url');

    previewTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.getAttribute('data-target');
            previewTabs.forEach(btn => btn.classList.remove('active'));
            tab.classList.add('active');
            previewBodies.forEach(body => {
                body.id === targetId ? body.classList.add('active') : body.classList.remove('active');
            });
            if (previewUrl) {
                previewUrl.textContent = targetId === 'mentospace-preview'
                    ? 'kasham.in/mentospace' : 'kasham.in/attendix';
            }
        });
    });


    /* ==========================================================================
       5. REVEAL ON SCROLL (INTERSECTION OBSERVER)
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const obs = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
        revealElements.forEach(el => obs.observe(el));
    } else {
        revealElements.forEach(el => el.classList.add('active'));
    }


    /* ==========================================================================
       6. CONTACT FORM
       ========================================================================== */
    const contactForm        = document.getElementById('kasham-contact-form');
    const formSuccessMessage = document.getElementById('form-success');
    const submitBtn          = document.getElementById('form-submit-btn');
    const resetBtn           = document.getElementById('form-reset-btn');

    if (contactForm && formSuccessMessage && submitBtn && resetBtn) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name        = document.getElementById('form-name').value.trim();
            const email       = document.getElementById('form-email').value.trim();
            const institution = document.getElementById('form-institution').value.trim();
            const service     = document.getElementById('form-service').value;
            const message     = document.getElementById('form-message').value.trim();

            if (!name || !email || !institution || !service || !message) {
                alert('Please fill out all fields before submitting.');
                return;
            }

            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';

            setTimeout(() => {
                contactForm.style.display = 'none';
                formSuccessMessage.classList.add('visible');
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
                contactForm.reset();
            }, 1200);
        });

        resetBtn.addEventListener('click', () => {
            formSuccessMessage.classList.remove('visible');
            setTimeout(() => { contactForm.style.display = 'flex'; }, 300);
        });
    }


    /* ==========================================================================
       7. FAQ ACCORDION
       ========================================================================== */
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer   = question.nextElementSibling;
            const isActive = question.classList.contains('active');

            faqQuestions.forEach(other => {
                if (other !== question) {
                    other.classList.remove('active');
                    const ans = other.nextElementSibling;
                    if (ans) { ans.style.maxHeight = '0'; ans.style.opacity = '0'; }
                }
            });

            if (isActive) {
                question.classList.remove('active');
                if (answer) { answer.style.maxHeight = '0'; answer.style.opacity = '0'; }
            } else {
                question.classList.add('active');
                if (answer) {
                    answer.style.maxHeight = `${answer.scrollHeight}px`;
                    answer.style.opacity   = '1';
                }
            }
        });
    });


    /* ==========================================================================
       8. THE PROMISE — TRUST US CELEBRATION MODAL
       ========================================================================== */
    const celebrationModal  = document.getElementById('celebration-modal');
    const celebrationClose  = document.getElementById('celebration-close-btn');
    const sparklesContainer = document.getElementById('celebration-sparkles');

    const createSparkle = () => {
        if (!sparklesContainer) return;
        const s = document.createElement('div');
        s.classList.add('sparkle');
        const angle = Math.random() * Math.PI * 2;
        const dist  = 60 + Math.random() * 120;
        s.style.setProperty('--tx', `${Math.cos(angle) * dist}px`);
        s.style.setProperty('--ty', `${Math.sin(angle) * dist}px`);
        const size = 4 + Math.random() * 6;
        s.style.width     = `${size}px`;
        s.style.height    = `${size}px`;
        s.style.position  = 'absolute';
        s.style.left      = '50%';
        s.style.top       = '50%';
        s.style.transform = 'translate(-50%, -50%)';
        s.style.animation = 'sparkleBurst 1s cubic-bezier(0.1, 0.8, 0.3, 1) forwards';
        sparklesContainer.appendChild(s);
        setTimeout(() => s.remove(), 1000);
    };

    const triggerBurst = () => {
        for (let i = 0; i < 40; i++) setTimeout(createSparkle, Math.random() * 150);
    };

    /* Exposed globally — called by onclick="openCelebration()" on the button */
    window.openCelebration = () => {
        if (!celebrationModal) return;
        celebrationModal.style.display = 'flex';
        // Small delay so flex is painted before transition starts
        setTimeout(() => celebrationModal.classList.add('active'), 10);
        celebrationModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        setTimeout(triggerBurst, 900);
    };

    window.closeCelebration = () => {
        if (!celebrationModal) return;
        celebrationModal.classList.remove('active');
        celebrationModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (sparklesContainer) sparklesContainer.innerHTML = '';
        setTimeout(() => { celebrationModal.style.display = 'none'; }, 400);
    };

    if (celebrationClose) {
        celebrationClose.addEventListener('click', window.closeCelebration);
    }

    const backdrop = celebrationModal ? celebrationModal.querySelector('.celebration-backdrop') : null;
    if (backdrop) backdrop.addEventListener('click', window.closeCelebration);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') window.closeCelebration();
    });


    /* ==========================================================================
       9. DYNAMIC MOUSE HOVER GLOW INTERACTIVITY
       ========================================================================== */
    const hoverCards = document.querySelectorAll('.service-card, .founder-card, .feature-card, .calc-result-card, .calm-zone-card');
    
    hoverCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const px = (x / rect.width) * 100;
            const py = (y / rect.height) * 100;
            card.style.setProperty('--mouse-x', `${px}%`);
            card.style.setProperty('--mouse-y', `${py}%`);
        });
    });


    /* ==========================================================================
       10. INTERACTIVE ROI & CAMPUS CALCULATOR
       ========================================================================== */
    const slider = document.getElementById('student-strength-slider');
    const sliderVal = document.getElementById('slider-value-display');
    const hoursSavedVal = document.getElementById('hours-saved-val');
    const sessionsVal = document.getElementById('sessions-val');
    const wellnessVal = document.getElementById('wellness-val');

    const triggerPop = (el) => {
        if (!el) return;
        el.style.transform = 'scale(1.2)';
        setTimeout(() => { el.style.transform = 'scale(1)'; }, 150);
    };

    const updateCalculator = () => {
        if (!slider) return;
        const S = parseInt(slider.value);
        if (sliderVal) sliderVal.textContent = S.toLocaleString();

        const targetHours = Math.round(S * 0.05);
        const targetSessions = Math.round(S * 0.25);
        let targetWellness = 35;
        if (S < 2000) targetWellness = 45;
        else if (S > 5000) targetWellness = 25;

        if (hoursSavedVal && hoursSavedVal.textContent != targetHours) {
            hoursSavedVal.textContent = targetHours;
            triggerPop(hoursSavedVal);
        }
        if (sessionsVal && sessionsVal.textContent != targetSessions) {
            sessionsVal.textContent = targetSessions;
            triggerPop(sessionsVal);
        }
        if (wellnessVal && wellnessVal.textContent != targetWellness) {
            wellnessVal.textContent = targetWellness;
            triggerPop(wellnessVal);
        }
    };

    if (slider) {
        slider.addEventListener('input', updateCalculator);
        updateCalculator();
    }


    /* ==========================================================================
       11. CALM ZONE BREATHING WIDGET
       ========================================================================== */
    const breathingBtn = document.getElementById('breathing-trigger-btn');
    const breathingOrb = document.getElementById('breathing-orb');
    const breathingTimer = document.getElementById('breathing-timer');
    const breathingState = document.getElementById('breathing-state');
    const breathingSubtext = document.getElementById('breathing-subtext');

    let breathingCountdown = null;
    let breathingPhase = 0; // 0 = Inhale, 1 = Hold, 2 = Exhale, 3 = Hold
    let timeLeft = 4;
    let isBreathingActive = false;

    const phases = [
        { name: 'Inhale', class: 'inhale', sub: 'Breathe in slowly through your nose.' },
        { name: 'Hold', class: 'hold', sub: 'Suspend your breath gently.' },
        { name: 'Exhale', class: 'exhale', sub: 'Release the air slowly through your mouth.' },
        { name: 'Hold', class: 'exhale', sub: 'Rest empty before the next breath.' }
    ];

    const updateBreathingUI = () => {
        const phase = phases[breathingPhase];
        if (breathingOrb) {
            breathingOrb.className = 'breathing-orb ' + phase.class;
        }
        if (breathingState) {
            breathingState.textContent = phase.name + '...';
        }
        if (breathingSubtext) {
            breathingSubtext.textContent = phase.sub;
        }
        if (breathingTimer) {
            breathingTimer.textContent = timeLeft;
        }
    };

    const tickBreathing = () => {
        timeLeft--;
        if (timeLeft <= 0) {
            breathingPhase = (breathingPhase + 1) % 4;
            timeLeft = 4;
            updateBreathingUI();
        } else {
            if (breathingTimer) {
                breathingTimer.textContent = timeLeft;
            }
        }
    };

    const startBreathing = () => {
        isBreathingActive = true;
        breathingPhase = 0;
        timeLeft = 4;
        updateBreathingUI();
        if (breathingBtn) {
            breathingBtn.innerHTML = 'Pause Session <i class="fa-solid fa-pause"></i>';
        }
        breathingCountdown = setInterval(tickBreathing, 1000);
    };

    const pauseBreathing = () => {
        isBreathingActive = false;
        clearInterval(breathingCountdown);
        if (breathingOrb) {
            breathingOrb.className = 'breathing-orb';
        }
        if (breathingState) {
            breathingState.textContent = 'Session Paused';
        }
        if (breathingSubtext) {
            breathingSubtext.textContent = 'Click below to resume your calming cycle.';
        }
        if (breathingTimer) {
            breathingTimer.textContent = '4';
        }
        if (breathingBtn) {
            breathingBtn.innerHTML = 'Resume Session <i class="fa-solid fa-wind"></i>';
        }
    };

    if (breathingBtn) {
        breathingBtn.addEventListener('click', () => {
            if (isBreathingActive) {
                pauseBreathing();
            } else {
                startBreathing();
            }
        });
    }

});
