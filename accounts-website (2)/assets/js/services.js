// Services Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeServicesPage();
});

function initializeServicesPage() {
    setupSearch();
    setupCategoryFilters();
    setupScrollToTop();
    setupLazyLoading();
}

// Search Functionality
function setupSearch() {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput) {
        searchInput.addEventListener('input', debounce(performSearch, 300));
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch();
            }
        });
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }
}

function performSearch() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase().trim();
    const serviceItems = document.querySelectorAll('.service-item');
    const categorySection = document.querySelectorAll('.service-category-section');
    const noResults = document.getElementById('no-results');
    
    let hasResults = false;
    
    if (searchTerm === '') {
        // Show all items if search is empty
        serviceItems.forEach(item => {
            item.classList.remove('hidden');
        });
        categorySection.forEach(section => {
            section.classList.remove('hidden');
        });
        noResults.classList.remove('show');
        return;
    }
    
    // Hide all categories first
    categorySection.forEach(section => {
        section.classList.add('hidden');
    });
    
    serviceItems.forEach(item => {
        const title = item.querySelector('h4').textContent.toLowerCase();
        const summary = item.querySelector('.service-summary').textContent.toLowerCase();
        const details = item.querySelector('.service-details');
        let detailsText = '';
        
        if (details) {
            detailsText = details.textContent.toLowerCase();
        }
        
        const isMatch = title.includes(searchTerm) || 
                       summary.includes(searchTerm) || 
                       detailsText.includes(searchTerm);
        
        if (isMatch) {
            item.classList.remove('hidden');
            // Show parent category
            const parentCategory = item.closest('.service-category-section');
            if (parentCategory) {
                parentCategory.classList.remove('hidden');
            }
            hasResults = true;
        } else {
            item.classList.add('hidden');
        }
    });
    
    // Show/hide no results message
    if (hasResults) {
        noResults.classList.remove('show');
    } else {
        noResults.classList.add('show');
    }
    
    // Hide empty categories
    categorySection.forEach(section => {
        const visibleItems = section.querySelectorAll('.service-item:not(.hidden)');
        if (visibleItems.length === 0) {
            section.classList.add('hidden');
        }
    });
}

// Category Filters
function setupCategoryFilters() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            filterByCategory(category);
            
            // Update active button
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function filterByCategory(category) {
    const categorySection = document.querySelectorAll('.service-category-section');
    const searchInput = document.getElementById('search-input');
    const noResults = document.getElementById('no-results');
    
    // Clear search
    if (searchInput) {
        searchInput.value = '';
    }
    
    noResults.classList.remove('show');
    
    if (category === 'all') {
        categorySection.forEach(section => {
            section.classList.remove('hidden');
            const serviceItems = section.querySelectorAll('.service-item');
            serviceItems.forEach(item => item.classList.remove('hidden'));
        });
    } else {
        categorySection.forEach(section => {
            if (section.id === category) {
                section.classList.remove('hidden');
                const serviceItems = section.querySelectorAll('.service-item');
                serviceItems.forEach(item => item.classList.remove('hidden'));
            } else {
                section.classList.add('hidden');
            }
        });
    }
    
    // Scroll to services content
    const servicesContent = document.querySelector('.services-content');
    if (servicesContent) {
        servicesContent.scrollIntoView({ behavior: 'smooth' });
    }
}

// Toggle Service Details
function toggleDetails(button) {
    const serviceItem = button.closest('.service-item');
    const details = serviceItem.querySelector('.service-details');
    
    if (details.classList.contains('show')) {
        details.classList.remove('show');
        button.textContent = 'عرض المزيد';
        button.classList.remove('expanded');
    } else {
        details.classList.add('show');
        button.textContent = 'إخفاء التفاصيل';
        button.classList.add('expanded');
        
        // Scroll to details
        setTimeout(() => {
            details.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'nearest' 
            });
        }, 100);
    }
}

// Scroll to Top
function setupScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    });
    
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    scrollBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
    });
    
    scrollBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
    });
}

