document.addEventListener('DOMContentLoaded', () => {

    // =========================================================
    // EMAILJS CONFIGURATION — LIVE CREDENTIALS
    // =========================================================
    const ADMIN_EMAIL = 'info@thephlebotomytrainer.com';

    // =========================================================
    // MOBILE MENU
    // =========================================================
    const mobileMenuBtn   = document.getElementById('mobile-menu-btn');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const nav = document.getElementById('nav');

    const toggleMenu = (show) => {
        if (show) { nav.classList.add('active'); document.body.style.overflow = 'hidden'; }
        else       { nav.classList.remove('active'); document.body.style.overflow = 'auto'; }
    };

    if (mobileMenuBtn && nav) mobileMenuBtn.addEventListener('click', () => toggleMenu(true));
    if (mobileMenuClose)      mobileMenuClose.addEventListener('click', () => toggleMenu(false));
    document.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', () => toggleMenu(false)));

    // =========================================================
    // HEADER SCROLL EFFECT
    // =========================================================
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 10);
    });

    // =========================================================
    // INTERSECTION OBSERVER — FADE IN ANIMATIONS
    // =========================================================
    const faders = document.querySelectorAll('.fade-in');
    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    faders.forEach(fader => appearOnScroll.observe(fader));
    setTimeout(() => window.dispatchEvent(new Event('scroll')), 100);

    // =========================================================
    // TOAST NOTIFICATION SYSTEM
    // =========================================================
    const toastContainer = document.getElementById('toast-container');

    const ICONS = {
        success: `<svg class="toast-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
        error:   `<svg class="toast-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`
    };

    const showToast = (message, type = 'success', duration = 5000) => {
        if (!toastContainer) return;
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            ${ICONS[type] || ''}
            <span class="toast-message">${message}</span>
            <button class="toast-dismiss" aria-label="Dismiss">&times;</button>
        `;
        toastContainer.appendChild(toast);

        const dismiss = () => {
            toast.classList.add('toast-exit');
            setTimeout(() => toast.remove(), 350);
        };

        toast.querySelector('.toast-dismiss').addEventListener('click', dismiss);
        setTimeout(dismiss, duration);
    };

    // =========================================================
    // BLOG MODAL (legacy — kept for blog read buttons)
    // =========================================================
    const blogModal    = document.getElementById('global-modal');
    const modalTitle   = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    const modalClose   = document.getElementById('modal-close');

    const openBlogModal = (title, contentHTML) => {
        if (!blogModal) return;
        modalTitle.innerText = title;
        modalContent.innerHTML = contentHTML;
        blogModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeBlogModal = () => {
        if (!blogModal) return;
        blogModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        setTimeout(() => { modalContent.innerHTML = ''; modalTitle.innerText = ''; }, 400);
    };

    if (modalClose) modalClose.addEventListener('click', closeBlogModal);
    if (blogModal)  blogModal.addEventListener('click', e => { if (e.target === blogModal) closeBlogModal(); });

    const getBlogContent = (title) => `
        <div class="blog-article-content">
            <p><strong>${title}</strong></p>
            <p>This is a premium placeholder article providing real clinical insight. In a real-world scenario, this section would cover extensive details about phlebotomy techniques and industry growth.</p>
            <p>Gaining hands-on experience in a live NHS environment prepares our candidates directly for the rigorous demands of real hospital wards.</p>
            <br>
            <h3>Next Steps</h3>
            <p>Ready to start your journey? <a href="#" onclick="document.getElementById('modal-close').click(); return false;">Close this window</a> and explore our course modules.</p>
        </div>
    `;

    document.querySelectorAll('.blog-read-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            const parentCard = btn.closest('.card-content');
            const title = parentCard ? parentCard.querySelector('h3').innerText : 'Phlebotomy Insight';
            openBlogModal(title, getBlogContent(title));
        });
    });

    // =========================================================
    // REGISTRATION MODAL — OPEN / CLOSE
    // =========================================================
    const regModal       = document.getElementById('registration-modal');
    const regModalClose  = document.getElementById('reg-modal-close');
    const regCourseInput = document.getElementById('reg-course');
    const regForm        = document.getElementById('registration-form');

    const openRegModal = (courseName) => {
        if (!regModal) return;
        if (regForm) {
            regForm.reset();
            if (regCourseInput) regCourseInput.value = courseName;
            clearAllErrors();
        }
        regModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            const firstInput = regForm && regForm.querySelector('#reg-name');
            if (firstInput) firstInput.focus();
        }, 420);
    };

    const closeRegModal = () => {
        if (!regModal) return;
        regModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    if (regModalClose) regModalClose.addEventListener('click', closeRegModal);
    if (regModal) {
        regModal.addEventListener('click', e => {
            if (e.target === regModal) closeRegModal();
        });
    }

    // Close modals with Escape key
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            if (regModal  && regModal.classList.contains('active'))  closeRegModal();
            if (blogModal && blogModal.classList.contains('active')) closeBlogModal();
        }
    });

    // =========================================================
    // COURSE BOOK BUTTONS -> OPEN REGISTRATION MODAL
    // =========================================================
    document.querySelectorAll('.course-book-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            const courseName = btn.dataset.course || 'General Course Enquiry';
            openRegModal(courseName);
        });
    });

    // =========================================================
    // FORM VALIDATION
    // =========================================================
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const PHONE_REGEX = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{3,10}[-\s\.]?[0-9]{0,6}$/;

    const setError = (fieldId, errorId, message) => {
        const field = document.getElementById(fieldId);
        const error = document.getElementById(errorId);
        if (!field || !error) return;
        const group = field.closest('.reg-form-group');
        error.textContent = message;
        if (group) {
            group.classList.remove('has-error');
            void group.offsetWidth; // force reflow to re-trigger animation
            group.classList.add('has-error');
        }
    };

    const clearError = (fieldId, errorId) => {
        const field = document.getElementById(fieldId);
        const error = document.getElementById(errorId);
        if (!field || !error) return;
        const group = field.closest('.reg-form-group');
        if (group) group.classList.remove('has-error');
        error.textContent = '';
    };

    const clearAllErrors = () => {
        ['name', 'email', 'phone'].forEach(key => clearError(`reg-${key}`, `error-${key}`));
    };

    const validateForm = () => {
        let valid = true;
        clearAllErrors();

        const name  = document.getElementById('reg-name');
        const email = document.getElementById('reg-email');
        const phone = document.getElementById('reg-phone');

        if (!name || !name.value.trim()) {
            setError('reg-name', 'error-name', 'Full name is required.');
            valid = false;
        } else if (name.value.trim().length < 2) {
            setError('reg-name', 'error-name', 'Please enter your full name.');
            valid = false;
        }

        if (!email || !email.value.trim()) {
            setError('reg-email', 'error-email', 'Email address is required.');
            valid = false;
        } else if (!EMAIL_REGEX.test(email.value.trim())) {
            setError('reg-email', 'error-email', 'Please enter a valid email address.');
            valid = false;
        }

        if (!phone || !phone.value.trim()) {
            setError('reg-phone', 'error-phone', 'Phone number is required.');
            valid = false;
        } else if (!PHONE_REGEX.test(phone.value.replace(/\s/g, ''))) {
            setError('reg-phone', 'error-phone', 'Please enter a valid phone number.');
            valid = false;
        }

        return valid;
    };

    // Clear errors on input
    ['reg-name', 'reg-email', 'reg-phone'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', () => {
            const key = id.replace('reg-', '');
            clearError(id, `error-${key}`);
        });
    });

    

    // =========================================================
    // EMAILJS CONFIGURATIONS (TWO ACCOUNTS)
    // =========================================================
    
    // ACCOUNT 1: Primary (Course Registrations)
    const ACCOUNT_1 = {
        PUBLIC_KEY:              'fXHWbeP_OH9tHHyV0',
        SERVICE_ID:              'service_34atkz4',
        OWNER_TEMPLATE_ID:       'template_rtfifv4',
        CUSTOMER_TEMPLATE_ID:    'template_ud27hbs'
    };

    // ACCOUNT 2: Dedicated (Contact Us Form & Newsletter)
    const ACCOUNT_2 = {
        PUBLIC_KEY:              'VML4DoCWxiJq-pDbb',
        SERVICE_ID:              'service_f0na50s',
        TEMPLATE_ID:             'template_nq6381s',
        NEWSLETTER_TEMPLATE_ID:  'template_o2lodua'
    };

    // Removed global emailjs.init to handle multiple accounts/keys explicitly per request.

    /**
     * Helper to handle basic EmailJS form submissions
     */
    const handleBasicForm = (formId, statusId, serviceId, templateId, publicKeyOrOptions = {}) => {
        const form = document.getElementById(formId);
        const statusDiv = statusId ? document.getElementById(statusId) : null;
        
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic validation for name/email if they exist
            const emailInput = form.querySelector('input[type="email"]');
            if (emailInput && emailInput.value && !EMAIL_REGEX.test(emailInput.value.trim())) {
                showToast('Please enter a valid email address.', 'error');
                return;
            }

            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText || submitBtn.textContent;
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;

            // Ensure the public key is passed explicitly to prevent account collision
            const sendOptions = {
                publicKey: typeof publicKeyOrOptions === 'string' ? publicKeyOrOptions : (publicKeyOrOptions.publicKey || ACCOUNT_1.PUBLIC_KEY)
            };
            
            emailjs.sendForm(serviceId, templateId, form, sendOptions)
                .then(() => {
                    if (statusDiv) {
                        statusDiv.style.display = 'block';
                        statusDiv.style.backgroundColor = 'rgba(34, 211, 238, 0.1)';
                        statusDiv.style.border = '1px solid var(--cyan-electric)';
                        statusDiv.style.color = 'var(--cyan-electric)';
                        statusDiv.innerText = 'Success! Your message has been sent.';
                    } else {
                        showToast('Success! Your message has been sent.', 'success');
                    }
                    form.reset();
                })
                .catch((error) => {
                    if (statusDiv) {
                        statusDiv.style.display = 'block';
                        statusDiv.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                        statusDiv.style.border = '1px solid #ef4444';
                        statusDiv.style.color = '#ef4444';
                        statusDiv.innerText = 'Oops! There was a problem sending your message.';
                    } else {
                        showToast('Oops! Failed to send your message. Please try again.', 'error');
                    }
                    console.error('[EmailJS] FAILED...', error, {
                        serviceId,
                        templateId,
                        formId
                    });
                })
                .finally(() => {
                    submitBtn.innerText = originalText;
                    submitBtn.disabled = false;
                });
        });
    };

    // Registration Form (Double Email Notification - ACCOUNT 1)
    if (regForm) {
        regForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (typeof validateForm === 'function' && !validateForm()) {
                return;
            }

            const submitBtn = document.getElementById('reg-submit-btn');
            const btnText = submitBtn.querySelector('.btn-text');
            const originalText = btnText ? btnText.innerText : 'Register Now';
            
            if (btnText) btnText.innerText = 'Sending...';
            submitBtn.disabled = true;

            // Using ACCOUNT 1 credentials
            const sendOptions = { publicKey: ACCOUNT_1.PUBLIC_KEY };
            const sendOwner = emailjs.sendForm(ACCOUNT_1.SERVICE_ID, ACCOUNT_1.OWNER_TEMPLATE_ID, regForm, sendOptions);
            const sendCustomer = emailjs.sendForm(ACCOUNT_1.SERVICE_ID, ACCOUNT_1.CUSTOMER_TEMPLATE_ID, regForm, sendOptions);

            Promise.all([sendOwner, sendCustomer])
                .then(() => {
                    showToast('Registration received! Please check your email.', 'success');
                    if (typeof closeRegModal === 'function') closeRegModal();
                    regForm.reset();
                })
                .catch((error) => {
                    showToast('Failed to send registration. Please try again.', 'error');
                    console.error('FAILED...', error);
                })
                .finally(() => {
                    if (btnText) btnText.innerText = originalText;
                    submitBtn.disabled = false;
                });
        });
    }

    // Contact Form (Dedicated Account - ACCOUNT 2)
    handleBasicForm(
        'main-contact-form', 
        'contact-status', 
        ACCOUNT_2.SERVICE_ID, 
        ACCOUNT_2.TEMPLATE_ID, 
        ACCOUNT_2.PUBLIC_KEY
    );

    // =========================================================
    // FOOTER NEWSLETTER — EmailJS (ACCOUNT 2)
    // =========================================================
    handleBasicForm(
        'footer-newsletter',
        null,
        ACCOUNT_2.SERVICE_ID,
        ACCOUNT_2.NEWSLETTER_TEMPLATE_ID,
        ACCOUNT_2.PUBLIC_KEY
    );

    // =========================================================
    // DIPLOMA SECTION NEWSLETTER (#newsletter-form) — EmailJS
    // =========================================================
    const diplomaNewsletterForm = document.getElementById('newsletter-form');
    if (diplomaNewsletterForm) {
        diplomaNewsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const emailInput   = diplomaNewsletterForm.querySelector('input[type="email"]');
            const submitBtn    = diplomaNewsletterForm.querySelector('button[type="submit"]');
            const statusDiv    = diplomaNewsletterForm.querySelector('.form-status');
            const originalText = submitBtn ? (submitBtn.innerText || submitBtn.textContent) : 'Subscribe';

            if (!emailInput || !EMAIL_REGEX.test(emailInput.value.trim())) {
                showToast('Please enter a valid email address.', 'error');
                return;
            }

            if (submitBtn) { submitBtn.innerText = 'Sending...'; submitBtn.disabled = true; }

            const templateParams = {
                from_email: emailInput.value.trim(),
                to_email:   emailInput.value.trim(),
                reply_to:   emailInput.value.trim()
            };

            emailjs.send(
                ACCOUNT_2.SERVICE_ID,
                ACCOUNT_2.NEWSLETTER_TEMPLATE_ID,
                templateParams,
                { publicKey: ACCOUNT_2.PUBLIC_KEY }
            )
            .then(() => {
                showToast('🎉 You\'re on the list! We\'ll notify you when priority access opens.', 'success', 6000);
                if (statusDiv) {
                    statusDiv.style.display = 'block';
                    statusDiv.style.color   = 'var(--cyan-electric)';
                    statusDiv.innerText     = '✅ Subscribed! Check your email for confirmation.';
                }
                diplomaNewsletterForm.reset();
            })
            .catch((err) => {
                showToast('Failed to subscribe. Please try again or email us directly.', 'error');
                console.error('[EmailJS Newsletter] FAILED:', err);
            })
            .finally(() => {
                if (submitBtn) { submitBtn.innerText = originalText; submitBtn.disabled = false; }
            });
        });
    }

    // Placeholder alerts for other links
    const placeholderLinks = document.querySelectorAll('a[href="#"]:not([class*="mobile-menu-btn"]):not(.course-book-btn):not(.blog-read-btn)');
    placeholderLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showToast('This feature is coming soon!', 'success');
        });
    });
});
