// Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

function initializeWebsite() {
    handleLoadingScreen();
    setupSocialLinks();
    setupActionButtons();
    setupAnimations();
    setupAccessibility();
}

// Loading Screen
function handleLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Hide loading screen after page loads
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1000);
    });
}

// Social Media Links
function setupSocialLinks() {
    const socialCards = document.querySelectorAll('.social-card');
    
    socialCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            
            const platform = this.classList[1]; // facebook, instagram, etc.
            trackSocialClick(platform);
            
            // Show message that links will be provided
            showNotification(`سيتم توفير رابط ${this.querySelector('h3').textContent} قريباً`, 'info');
        });
    });
}

// Action Buttons
function setupActionButtons() {
    // Services button
    const servicesBtn = document.querySelector('.action-card.primary');
    if (servicesBtn) {
        servicesBtn.addEventListener('click', function(e) {
            // Allow normal navigation to services.html
        });
    }
}

// Terms Modal
function showTermsModal() {
    const modal = document.getElementById('termsModal');
    const overlay = document.getElementById('overlay');
    
    modal.classList.add('show');
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // Track modal open
    trackEvent('modal_open', 'terms');
}

function closeTermsModal() {
    const modal = document.getElementById('termsModal');
    const overlay = document.getElementById('overlay');
    
    modal.classList.remove('show');
    overlay.classList.remove('show');
    document.body.style.overflow = '';
    
    // Track modal close
    trackEvent('modal_close', 'terms');
}

// Telegram Channel
function openTelegramChannel() {
    // Show message about Telegram channel
    showNotification('سيتم توجيهك إلى قناة تليجرام لمشاهدة آراء العملاء', 'info');
    
    // Track telegram click
    trackEvent('telegram_click', 'testimonials');
    
    // Open telegram channel (replace with actual link when available)
    setTimeout(() => {
        // window.open('https://t.me/your_channel', '_blank');
        showNotification('رابط قناة تليجرام سيتم توفيره قريباً', 'warning');
    }, 1000);
}

// Animations
function setupAnimations() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '50px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.social-card, .action-card, .info-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Accessibility
function setupAccessibility() {
    // Keyboard navigation for modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modal = document.querySelector('.modal.show');
            if (modal) {
                closeTermsModal();
            }
        }
    });
    
    // Focus management
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    
    // Trap focus in modal
    const modal = document.getElementById('termsModal');
    modal.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            const focusable = modal.querySelectorAll(focusableElements);
            const firstFocusable = focusable[0];
            const lastFocusable = focusable[focusable.length - 1];
            
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// Notification System
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
    
    // Close button styling
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0;
        margin-right: 0.5rem;
        opacity: 0.8;
        transition: opacity 0.3s ease;
    `;
    
    closeBtn.addEventListener('mouseenter', () => closeBtn.style.opacity = '1');
    closeBtn.addEventListener('mouseleave', () => closeBtn.style.opacity = '0.8');
    
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

// Analytics and Tracking
function trackSocialClick(platform) {
    console.log('Social media clicked:', platform);
    
    // Send to analytics service if available
    if (typeof gtag !== 'undefined') {
        gtag('event', 'social_click', {
            event_category: 'Social Media',
            event_label: platform
        });
    }
}

function trackEvent(action, category) {
    console.log('Event tracked:', action, category);
    
    // Send to analytics service if available
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category
        });
    }
}

// Overlay click handler
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('overlay')) {
        closeTermsModal();
    }
});

// Smooth scrolling for anchor links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Performance optimization
function optimizePerformance() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Preload critical resources
    const criticalResources = [
        'assets/css/style.css',
        'https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;900&display=swap'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = resource.includes('.css') ? 'style' : 'font';
        if (resource.includes('font')) {
            link.crossOrigin = 'anonymous';
        }
        document.head.appendChild(link);
    });
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', optimizePerformance);

// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(error) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    
    // Track error if analytics available
    if (typeof gtag !== 'undefined') {
        gtag('event', 'exception', {
            description: e.error.message,
            fatal: false
        });
    }
});

// Unhandled promise rejection handling
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    
    // Track error if analytics available
    if (typeof gtag !== 'undefined') {
        gtag('event', 'exception', {
            description: 'Unhandled promise rejection: ' + e.reason,
            fatal: false
        });
    }
});

// Page visibility API for analytics
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'hidden') {
        trackEvent('page_hidden', 'engagement');
    } else {
        trackEvent('page_visible', 'engagement');
    }
});

// Touch device detection
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

// Add touch class for touch devices
if (isTouchDevice()) {
    document.body.classList.add('touch-device');
}

// Resize handler for responsive adjustments
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Handle responsive adjustments
        adjustForViewport();
    }, 250);
});

function adjustForViewport() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Initialize viewport adjustments
adjustForViewport();

// Prevent zoom on double tap for iOS
let lastTouchEnd = 0;
document.addEventListener('touchend', function(event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Copy to clipboard functionality
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(function() {
            showNotification('تم النسخ إلى الحافظة', 'success');
        }).catch(function() {
            fallbackCopyToClipboard(text);
        });
    } else {
        fallbackCopyToClipboard(text);
    }
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
        showNotification('تم النسخ إلى الحافظة', 'success');
    } catch (err) {
        showNotification('فشل في النسخ', 'error');
    }
    
    document.body.removeChild(textArea);
}

// Initialize all functionality when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('Website initialized successfully');
});

