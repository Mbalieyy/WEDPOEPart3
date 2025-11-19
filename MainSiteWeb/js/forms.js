// Form validation and functionality
document.addEventListener('DOMContentLoaded', function() {
    // Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateContactForm()) {
                submitContactForm();
            }
        });
    }

    // Enquiry Form Validation
    const enquiryForm = document.getElementById('enquiryForm');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateEnquiryForm()) {
                submitEnquiryForm();
            }
        });

        // Service cost calculation
        const serviceSelect = document.getElementById('service');
        if (serviceSelect) {
            serviceSelect.addEventListener('change', calculateServiceCost);
        }
    }
});

// Contact Form Validation
function validateContactForm() {
    let isValid = true;
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    // Reset errors
    clearErrors();

    // Name validation
    if (name.value.trim() === '') {
        showError('nameError', 'Please enter your full name');
        isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        showError('emailError', 'Please enter a valid email address');
        isValid = false;
    }

    // Message validation
    if (message.value.trim().length < 10) {
        showError('messageError', 'Message must be at least 10 characters long');
        isValid = false;
    }

    return isValid;
}

// Enquiry Form Validation
function validateEnquiryForm() {
    let isValid = true;
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const service = document.getElementById('service');

    // Reset errors
    clearErrors();

    // Name validation
    if (name.value.trim() === '') {
        showError('nameError', 'Please enter your full name');
        isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        showError('emailError', 'Please enter a valid email address');
        isValid = false;
    }

    // Service validation
    if (service.value === '') {
        showError('serviceError', 'Please select a service');
        isValid = false;
    }

    return isValid;
}

// Service Cost Calculation
function calculateServiceCost() {
    const service = document.getElementById('service');
    const costDisplay = document.getElementById('serviceCost');
    
    if (!costDisplay) return;

    const costs = {
        'general': 'R450 - R1,200',
        'wood': 'R800 - R2,500',
        'reupholstery': 'R1,500 - R4,000',
        'antique': 'R2,000 - R6,000',
        'assembly': 'R300 - R800'
    };

    if (service.value && costs[service.value]) {
        costDisplay.textContent = `Estimated cost: ${costs[service.value]}`;
        costDisplay.style.display = 'block';
    } else {
        costDisplay.style.display = 'none';
    }
}

// Show error message
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

// Clear all errors
function clearErrors() {
    const errors = document.querySelectorAll('.error-message');
    errors.forEach(error => {
        error.textContent = '';
        error.style.display = 'none';
    });
}

// Submit Contact Form (AJAX simulation)
function submitContactForm() {
    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage');
    
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    // Simulate AJAX request
    setTimeout(() => {
        formMessage.textContent = 'Thank you! Your message has been sent successfully. We will respond within 24 hours.';
        formMessage.className = 'form-message success';
        formMessage.style.display = 'block';
        
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
        
        // Reset form
        document.getElementById('contactForm').reset();
        
        // Scroll to message
        formMessage.scrollIntoView({ behavior: 'smooth' });
    }, 2000);
}

// Submit Enquiry Form (AJAX simulation)
function submitEnquiryForm() {
    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage');
    const service = document.getElementById('service').value;
    
    submitBtn.disabled = true;
    submitBtn.textContent = 'Processing...';

    // Simulate AJAX request
    setTimeout(() => {
        const serviceNames = {
            'general': 'General Repair',
            'wood': 'Wood Restoration',
            'reupholstery': 'Reupholstery Referral',
            'antique': 'Antique Restoration',
            'assembly': 'Furniture Assembly'
        };

        formMessage.innerHTML = `
            <strong>Thank you for your enquiry!</strong><br>
            We have received your request for <strong>${serviceNames[service]}</strong>.<br>
            Our team will contact you within 2 hours with availability and exact pricing.
        `;
        formMessage.className = 'form-message success';
        formMessage.style.display = 'block';
        
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Enquiry';
        
        // Reset form
        document.getElementById('enquiryForm').reset();
        document.getElementById('serviceCost').style.display = 'none';
        
        // Scroll to message
        formMessage.scrollIntoView({ behavior: 'smooth' });
    }, 2000);
}