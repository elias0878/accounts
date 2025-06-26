// Contact Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeContactPage();
});

function initializeContactPage() {
    setupContactForm();
    setupFAQ();
    setupFormValidation();
    setupSocialTracking();
}

// Contact Form Handling
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this);
        });
    }
    
    // Real-time validation
    const formInputs = contactForm.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

// Form Submission Handler
function handleFormSubmission(form) {
    if (!validateForm(form)) {
        return;
    }
    
    // Show loading state
    form.classList.add('form-loading');
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
    submitBtn.disabled = true;
    
    // Collect form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Hide form and show success message
        form.style.display = 'none';
        document.getElementById('formSuccess').classList.add('show');
        
        // Track form submission
        trackFormSubmission(data);
        
        // Send notification email (if implemented)
        sendNotificationEmail(data);
        
        // Reset form after delay
        setTimeout(() => {
            form.reset();
            form.classList.remove('form-loading');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            form.style.display = 'block';
            document.getElementById('formSuccess').classList.remove('show');
        }, 5000);
        
    }, 2000);
}

// Form Validation
function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    const fieldName = field.name;
    
    // Clear previous errors
    clearFieldError(field);
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'هذا الحقل مطلوب');
        return false;
    }
    
    // Email validation
    if (fieldType === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'يرجى إدخال بريد إلكتروني صحيح');
            return false;
        }
    }
    
    // Phone validation
    if (fieldName === 'phone' && value) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(value)) {
            showFieldError(field, 'يرجى إدخال رقم هاتف صحيح');
            return false;
        }
    }
    
    // Name validation
    if (fieldName === 'name' && value) {
        if (value.length < 2) {
            showFieldError(field, 'الاسم يجب أن يكون أكثر من حرفين');
            return false;
        }
    }
    
    // Message validation
    if (fieldName === 'message' && value) {
        if (value.length < 10) {
            showFieldError(field, 'الرسالة يجب أن تكون أكثر من 10 أحرف');
            return false;
        }
    }
    
    return true;
}

