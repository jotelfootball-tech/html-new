// Form submission handler
function submitForm() {
    // Get form values
    const fullname = document.getElementById('fullname').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const experience = document.getElementById('experience').value;
    const motivation = document.getElementById('motivation').value.trim();

    // Validation
    if (!fullname) {
        showNotification('Please enter your full name', 'error');
        document.getElementById('fullname').focus();
        return;
    }

    if (!email || !isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        document.getElementById('email').focus();
        return;
    }

    if (!phone) {
        showNotification('Please enter your phone number', 'error');
        document.getElementById('phone').focus();
        return;
    }

    if (!motivation) {
        showNotification('Please tell us why you want to join Cohort 3', 'error');
        document.getElementById('motivation').focus();
        return;
    }

    // Create application data object
    const applicationData = {
        fullname,
        email,
        phone,
        experience: experience || 'Not specified',
        motivation,
        submittedAt: new Date().toISOString()
    };

    // Log the application data (in a real app, this would be sent to a server)
    console.log('Application Data:', applicationData);

    // Show success message
    showNotification('Application submitted successfully! We will contact you soon.', 'success');

    // Optionally reset the form after successful submission
    setTimeout(() => {
        if (confirm('Would you like to submit another application?')) {
            resetForm();
        }
    }, 2000);
}

// Reset form handler
function resetForm() {
    if (confirm('Are you sure you want to reset the form? All entered data will be lost.')) {
        // Reset all input fields
        document.getElementById('fullname').value = '';
        document.getElementById('email').value = '';
        document.getElementById('phone').value = '';
        document.getElementById('experience').value = '';
        document.getElementById('motivation').value = '';

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });

        showNotification('Form reset successfully', 'info');
    }
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
    notification.textContent = message;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        border-radius: 8px;
        font-weight: 500;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        max-width: 400px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
    `;

    // Set colors based on type
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        notification.style.color = '#ffffff';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
        notification.style.color = '#ffffff';
    } else if (type === 'info') {
        notification.style.background = 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)';
        notification.style.color = '#ffffff';
    }

    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Add to page
    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Add course card hover effects
document.addEventListener('DOMContentLoaded', () => {
    // Character counter for motivation textarea
    const motivationTextarea = document.getElementById('motivation');
    const charCounterDiv = document.createElement('div');
    charCounterDiv.className = 'char-counter';
    charCounterDiv.style.cssText = `
        text-align: right;
        color: #9ca3af;
        font-size: 0.875rem;
        margin-top: 4px;
    `;
    motivationTextarea.parentElement.appendChild(charCounterDiv);

    motivationTextarea.addEventListener('input', () => {
        const length = motivationTextarea.value.length;
        charCounterDiv.textContent = `${length} characters`;
        
        if (length < 50) {
            charCounterDiv.style.color = '#ef4444';
        } else if (length < 100) {
            charCounterDiv.style.color = '#f59e0b';
        } else {
            charCounterDiv.style.color = '#10b981';
        }
    });
});

// Smooth scroll behavior for form validation errors
function smoothScrollToElement(element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Enter to submit
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        submitForm();
    }
    
    // Ctrl/Cmd + R to reset (override default)
    if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        e.preventDefault();
        resetForm();
    }
});

// Auto-save to localStorage (optional feature)
let autoSaveInterval;

function enableAutoSave() {
    autoSaveInterval = setInterval(() => {
        const formData = {
            fullname: document.getElementById('fullname').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            experience: document.getElementById('experience').value,
            motivation: document.getElementById('motivation').value
        };
        
        localStorage.setItem('cohort3_application_draft', JSON.stringify(formData));
    }, 10000); // Save every 10 seconds
}

function loadAutoSave() {
    const savedData = localStorage.getItem('cohort3_application_draft');
    if (savedData) {
        const formData = JSON.parse(savedData);
        
        if (confirm('We found a saved draft. Would you like to restore it?')) {
            document.getElementById('fullname').value = formData.fullname || '';
            document.getElementById('email').value = formData.email || '';
            document.getElementById('phone').value = formData.phone || '';
            document.getElementById('experience').value = formData.experience || '';
            document.getElementById('motivation').value = formData.motivation || '';
        } else {
            localStorage.removeItem('cohort3_application_draft');
        }
    }
}

// Initialize auto-save on page load
document.addEventListener('DOMContentLoaded', () => {
    loadAutoSave();
    enableAutoSave();
});

// Clear auto-save on successful submission
function clearAutoSave() {
    localStorage.removeItem('cohort3_application_draft');
    if (autoSaveInterval) {
        clearInterval(autoSaveInterval);
    }
}