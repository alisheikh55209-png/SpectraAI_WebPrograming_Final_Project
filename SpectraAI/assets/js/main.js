/* ============================================
   SpectraAI Agency - Main JavaScript
   ============================================ */

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle and navbar click animation
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Add click animation class
            this.classList.add('nav-link-clicked');

            // Remove the class after animation completes
            setTimeout(() => {
                this.classList.remove('nav-link-clicked');
            }, 400);

            // Mobile menu toggle
            if (window.innerWidth < 992) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
            }
        });
    });
});

// Scroll reveal animations - Enhanced version below

// Typing animation for hero section - All Services
function initTypingAnimation() {
    const typingText = document.getElementById('typingText');
    if (!typingText) {
        // Retry if element not found yet
        setTimeout(initTypingAnimation, 100);
        return;
    }
    
    // All 12 services from the website
    const services = [
        'SEO',
        'Content Writing',
        'Web Design',
        'Web Development',
        'Social Media Marketing',
        'Google My Business',
        'Paid Ad Campaign',
        'Logo Design',
        'E-commerce',
        'CRM Software Development',
        'Mobile App Development',
        'Medical Billing'
    ];
    
    let currentIndex = 0;
    let currentText = '';
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        if (!typingText) return;
        
        const currentService = services[currentIndex];
        
        if (isDeleting) {
            // Deleting text - remove one character at a time
            if (currentText.length > 0) {
                currentText = currentService.substring(0, currentText.length - 1);
                typingSpeed = 50; // Faster when deleting
            } else {
                // Finished deleting, move to next service
                isDeleting = false;
                currentIndex = (currentIndex + 1) % services.length;
                typingSpeed = 500; // Pause before typing next service
            }
        } else {
            // Typing text - add one character at a time
            if (currentText.length < currentService.length) {
                currentText = currentService.substring(0, currentText.length + 1);
                typingSpeed = 100; // Normal typing speed
            } else {
                // Finished typing, pause then start deleting
                typingSpeed = 2000; // Pause for 2 seconds to read
                isDeleting = true;
            }
        }
        
        // Update text (cursor is added via CSS ::after)
        typingText.textContent = currentText;
        
        setTimeout(type, typingSpeed);
    }
    
    // Start typing immediately
    type();
}

// Initialize typing animation - Multiple methods to ensure it runs
function startTypingAnimation() {
    initTypingAnimation();
}

// Try multiple initialization methods
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startTypingAnimation);
} else {
    startTypingAnimation();
}

// Also try after window loads
window.addEventListener('load', function() {
    setTimeout(startTypingAnimation, 500);
});

// Also try immediately
setTimeout(startTypingAnimation, 100);



// Enhanced Portfolio filter with count
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const countElement = document.getElementById('count');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.dataset.filter;
            let visibleCount = 0;
            
            portfolioItems.forEach((item, index) => {
                if (filterValue === 'all' || item.dataset.category === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                        item.classList.add('reveal');
                        item.style.transitionDelay = `${index * 0.05}s`;
                    }, 10);
                    visibleCount++;
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    item.classList.remove('reveal');
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
            
            // Update count with animation
            if (countElement) {
                countElement.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    countElement.textContent = visibleCount;
                    countElement.style.transform = 'scale(1)';
                }, 200);
            }
        });
    });
});

// Who Are We Tabs
document.addEventListener('DOMContentLoaded', function() {
    const whoTabs = document.querySelectorAll('.who-tab');
    const whoTabContents = document.querySelectorAll('.who-tab-content');
    
    whoTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            whoTabs.forEach(t => t.classList.remove('active'));
            whoTabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
});

// Testimonials carousel auto-play
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('#testimonialsCarousel');
    if (carousel) {
        const carouselInstance = new bootstrap.Carousel(carousel, {
            interval: 8000,
            wrap: true,
            pause: 'hover'
        });
    }
});

// Form validation
function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        const errorElement = field.parentElement.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
        
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('is-invalid');
            const error = document.createElement('div');
            error.className = 'error-message text-danger mt-1';
            error.textContent = 'This field is required';
            field.parentElement.appendChild(error);
        } else {
            field.classList.remove('is-invalid');
            field.classList.add('is-valid');
            
            // Email validation
            if (field.type === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(field.value)) {
                    isValid = false;
                    field.classList.remove('is-valid');
                    field.classList.add('is-invalid');
                    const error = document.createElement('div');
                    error.className = 'error-message text-danger mt-1';
                    error.textContent = 'Please enter a valid email address';
                    field.parentElement.appendChild(error);
                }
            }
            
            // Phone validation
            if (field.type === 'tel') {
                const phoneRegex = /^[\d\s\-\+\(\)]+$/;
                if (!phoneRegex.test(field.value) || field.value.replace(/\D/g, '').length < 10) {
                    isValid = false;
                    field.classList.remove('is-valid');
                    field.classList.add('is-invalid');
                    const error = document.createElement('div');
                    error.className = 'error-message text-danger mt-1';
                    error.textContent = 'Please enter a valid phone number';
                    field.parentElement.appendChild(error);
                }
            }
        }
    });
    
    return isValid;
}