function showFieldError(field, message) {
    const formGroup = field.closest('.form-group');
    
    // Remove existing error
    const existingError = formGroup.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #dc3545;
        font-size: 0.875rem;
        margin-top: 0.5rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    `;
    errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    
    formGroup.appendChild(errorDiv);
    
    // Add error styling to field
    field.style.borderColor = '#dc3545';
    field.style.boxShadow = '0 0 0 3px rgba(220, 53, 69, 0.1)';
}

function clearFieldError(field) {
    const formGroup = field.closest('.form-group');
    const errorDiv = formGroup.querySelector('.field-error');
    
    if (errorDiv) {
        errorDiv.remove();
    }
    
    // Reset field styling
    field.style.borderColor = '';
    field.style.boxShadow = '';
}

// FAQ Functionality
function setupFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faq => {
                faq.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Social Media Tracking
function setupSocialTracking() {
    const socialLinks = document.querySelectorAll('.social-card, .contact-btn, .emergency-btn');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function() {
            const platform = this.classList.contains('facebook') ? 'Facebook' :
                           this.classList.contains('instagram') ? 'Instagram' :
                           this.classList.contains('twitter') ? 'Twitter' :
                           this.classList.contains('telegram') ? 'Telegram' :
                           this.classList.contains('youtube') ? 'YouTube' :
                           this.classList.contains('linkedin') ? 'LinkedIn' :
                           this.classList.contains('whatsapp') ? 'WhatsApp' :
                           'Other';
            
            trackSocialClick(platform);
        });
    });
}

// Analytics Functions
function trackFormSubmission(data) {
    // Implementation for form submission tracking
    console.log('Form submitted:', data);
    
    // Example: Send to analytics service
    if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submit', {
            event_category: 'Contact',
            event_label: data.service || 'General'
        });
    }
}

function trackSocialClick(platform) {
    // Implementation for social media click tracking
    console.log('Social media clicked:', platform);
    
    // Example: Send to analytics service
    if (typeof gtag !== 'undefined') {
        gtag('event', 'social_click', {
            event_category: 'Social Media',
            event_label: platform
        });
    }
}

// Email Notification (if backend is available)
function sendNotificationEmail(data) {
    // Implementation for sending notification email
    console.log('Sending notification email for:', data);
    
    // Example API call (replace with actual endpoint)
    /*
    fetch('/api/send-notification', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log('Email sent successfully:', result);
    })
    .catch(error => {
        console.error('Error sending email:', error);
    });
    */
}

// Auto-save Form Data
function setupAutoSave() {
    const form = document.getElementById('contactForm');
    const formInputs = form.querySelectorAll('input, select, textarea');
    
    // Load saved data
    loadFormData();
    
    // Save data on input
    formInputs.forEach(input => {
        input.addEventListener('input', function() {
            saveFormData();
        });
    });
    
    // Clear saved data on successful submission
    form.addEventListener('submit', function() {
        clearSavedFormData();
    });
}

function saveFormData() {
    const form = document.getElementById('contactForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    localStorage.setItem('contactFormData', JSON.stringify(data));
}

function loadFormData() {
    const savedData = localStorage.getItem('contactFormData');
    
    if (savedData) {
        const data = JSON.parse(savedData);
        
        Object.keys(data).forEach(key => {
            const field = document.querySelector(`[name="${key}"]`);
            if (field && data[key]) {
                field.value = data[key];
            }
        });
    }
}

function clearSavedFormData() {
    localStorage.removeItem('contactFormData');
}

// Character Counter for Textarea
function setupCharacterCounter() {
    const messageField = document.getElementById('message');
    const maxLength = 1000;
    
    if (messageField) {
        const counter = document.createElement('div');
        counter.className = 'character-counter';
        counter.style.cssText = `
            text-align: left;
            margin-top: 0.5rem;
            font-size: 0.875rem;
            color: #666;
        `;
        
        messageField.parentNode.appendChild(counter);
        
        function updateCounter() {
            const currentLength = messageField.value.length;
            counter.textContent = `${currentLength}/${maxLength}`;
            
            if (currentLength > maxLength * 0.9) {
                counter.style.color = '#dc3545';
            } else if (currentLength > maxLength * 0.7) {
                counter.style.color = '#ffc107';
            } else {
                counter.style.color = '#666';
            }
        }
        
        messageField.addEventListener('input', updateCounter);
        updateCounter();
    }
}

// Form Field Animations
function setupFieldAnimations() {
    const formGroups = document.querySelectorAll('.form-group');
    
    formGroups.forEach(group => {
        const input = group.querySelector('input, select, textarea');
        const label = group.querySelector('label');
        
        if (input && label) {
            input.addEventListener('focus', function() {
                label.style.transform = 'translateY(-5px)';
                label.style.color = '#667eea';
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    label.style.transform = '';
                    label.style.color = '';
                }
            });
        }
    });
}

// Emergency Contact Functionality
function setupEmergencyContact() {
    const emergencyButtons = document.querySelectorAll('.emergency-btn');
    
    emergencyButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Track emergency contact usage
            trackEmergencyContact(this.textContent.trim());
            
            // Show confirmation for phone calls
            if (this.href.startsWith('tel:')) {
                const confirmed = confirm('هل تريد الاتصال بخدمة الطوارئ؟');
                if (!confirmed) {
                    event.preventDefault();
                }
            }
        });
    });
}

function trackEmergencyContact(type) {
    console.log('Emergency contact used:', type);
    
    // Send to analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'emergency_contact', {
            event_category: 'Contact',
            event_label: type
        });
    }
}

// Contact Method Recommendations
function setupContactRecommendations() {
    const serviceSelect = document.getElementById('service');
    const contactMethods = document.querySelector('.contact-methods');
    
    if (serviceSelect && contactMethods) {
        serviceSelect.addEventListener('change', function() {
            showRecommendedContact(this.value);
        });
    }
}

function showRecommendedContact(serviceType) {
    const recommendations = {
        'security': 'للأمن السيبراني، ننصح بالتواصل عبر تليجرام للحصول على استجابة سريعة',
        'recovery': 'لاستعادة البيانات، يفضل الاتصال المباشر لتقييم الحالة',
        'mobile': 'لخدمات الأجهزة المحمولة، واتساب هو الأسرع للتواصل',
        'websites': 'لأمان المواقع، البريد الإلكتروني مناسب لإرسال التفاصيل',
        'training': 'للتدريب والاستشارات، يمكن حجز مكالمة هاتفية',
        'other': 'للاستفسارات العامة، أي وسيلة تواصل مناسبة'
    };
    
    const recommendation = recommendations[serviceType];
    
    if (recommendation) {
        showNotification(recommendation, 'info');
    }
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4ade80' : type === 'error' ? '#ef4444' : '#667eea'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 0.8rem;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0;
        margin-left: 0.5rem;
    `;
    
    closeBtn.addEventListener('click', function() {
        hideNotification(notification);
    });
    
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

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        setupAutoSave();
        setupCharacterCounter();
        setupFieldAnimations();
        setupEmergencyContact();
        setupContactRecommendations();
    }, 1000);
});

// Service Worker Registration (for offline functionality)
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

// Contact Form Backup
function backupFormData() {
    const form = document.getElementById('contactForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Send to backup service
    fetch('/api/backup-form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            timestamp: new Date().toISOString(),
            data: data
        })
    }).catch(error => {
        console.log('Backup failed, using local storage');
        localStorage.setItem('formBackup_' + Date.now(), JSON.stringify(data));
    });
}

// Accessibility Enhancements
function setupAccessibility() {
    // Add ARIA labels
    const formInputs = document.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        const label = input.closest('.form-group').querySelector('label');
        if (label && !input.getAttribute('aria-label')) {
            input.setAttribute('aria-label', label.textContent);
        }
    });
    
    // Keyboard navigation for FAQ
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.setAttribute('tabindex', '0');
        question.setAttribute('role', 'button');
        question.setAttribute('aria-expanded', 'false');
        
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', function() {
    setupAccessibility();
});

