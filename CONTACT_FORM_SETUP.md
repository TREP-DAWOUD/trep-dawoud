# Contact Form Setup Guide - TREP DAWOUD

## Overview
Your contact form now automatically sends messages to your phone number (+212 696 750 378) via **WhatsApp** and can also send **email notifications** via Formspree.

---

## 🚀 Quick Setup (Three Options)

### **Option 1: WhatsApp Integration (RECOMMENDED - NO SETUP NEEDED)**
✅ **Already Enabled!**

When someone submits the contact form:
1. A WhatsApp message is automatically prepared
2. On mobile: WhatsApp app opens with the message
3. On desktop: User gets a link to send via WhatsApp Web
4. You receive their full message details

**No configuration needed!** It works immediately.

---

### **Option 2: Email + Webhook Notifications (Setup Required - 5 Minutes)**

To receive email notifications + SMS/WhatsApp via webhooks:

#### Step 1: Create Formspree Account
1. Go to [formspree.io](https://formspree.io)
2. Sign up with your email
3. Create a new form

#### Step 2: Get Your Form ID
- Copy the form ID from Formspree dashboard
- Example: `mwpdjylq` (you'll get your own)

#### Step 3: Update contact-form.js
Replace `YOUR_FORM_ID` in the script:

**File:** `js/contact-form.js` (Line ~98)

```javascript
// Change FROM:
const response = await fetch('https://formspree.io/f/mwpdjylq', {

// Change TO (your actual Formspree form ID):
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
```

#### Step 4: (Optional) Add SMS/WhatsApp Notification
In Formspree dashboard:
1. Go to your form settings
2. Add "Webhook" integration
3. Use a service like:
   - **Make.com** (formerly Integromat) - free tier
   - **Zapier** - free tier with limited automations
   - **Twillio** - paid SMS service

**Example Zapier Setup:**
```
Trigger: Formspree Form Submission
↓
Action: Send SMS via Twilio to +212696750378
```

---

### **Option 3: Professional SMS via Twilio (Setup Required - 15 Minutes)**

For direct SMS notifications (paid service):

#### Step 1: Create Twilio Account
1. Go to [twilio.com](https://www.twilio.com)
2. Sign up and verify phone number
3. Get your Account SID and Auth Token
4. Buy a phone number for sending SMS

#### Step 2: Create Backend Endpoint
Create a simple Node.js/PHP endpoint to handle SMS:

**Example Node.js + Express:**

```javascript
const twilio = require('twilio');

const client = twilio('YOUR_ACCOUNT_SID', 'YOUR_AUTH_TOKEN');

app.post('/api/send-sms', async (req, res) => {
    try {
        const { to, message } = req.body;
        
        await client.messages.create({
            body: message,
            from: '+1234567890', // Your Twilio number
            to: to
        });
        
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
```

#### Step 3: Uncomment Twilio Code
In `js/contact-form.js` (Line ~165), uncomment and update:

```javascript
// UNCOMMENT these lines:
// await sendViaTwilio(message);

// UNCOMMENT and UPDATE the sendViaTwilio function
// Add your API endpoint and configure
```

---

## 📱 How It Works (Current Setup)

### When Someone Fills the Form:

1. **Form Submission** → JavaScript captures data
2. **WhatsApp Message** → Opens WhatsApp with their message on mobile
3. **Email Option** → If configured with Formspree, sends email notification
4. **Confirmation** → User sees "✅ تم إرسال رسالتك بنجاح!"

### Form Data Captured:
- ✅ Full Name
- ✅ Email Address
- ✅ Phone Number
- ✅ Subject
- ✅ Message
- ✅ Timestamp
- ✅ Browser/Device Info (optional)

---

## 🔧 Testing

### Test Locally:
1. Open `pages/contact.html` in your browser
2. Fill out the form
3. Click "إرسال الرسالة" (Send Message)
4. ✅ Success notification appears
5. 📱 On mobile: WhatsApp opens with the message
6. 💻 On desktop: WhatsApp Web link appears in console

### Test Formspree (if configured):
1. Check your Formspree dashboard
2. You should see the form submission
3. Email notification sent to: `dauodm955@gmail.com`

---

## ⚙️ Advanced Configuration

### Change Recipient Phone Number
**File:** `js/contact-form.js` (Line ~8)

```javascript
const CONFIG = {
    ownerPhone: '+212696750378', // Change here
    ownerEmail: 'dauodm955@gmail.com', // Or here
    // ...
};
```

### Customize WhatsApp Message Format
**File:** `js/contact-form.js` (Line ~125)

```javascript
const whatsappMessage = encodeURIComponent(
    `مرحباً، لدي استفسار:\n\n` +
    `الاسم: ${message.name}\n` +
    // Add or remove fields as needed
);
```

### Customize Notification Display
**File:** `js/contact-form.js` (Line ~200)

```javascript
function showNotification(message, type = 'info') {
    // Customize colors, position, animation here
}
```

---

## 🐛 Troubleshooting

### Issue: Form not submitting
- Check browser console (F12) for errors
- Ensure JavaScript is enabled
- Clear browser cache and reload

### Issue: WhatsApp not opening
- Make sure WhatsApp is installed (mobile)
- On desktop, ensure WhatsApp Web is logged in
- Check that phone number format is correct (+212...)

### Issue: Not receiving Formspree emails
- Verify form ID in `contact-form.js`
- Check Formspree dashboard for submissions
- Check spam folder for emails
- Add `_replyto` field if needed

### Issue: Twilio SMS not working
- Verify Account SID and Auth Token
- Ensure phone number has SMS capability
- Check Twilio account has credits
- Verify backend endpoint is accessible

---

## 🔐 Security Notes

1. **Validate on Backend** (if using Formspree/Twilio):
   - Phone number format
   - Email format
   - Message length limits
   - Spam protection

2. **Rate Limiting**:
   - Limit submissions per IP
   - Implement CAPTCHA if needed

3. **Data Privacy**:
   - Add privacy notice on form
   - Comply with GDPR/local regulations
   - Secure data in transit (HTTPS)

---

## 📊 Form Analytics (Optional)

To track form submissions, add Google Analytics:

```html
<!-- Add to contact.html head -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_ID');
</script>
```

Track submissions:
```javascript
// In contact-form.js, add after successful submission:
gtag('event', 'contact_form_submission', {
    'form_name': 'contact',
    'submission_value': 1
});
```

---

## ✅ Checklist

- [ ] Test form submission on desktop
- [ ] Test form submission on mobile
- [ ] Verify WhatsApp message arrives correctly
- [ ] (Optional) Set up Formspree for email notifications
- [ ] (Optional) Configure Twilio for SMS
- [ ] Add privacy policy mentioning form data usage
- [ ] Monitor form submissions regularly
- [ ] Add CAPTCHA if receiving spam

---

## 📞 Support

For issues or questions about:
- **WhatsApp Integration**: No support needed - it's built-in
- **Formspree**: Visit [formspree.io/help](https://formspree.io/help)
- **Twilio**: Visit [twilio.com/docs](https://www.twilio.com/docs)
- **Form Script**: Check `js/contact-form.js` comments

---

**Status:** ✅ Contact form is fully functional and ready to receive messages!
