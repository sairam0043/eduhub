// Page Navigation
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        
        // Handle form submissions
        if (pageId === 'login-page') {
            handleLoginForm();
        } else if (pageId === 'signup-page') {
            handleSignupForm();
        } else if (pageId === 'dashboard-page') {
            // Auto-redirect to dashboard after successful login/signup
            console.log('Dashboard loaded');
        }
    }
}

// Login Form Handling
function handleLoginForm() {
    const loginForm = document.querySelector('#login-page .auth-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            // Basic validation
            if (!email || !password) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate login process
            showNotification('Logging in...', 'info');
            
            setTimeout(() => {
                showNotification('Login successful!', 'success');
                showPage('dashboard-page');
            }, 1500);
        });
    }
}

// Signup Form Handling
function handleSignupForm() {
    const signupForm = document.querySelector('#signup-page .auth-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            const confirmPassword = document.getElementById('signup-confirm-password').value;
            const role = document.getElementById('signup-role').value;
            
            // Basic validation
            if (!name || !email || !password || !confirmPassword || !role) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            if (password.length < 6) {
                showNotification('Password must be at least 6 characters long', 'error');
                return;
            }
            
            if (password !== confirmPassword) {
                showNotification('Passwords do not match', 'error');
                return;
            }
            
            // Simulate signup process
            showNotification('Creating account...', 'info');
            
            setTimeout(() => {
                showNotification('Account created successfully!', 'success');
                showPage('dashboard-page');
            }, 1500);
        });
    }
}

// Email Validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        max-width: 300px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 3000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        info: 'fa-info-circle',
        warning: 'fa-exclamation-triangle'
    };
    return icons[type] || icons.info;
}

function getNotificationColor(type) {
    const colors = {
        success: '#50C878',
        error: '#FF6B35',
        info: '#4A90E2',
        warning: '#FFA500'
    };
    return colors[type] || colors.info;
}

// Accordion Functionality
function toggleAccordion(optionId) {
    const optionCard = document.querySelector(`[onclick="toggleAccordion('${optionId}')"]`);
    const content = document.getElementById(optionId);
    
    if (optionCard && content) {
        // Close all other accordions
        const allOptionCards = document.querySelectorAll('.option-card');
        allOptionCards.forEach(card => {
            if (card !== optionCard) {
                card.classList.remove('active');
            }
        });
        
        // Toggle current accordion
        optionCard.classList.toggle('active');
    }
}

// Testimonial Slider
let currentTestimonialIndex = 0;
const testimonials = document.querySelectorAll('.testimonial');

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.classList.toggle('active', i === index);
    });
    
    // Update dots
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function currentTestimonial(index) {
    currentTestimonialIndex = index - 1;
    showTestimonial(currentTestimonialIndex);
}

// Auto-rotate testimonials
function autoRotateTestimonials() {
    if (testimonials.length > 0) {
        currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
        showTestimonial(currentTestimonialIndex);
    }
}

// Initialize auto-rotation
if (testimonials.length > 0) {
    setInterval(autoRotateTestimonials, 5000);
}

// Filter Functionality
function initializeFilters() {
    const domainFilter = document.getElementById('domain-filter');
    const durationFilter = document.getElementById('duration-filter');
    
    if (domainFilter) {
        domainFilter.addEventListener('change', filterInternships);
    }
    
    if (durationFilter) {
        durationFilter.addEventListener('change', filterInternships);
    }
}

function filterInternships() {
    const domainFilter = document.getElementById('domain-filter').value;
    const durationFilter = document.getElementById('duration-filter').value;
    const internshipCards = document.querySelectorAll('.internship-card');
    
    internshipCards.forEach(card => {
        let showCard = true;
        
        // Domain filter
        if (domainFilter) {
            const skills = card.querySelectorAll('.skill-tag');
            const hasMatchingDomain = Array.from(skills).some(skill => {
                const skillText = skill.textContent.toLowerCase();
                const domainKeywords = {
                    'tech': ['javascript', 'react', 'node.js', 'python', 'java'],
                    'marketing': ['social media', 'analytics', 'content'],
                    'finance': ['excel', 'financial', 'data analysis'],
                    'design': ['figma', 'adobe', 'prototyping', 'ui', 'ux']
                };
                
                return domainKeywords[domainFilter] && 
                       domainKeywords[domainFilter].some(keyword => 
                           skillText.includes(keyword)
                       );
            });
            
            if (!hasMatchingDomain) {
                showCard = false;
            }
        }
        
        // Duration filter
        if (durationFilter && showCard) {
            const durationText = card.querySelector('.duration').textContent;
            const duration = parseInt(durationText);
            
            switch (durationFilter) {
                case '1-3':
                    if (duration < 1 || duration > 3) showCard = false;
                    break;
                case '3-6':
                    if (duration < 3 || duration > 6) showCard = false;
                    break;
                case '6+':
                    if (duration < 6) showCard = false;
                    break;
            }
        }
        
        // Show/hide card
        card.style.display = showCard ? 'flex' : 'none';
    });
}

// Social Login Buttons
function initializeSocialButtons() {
    const socialButtons = document.querySelectorAll('.social-btn');
    
    socialButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const platform = this.classList.contains('google') ? 'Google' :
                           this.classList.contains('linkedin') ? 'LinkedIn' :
                           this.classList.contains('github') ? 'GitHub' : 'Social';
            
            showNotification(`${platform} login coming soon!`, 'info');
        });
    });
}

// Apply Button Functionality
function initializeApplyButtons() {
    const applyButtons = document.querySelectorAll('.internship-card .btn-primary');
    
    applyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const internshipCard = this.closest('.internship-card');
            const position = internshipCard.querySelector('h3').textContent;
            const company = internshipCard.querySelector('.company-name').textContent;
            
            showNotification(`Application submitted for ${position} at ${company}!`, 'success');
            
            // Update button state
            this.textContent = 'Applied';
            this.style.background = '#50C878';
            this.disabled = true;
        });
    });
}

// Book Session Button Functionality
function initializeBookSessionButtons() {
    const bookButtons = document.querySelectorAll('.mentor-card .btn-primary');
    
    bookButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const mentorCard = this.closest('.mentor-card');
            const mentorName = mentorCard.querySelector('h3').textContent;
            
            showNotification(`Booking session with ${mentorName}...`, 'info');
            
            setTimeout(() => {
                showNotification(`Session booked with ${mentorName}! Check your email for details.`, 'success');
            }, 1500);
        });
    });
}

// Chatbot Functionality
function initializeChatbot() {
    const chatbotBtn = document.querySelector('.chatbot-btn');
    
    if (chatbotBtn) {
        chatbotBtn.addEventListener('click', function() {
            showNotification('Chatbot feature coming soon!', 'info');
        });
    }
}

// Smooth Scrolling for Internal Links
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add CSS animations
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        
        .notification-content i {
            font-size: 1.2rem;
        }
    `;
    document.head.appendChild(style);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    addAnimationStyles();
    initializeSocialButtons();
    initializeApplyButtons();
    initializeBookSessionButtons();
    initializeChatbot();
    initializeFilters();
    initializeSmoothScrolling();
    
    // Show welcome page by default
    showPage('welcome-page');
    
    console.log('Edu Hub initialized successfully!');
});

// Handle browser back/forward buttons
window.addEventListener('popstate', function(e) {
    // This would handle browser navigation if needed
    // For now, we'll keep it simple with the current implementation
});

// Export functions for global access
window.showPage = showPage;
window.toggleAccordion = toggleAccordion;
window.currentTestimonial = currentTestimonial;