// Contact form submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('#contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                const submitBtn = this.querySelector('.btn-submit');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<span class="loading"></span> Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    submitBtn.innerHTML = '✓ Message Sent!';
                    submitBtn.style.background = 'linear-gradient(90deg, #28a745, #20c997)';
                    
                    // Reset form
                    setTimeout(() => {
                        this.reset();
                        submitBtn.innerHTML = originalText;
                        submitBtn.style.background = '';
                        submitBtn.disabled = false;
                        this.querySelectorAll('.is-valid').forEach(field => {
                            field.classList.remove('is-valid');
                        });
                    }, 3000);
                }, 2000);
            }
        });
        
        // Real-time validation
        const formFields = contactForm.querySelectorAll('input, textarea');
        formFields.forEach(field => {
            field.addEventListener('blur', function() {
                if (this.value.trim()) {
                    if (this.type === 'email') {
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (emailRegex.test(this.value)) {
                            this.classList.remove('is-invalid');
                            this.classList.add('is-valid');
                        } else {
                            this.classList.remove('is-valid');
                            this.classList.add('is-invalid');
                        }
                    } else {
                        this.classList.remove('is-invalid');
                        this.classList.add('is-valid');
                    }
                }
            });
        });
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Add reveal class to elements on page load with stagger
document.addEventListener('DOMContentLoaded', function() {
    const elementsToReveal = document.querySelectorAll('.service-card, .highlight-card, .portfolio-item, .blog-card, .testimonial-card');
    elementsToReveal.forEach((element, index) => {
        element.classList.add('reveal');
        element.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Add reveal-left and reveal-right classes
    const leftElements = document.querySelectorAll('.reveal-left');
    const rightElements = document.querySelectorAll('.reveal-right');
    const scaleElements = document.querySelectorAll('.reveal-scale');
    
    leftElements.forEach((element, index) => {
        element.style.transitionDelay = `${index * 0.15}s`;
    });
    
    rightElements.forEach((element, index) => {
        element.style.transitionDelay = `${index * 0.15}s`;
    });
    
    scaleElements.forEach((element, index) => {
        element.style.transitionDelay = `${index * 0.1}s`;
    });
});

// Enhanced scroll reveal observer with performance optimizations
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Add stagger effect for child elements
            const children = entry.target.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-fade');
            children.forEach((child, index) => {
                setTimeout(() => {
                    child.classList.add('active');
                }, index * 100);
            });
            // Stop observing once animated (performance optimization)
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe all reveal elements
document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-fade').forEach(element => {
    revealObserver.observe(element);
});

// Mobile-optimized scroll animations (reduced on mobile)
function isMobile() {
    return window.innerWidth <= 768;
}

// Initialize scroll animations with mobile considerations
function initScrollAnimations() {
    // Add reveal classes to elements that should animate on scroll
    const elementsToAnimate = [
        // Section headings
        '.discover-title',
        '.services-title',
        '.portfolio-main-title',
        '.who-title',
        '.stats-portfolio-title',
        '.testimonials-main-title',

        // Cards and content boxes
        '.service-card-new',
        '.portfolio-item',
        '.testimonial-card-new',
        '.stat-circle',

        // Images
        '.discover-main-image',
        '.hero-graphic',

        // Buttons (optional, subtle)
        '.btn-read-more',
        '.btn-get-started'
    ];

    elementsToAnimate.forEach(selector => {
        document.querySelectorAll(selector).forEach((element, index) => {
            // Skip animation on mobile for performance, or use reduced effects
            if (isMobile()) {
                element.classList.add('reveal-fade'); // Simple fade on mobile
            } else {
                // Desktop: varied animations based on element type
                if (selector.includes('title') || selector.includes('heading')) {
                    element.classList.add('reveal-scale'); // Scale effect for headings
                } else if (selector.includes('card') || selector.includes('item')) {
                    element.classList.add('reveal'); // Slide up for cards
                } else if (selector.includes('image') || selector.includes('graphic')) {
                    element.classList.add('reveal-scale'); // Scale for images
                } else {
                    element.classList.add('reveal-fade'); // Simple fade for others
                }
            }

            // Add staggered delay
            element.style.transitionDelay = `${index * 0.1}s`;
        });
    });

    // Re-observe elements after adding classes
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-fade').forEach(element => {
        revealObserver.observe(element);
    });
}

