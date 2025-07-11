// DOM Elements
const navButtons = document.querySelectorAll('.nav-btn');
const contentSections = document.querySelectorAll('.content-section');
const contactForm = document.getElementById('contactForm');

// Navigation functionality
navButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetSection = button.getAttribute('data-section');
        
        // Remove active class from all buttons and sections
        navButtons.forEach(btn => btn.classList.remove('active'));
        contentSections.forEach(section => section.classList.remove('active'));
        
        // Add active class to clicked button and target section
        button.classList.add('active');
        document.getElementById(targetSection).classList.add('active');
        
        // Smooth scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Contact form handling
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (!name || !email || !message) {
            showNotification('모든 필드를 입력해주세요.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('올바른 이메일 주소를 입력해주세요.', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('메시지가 성공적으로 전송되었습니다!', 'success');
        contactForm.reset();
    });
}

// Notification system
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
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll animations
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.content-card, .interest-item, .goal-item, .contact-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Add hover effects to interactive elements
function addHoverEffects() {
    const interactiveElements = document.querySelectorAll('.interest-item, .goal-item, .contact-item, .stat-item');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = this.style.transform.replace('translateY(0)', 'translateY(-5px)');
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = this.style.transform.replace('translateY(-5px)', 'translateY(0)');
        });
    });
}

// Typing animation for the name
function addTypingAnimation() {
    const nameElement = document.querySelector('.name');
    if (nameElement) {
        const text = nameElement.textContent;
        nameElement.textContent = '';
        nameElement.style.borderRight = '2px solid #667eea';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                nameElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                nameElement.style.borderRight = 'none';
            }
        };
        
        // Start typing animation after page load
        setTimeout(typeWriter, 1000);
    }
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    addScrollAnimations();
    addHoverEffects();
    addTypingAnimation();
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close any open modals or notifications
        const notifications = document.querySelectorAll('.notification');
        notifications.forEach(notification => notification.remove());
    }
});

// Add touch support for mobile devices
if ('ontouchstart' in window) {
    document.addEventListener('touchstart', function() {}, {passive: true});
}

// Contact functions
function sendEmail() {
    const email = 'novaman187101@naver.com';
    const subject = '조정한님께 문의드립니다';
    const body = '안녕하세요, 조정한님!\n\n문의사항을 작성해주세요.\n\n감사합니다.';
    
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Try to open email client
    try {
        window.open(mailtoLink);
        showNotification('이메일 클라이언트가 열렸습니다.', 'success');
    } catch (error) {
        // Fallback: copy email to clipboard
        navigator.clipboard.writeText(email).then(() => {
            showNotification('이메일 주소가 클립보드에 복사되었습니다.', 'success');
        }).catch(() => {
            showNotification('이메일 주소: ' + email, 'info');
        });
    }
}

function makeCall() {
    const phoneNumber = '010-3755-5028';
    
    // Try to make phone call
    try {
        window.open(`tel:${phoneNumber}`);
        showNotification('전화 연결을 시도합니다.', 'success');
    } catch (error) {
        // Fallback: copy phone number to clipboard
        navigator.clipboard.writeText(phoneNumber).then(() => {
            showNotification('전화번호가 클립보드에 복사되었습니다.', 'success');
        }).catch(() => {
            showNotification('전화번호: ' + phoneNumber, 'info');
        });
    }
}

// Performance optimization: Debounce scroll events
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

// Optimize scroll performance
const optimizedScrollHandler = debounce(() => {
    // Add any scroll-based animations here
}, 16);

window.addEventListener('scroll', optimizedScrollHandler); 