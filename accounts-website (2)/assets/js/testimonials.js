// Testimonials Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeTestimonialsPage();
});

function initializeTestimonialsPage() {
    setupTelegramButtons();
    setupFAQToggle();
    setupAnimations();
    setupNavigation();
}

// Telegram Functions
function openTelegramChannel() {
    // Show loading message
    showNotification('جاري توجيهك إلى قناة تليجرام...', 'info');
    
    // Track click
    trackEvent('telegram_channel_click', 'testimonials');
    
    // Simulate opening telegram channel
    setTimeout(() => {
        // Replace with actual telegram channel link when available
        // window.open('https://t.me/abunawaf_testimonials', '_blank');
        showNotification('رابط قناة تليجرام سيتم توفيره قريباً', 'warning');
    }, 1000);
}

function openTelegramChat() {
    // Show loading message
    showNotification('جاري توجيهك للدردشة المباشرة...', 'info');
    
    // Track click
    trackEvent('telegram_chat_click', 'testimonials');
    
    // Simulate opening telegram chat
    setTimeout(() => {
        // Replace with actual telegram chat link when available
        // window.open('https://t.me/abunawaf_support', '_blank');
        showNotification('رابط الدردشة سيتم توفيره قريباً', 'warning');
    }, 1000);
}

function redirectToTelegram() {
    openTelegramChannel();
}

// Setup Telegram Buttons
function setupTelegramButtons() {
    const telegramButtons = document.querySelectorAll('.telegram-btn, .cta-button');
    
    telegramButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Handle different button types
            if (this.classList.contains('primary') || this.classList.contains('cta-button')) {
                openTelegramChannel();
            } else if (this.classList.contains('secondary')) {
                openTelegramChat();
            }
        });
    });
}

// FAQ Toggle
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const answer = faqItem.querySelector('.faq-answer');
    const icon = element.querySelector('i');
    
    // Close other open FAQs
    const allFAQs = document.querySelectorAll('.faq-item');
    allFAQs.forEach(item => {
        if (item !== faqItem && item.classList.contains('active')) {
            item.classList.remove('active');
            item.querySelector('.faq-answer').style.maxHeight = '0';
            item.querySelector('.faq-question i').style.transform = 'rotate(0deg)';
        }
    });
    
    // Toggle current FAQ
    if (faqItem.classList.contains('active')) {
        faqItem.classList.remove('active');
        answer.style.maxHeight = '0';
        icon.style.transform = 'rotate(0deg)';
    } else {
        faqItem.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        icon.style.transform = 'rotate(180deg)';
    }
    
    // Track FAQ interaction
    trackEvent('faq_toggle', element.querySelector('h3').textContent);
}

function setupFAQToggle() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleFAQ(this);
            }
        });
        
        // Make focusable
        question.setAttribute('tabindex', '0');
        question.setAttribute('role', 'button');
        question.setAttribute('aria-expanded', 'false');
    });
}

// Animations
function setupAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '50px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.reason-card, .testimonial-card, .faq-item, .stat-card, .feature-item'
    );
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
    
    // Add CSS for animation
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// Navigation
function setupNavigation() {
    // Mobile navigation toggle
    window.toggleNavigation = function() {
        const navLinks = document.querySelector('.nav-links');
        const navToggle = document.querySelector('.nav-toggle');
        
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
        
        // Prevent body scroll when nav is open
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };
    
    // Close navigation when clicking outside
    document.addEventListener('click', function(e) {
        const navLinks = document.querySelector('.nav-links');
        const navToggle = document.querySelector('.nav-toggle');
        
        if (!e.target.closest('.nav-content') && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Close navigation on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const navLinks = document.querySelector('.nav-links');
            const navToggle = document.querySelector('.nav-toggle');
            
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
}

// Notification System (if not already defined in main script)
if (typeof showNotification === 'undefined') {
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="hideNotification(this.parentElement)">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${getNotificationColor(type)};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            z-index: 10001;
            transform: translateX(100%);
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 0.8rem;
            max-width: 400px;
            font-size: 0.9rem;
        `;
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            hideNotification(notification);
        }, 5000);
    }
    
    function hideNotification(notification) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
    
    function getNotificationIcon(type) {
        switch (type) {
            case 'success': return 'check-circle';
            case 'warning': return 'exclamation-triangle';
            case 'error': return 'exclamation-circle';
            default: return 'info-circle';
        }
    }
    
    function getNotificationColor(type) {
        switch (type) {
            case 'success': return '#4ade80';
            case 'warning': return '#f59e0b';
            case 'error': return '#ef4444';
            default: return '#667eea';
        }
    }
}

// Analytics tracking (if not already defined)
if (typeof trackEvent === 'undefined') {
    function trackEvent(action, category) {
        console.log('Event tracked:', action, category);
        
        // Send to analytics service if available
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                event_category: category
            });
        }
    }
}

// Smooth scroll to sections
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Copy telegram link functionality
function copyTelegramLink() {
    const telegramLink = 'https://t.me/abunawaf_testimonials'; // Replace with actual link
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(telegramLink).then(() => {
            showNotification('تم نسخ رابط تليجرام', 'success');
        }).catch(() => {
            fallbackCopyToClipboard(telegramLink);
        });
    } else {
        fallbackCopyToClipboard(telegramLink);
    }
    
    trackEvent('telegram_link_copied', 'testimonials');
}

function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showNotification('تم نسخ رابط تليجرام', 'success');
    } catch (err) {
        showNotification('فشل في النسخ', 'error');
    }
    
    document.body.removeChild(textArea);
}

// Share functionality
function shareTestimonials() {
    if (navigator.share) {
        navigator.share({
            title: 'آراء عملاء فريق ابونواف',
            text: 'شاهد آراء وتقييمات عملاء فريق ابونواف للأمن السيبراني',
            url: window.location.href
        }).then(() => {
            trackEvent('testimonials_shared', 'social_share');
        }).catch(err => {
            console.log('Error sharing:', err);
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        copyTelegramLink();
    }
}

// Initialize page when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('Testimonials page initialized');
    
    // Add any additional initialization here
    setupPageSpecificFeatures();
});

function setupPageSpecificFeatures() {
    // Add hover effects to testimonial cards
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add click tracking to read more buttons
    const readMoreButtons = document.querySelectorAll('.read-more-btn');
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            trackEvent('read_more_clicked', 'testimonials');
        });
    });
    
    // Add intersection observer for stats animation
    const statsCards = document.querySelectorAll('.stat-card');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumber(entry.target.querySelector('.stat-number'));
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsCards.forEach(card => statsObserver.observe(card));
}

function animateNumber(element) {
    const finalNumber = element.textContent;
    const isDecimal = finalNumber.includes('.');
    const hasPlus = finalNumber.includes('+');
    const hasPercent = finalNumber.includes('%');
    
    let number = parseFloat(finalNumber.replace(/[+%]/g, ''));
    let current = 0;
    const increment = number / 50; // 50 steps
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
            current = number;
            clearInterval(timer);
        }
        
        let displayNumber = isDecimal ? current.toFixed(1) : Math.floor(current);
        if (hasPlus) displayNumber += '+';
        if (hasPercent) displayNumber += '%';
        
        element.textContent = displayNumber;
    }, 30);
}

