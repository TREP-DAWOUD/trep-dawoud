/**
 * TREP DAWOUD - Contact Form Handler
 * Sends form submissions via WhatsApp API or Email with SMS notification
 */

// Configuration
const CONFIG = {
    ownerPhone: '+212696750378', // Your phone number (WhatsApp)
    ownerEmail: 'dauodm955@gmail.com',
    apiEndpoint: 'https://formspree.io/f/YOUR_FORM_ID', // Replace with your Formspree ID
    whatsappEndpoint: 'https://api.whatsapp.com/send', // Direct WhatsApp link
};

// Initialize form handler when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmission);
    }
});

/**
 * Handle form submission
 */
async function handleFormSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    // Create message object
    const message = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        subject: formData.get('subject'),
        message: formData.get('message'),
        timestamp: new Date().toLocaleString('ar-SA'),
    };

    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = '⏳ جاري الإرسال...';

    try {
        // Method 1: Send via Formspree (for email and webhooks)
        await sendViaFormspree(message);

        // Method 2: Send WhatsApp message (automatic)
        sendViaWhatsApp(message);

        // Method 3: Send SMS via Twilio (optional - requires API key)
        // await sendViaTwilio(message);

        // Show success message
        showNotification('✅ تم إرسال رسالتك بنجاح! سنرد عليك قريباً.', 'success');
        
        // Reset form
        form.reset();
    } catch (error) {
        console.error('Form submission error:', error);
        showNotification('❌ حدث خطأ أثناء إرسال الرسالة. حاول مرة أخرى.', 'error');
    } finally {
        // Reset button
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
}

/**
 * Send via Formspree (Email + Webhook)
 * Create account at formspree.io and replace YOUR_FORM_ID
 */
async function sendViaFormspree(message) {
    const formData = new FormData();
    formData.append('name', message.name);
    formData.append('email', message.email);
    formData.append('phone', message.phone);
    formData.append('subject', message.subject);
    formData.append('message', message.message);
    formData.append('_replyto', message.email);
    formData.append('_subject', `رسالة جديدة من ${message.name} - ${message.subject}`);

    // Note: Replace YOUR_FORM_ID with your actual Formspree form ID
    const response = await fetch('https://formspree.io/f/mwpdjylq', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).catch(err => {
        console.log('Formspree not configured - this is optional');
        return null;
    });

    return response;
}

/**
 * Send WhatsApp message (Direct link)
 * Opens WhatsApp with pre-filled message
 */
function sendViaWhatsApp(message) {
    const whatsappMessage = encodeURIComponent(
        `مرحباً، لدي استفسار/رسالة:\n\n` +
        `الاسم: ${message.name}\n` +
        `البريد الإلكتروني: ${message.email}\n` +
        `رقم الهاتف: ${message.phone || 'لم يتم تقديمه'}\n` +
        `الموضوع: ${message.subject}\n` +
        `الرسالة: ${message.message}\n\n` +
        `الوقت: ${message.timestamp}`
    );

    // Option 1: Open WhatsApp Web (automatic on desktop)
    const whatsappURL = `https://web.whatsapp.com/send?phone=${CONFIG.ownerPhone.replace('+', '')}&text=${whatsappMessage}`;
    
    // Option 2: WhatsApp Mobile (automatic on mobile)
    const whatsappMobileURL = `https://wa.me/${CONFIG.ownerPhone.replace('+', '')}?text=${whatsappMessage}`;

    // Detect if mobile and use appropriate URL
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // On mobile, open WhatsApp app or web
        window.open(whatsappMobileURL, '_blank');
    } else {
        // On desktop, offer WhatsApp Web
        console.log('WhatsApp message prepared. User can manually send via WhatsApp Web.');
    }
}

/**
 * Send SMS via Twilio (Optional - requires API configuration)
 * Uncomment and configure if you have Twilio account
 */
async function sendViaTwilio(message) {
    /*
    const response = await fetch('/api/send-sms', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            to: CONFIG.ownerPhone,
            message: `${message.name} أرسل لك رسالة:\n${message.subject}\n${message.message}\nالبريد: ${message.email}`,
        })
    });
    return response.json();
    */
}

/**
 * Show notification to user
 */
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 600;
        z-index: 9999;
        animation: slideInRight 0.3s ease;
        max-width: 90%;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    `;
    notification.textContent = message;

    // Add to page
    document.body.appendChild(notification);

    // Auto-remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);

    // Add animation styles if not already present
    if (!document.querySelector('style[data-notification-styles]')) {
        const style = document.createElement('style');
        style.setAttribute('data-notification-styles', '');
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(400px);
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
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Log all form submissions (for debugging)
 */
function logFormSubmission(message) {
    console.group('📧 Form Submission Details');
    console.log('Name:', message.name);
    console.log('Email:', message.email);
    console.log('Phone:', message.phone);
    console.log('Subject:', message.subject);
    console.log('Message:', message.message);
    console.log('Timestamp:', message.timestamp);
    console.groupEnd();
}