// Initialize animations on load
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
});

// Re-initialize on window resize (for mobile/desktop switching)
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        // Reset animations and re-initialize
        document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-fade').forEach(element => {
            element.classList.remove('active');
            revealObserver.observe(element);
        });
        initScrollAnimations();
    }, 250);
});

// Parallax effect for hero image
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroImage.style.opacity = 1 - (scrolled / 500);
    }
});

// Add floating animation to elements
document.querySelectorAll('.float-animation').forEach(element => {
    element.style.animationDelay = `${Math.random() * 2}s`;
});

// Add pulse animation to CTA buttons
document.querySelectorAll('.btn-primary-custom, .btn-submit').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.classList.add('pulse-animation');
    });
    button.addEventListener('mouseleave', function() {
        this.classList.remove('pulse-animation');
    });
});

// Initialize tooltips if Bootstrap is available
document.addEventListener('DOMContentLoaded', function() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

// Search functionality (placeholder)
document.addEventListener('DOMContentLoaded', function() {
    const searchIcon = document.querySelector('.search-icon');
    if (searchIcon) {
        searchIcon.addEventListener('click', function() {
            alert('Search functionality coming soon!');
        });
    }
});



// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Enhanced Stats Counter Animation - RELIABLE VERSION
function initEnhancedStatsCounters() {
    const statsSection = document.querySelector('.stats-section-new');
    if (!statsSection) return;

    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    // Function to animate a single counter
    function animateCounter(counter, target, duration = 2000) {
        if (!counter || !target || isNaN(target)) return;

        const start = 0;
        const startTime = performance.now();
        const suffix = counter.getAttribute('data-suffix') || '+';

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(start + (target - start) * easeOutQuart);

            counter.textContent = current.toLocaleString() + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    // Function to start all counter animations
    function startCounterAnimations() {
        if (hasAnimated) return;
        hasAnimated = true;

        // Animate each counter with staggered delay
        statNumbers.forEach((counter, index) => {
            const target = parseInt(counter.getAttribute('data-target'));

            if (target && !isNaN(target)) {
                // Reset to 0 and set suffix (preserve the + from original text)
                const suffix = '+'; // All stats use + suffix
                counter.setAttribute('data-suffix', suffix);
                counter.textContent = '0' + suffix;

                // Start animation with delay
                setTimeout(() => {
                    animateCounter(counter, target);
                }, index * 200);
            }
        });
    }

    // Intersection Observer to trigger animations when section comes into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                startCounterAnimations();
                // Stop observing after animation starts
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2, // Lower threshold for more reliable triggering
        rootMargin: '0px 0px -100px 0px' // Trigger earlier
    });

    observer.observe(statsSection);

    // Also trigger immediately if section is already visible on load
    // Use multiple checks with different delays to ensure reliability
    setTimeout(() => {
        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0 && !hasAnimated) {
            startCounterAnimations();
        }
    }, 100);

    setTimeout(() => {
        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0 && !hasAnimated) {
            startCounterAnimations();
        }
    }, 500);

    setTimeout(() => {
        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0 && !hasAnimated) {
            startCounterAnimations();
        }
    }, 1000);
}

// Initialize enhanced stats counters
document.addEventListener('DOMContentLoaded', function() {
    initEnhancedStatsCounters();
});

// Testimonials Pagination
document.addEventListener('DOMContentLoaded', function() {
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const prevBtn = document.getElementById('prev-testimonials');
    const nextBtn = document.getElementById('next-testimonials');
    const paginationIndicator = document.getElementById('pagination-indicator');

    let currentPage = 0;
    const totalPages = testimonialItems.length;

    function updatePagination() {
        // Hide all testimonial items
        testimonialItems.forEach(item => item.classList.remove('active'));

        // Show current page
        testimonialItems[currentPage].classList.add('active');

        // Update indicator
        paginationIndicator.textContent = `${currentPage + 1} / ${totalPages}`;

        // Update button states
        prevBtn.disabled = currentPage === 0;
        nextBtn.disabled = currentPage === totalPages - 1;
    }

    // Previous button click
    prevBtn.addEventListener('click', function() {
        if (currentPage > 0) {
            currentPage--;
            updatePagination();
        }
    });

    // Next button click
    nextBtn.addEventListener('click', function() {
        if (currentPage < totalPages - 1) {
            currentPage++;
            updatePagination();
        }
    });

    // Initialize pagination
    updatePagination();
});