// Lazy Loading for Better Performance
function setupLazyLoading() {
    const serviceItems = document.querySelectorAll('.service-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    serviceItems.forEach(item => {
        observer.observe(item);
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Smooth Scrolling for Navigation Links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const navHeight = document.querySelector('.services-nav').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Service Item Hover Effects
document.addEventListener('DOMContentLoaded', function() {
    const serviceItems = document.querySelectorAll('.service-item');
    
    serviceItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Print Functionality
function printServices() {
    window.print();
}

// Export Services List
function exportServices() {
    const services = [];
    const serviceItems = document.querySelectorAll('.service-item:not(.hidden)');
    
    serviceItems.forEach(item => {
        const title = item.querySelector('h4').textContent;
        const price = item.querySelector('.price').textContent;
        const summary = item.querySelector('.service-summary').textContent;
        
        services.push({
            title: title,
            price: price,
            summary: summary
        });
    });
    
    const dataStr = JSON.stringify(services, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = 'services-list.json';
    link.click();
}

// Keyboard Navigation
document.addEventListener('keydown', function(e) {
    // Escape key to close expanded details
    if (e.key === 'Escape') {
        const expandedButtons = document.querySelectorAll('.expand-btn.expanded');
        expandedButtons.forEach(btn => {
            toggleDetails(btn);
        });
    }
    
    // Ctrl+F to focus search
    if (e.ctrlKey && e.key === 'f') {
        e.preventDefault();
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.focus();
            searchInput.select();
        }
    }
});

// Analytics and Tracking
function trackServiceView(serviceName) {
    // Add analytics tracking here
    console.log('Service viewed:', serviceName);
}

function trackServiceExpand(serviceName) {
    // Add analytics tracking here
    console.log('Service details expanded:', serviceName);
}

// Add tracking to expand buttons
document.addEventListener('DOMContentLoaded', function() {
    const expandButtons = document.querySelectorAll('.expand-btn');
    
    expandButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const serviceName = this.closest('.service-item').querySelector('h4').textContent;
            trackServiceExpand(serviceName);
        });
    });
});

// Responsive Menu Toggle for Mobile
function toggleMobileMenu() {
    const navCategories = document.querySelector('.nav-categories');
    navCategories.classList.toggle('mobile-open');
}

// Add mobile menu styles
const mobileStyles = `
    @media (max-width: 768px) {
        .nav-categories {
            display: none;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            padding: 1rem;
            z-index: 1000;
        }
        
        .nav-categories.mobile-open {
            display: flex;
        }
        
        .mobile-menu-toggle {
            display: block;
            background: none;
            border: none;
            font-size: 1.5rem;
            color: #667eea;
            cursor: pointer;
        }
    }
    
    @media (min-width: 769px) {
        .mobile-menu-toggle {
            display: none;
        }
    }
`;

// Add mobile styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = mobileStyles;
document.head.appendChild(styleSheet);

// Service Rating System (Future Enhancement)
function rateService(serviceId, rating) {
    // Implementation for service rating
    console.log(`Service ${serviceId} rated: ${rating} stars`);
}

// Service Booking System (Future Enhancement)
function bookService(serviceId) {
    // Implementation for service booking
    console.log(`Booking service: ${serviceId}`);
}

// Live Chat Integration (Future Enhancement)
function initializeLiveChat() {
    // Implementation for live chat
    console.log('Live chat initialized');
}

// Service Comparison (Future Enhancement)
function compareServices(serviceIds) {
    // Implementation for service comparison
    console.log('Comparing services:', serviceIds);
}

// Price Calculator (Future Enhancement)
function calculatePrice(serviceId, options) {
    // Implementation for price calculation
    console.log('Calculating price for:', serviceId, options);
}

// Service Availability Check (Future Enhancement)
function checkAvailability(serviceId) {
    // Implementation for availability check
    console.log('Checking availability for:', serviceId);
}

// Emergency Service Request (Future Enhancement)
function requestEmergencyService(serviceId) {
    // Implementation for emergency service request
    console.log('Emergency service requested:', serviceId);
}

// Service Feedback System (Future Enhancement)
function submitFeedback(serviceId, feedback) {
    // Implementation for feedback submission
    console.log('Feedback submitted for:', serviceId, feedback);
}

// Service Recommendation Engine (Future Enhancement)
function getRecommendations(userPreferences) {
    // Implementation for service recommendations
    console.log('Getting recommendations for:', userPreferences);
}

// Service History Tracking (Future Enhancement)
function trackServiceHistory(userId) {
    // Implementation for service history tracking
    console.log('Tracking service history for user:', userId);
}

