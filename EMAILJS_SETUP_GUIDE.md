# EmailJS Setup Guide for RxDoctor Contact Form

## Overview
The contact form now uses EmailJS to send emails directly to `rxdoctor24@gmail.com` without needing a backend server.

## Setup Steps

### Step 1: Create EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com/)
2. Click **"Sign Up"** and create a free account
3. Verify your email address

### Step 2: Add Email Service

1. After logging in, go to **"Email Services"** in the dashboard
2. Click **"Add New Service"**
3. Choose **"Gmail"** (since you're using rxdoctor24@gmail.com)
4. Click **"Connect Account"**
5. Sign in with `rxdoctor24@gmail.com`
6. Grant permissions
7. Your **Service ID** will be displayed - **copy this**

### Step 3: Create Email Template

1. Go to **"Email Templates"** in the dashboard
2. Click **"Create New Template"**
3. Use this template configuration:

**Template Name:** `rxdoctor_contact_form`

**Subject:**
```
New Contact Form Submission from {{from_name}}
```

**Content (Body):**
```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #667eea; }
        .value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; }
        .footer { background: #333; color: white; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🏥 New Contact Form Submission</h1>
            <p>RxDoctor Website Contact Form</p>
        </div>
        
        <div class="content">
            <div class="field">
                <div class="label">👤 Name:</div>
                <div class="value">{{from_name}}</div>
            </div>
            
            <div class="field">
                <div class="label">📧 Email:</div>
                <div class="value">{{from_email}}</div>
            </div>
            
            <div class="field">
                <div class="label">📱 Phone:</div>
                <div class="value">{{phone}}</div>
            </div>
            
            <div class="field">
                <div class="label">🏥 Practice/Organization:</div>
                <div class="value">{{practice}}</div>
            </div>
            
            <div class="field">
                <div class="label">📊 Practice Size:</div>
                <div class="value">{{practice_size}}</div>
            </div>
            
            <div class="field">
                <div class="label">💬 Message:</div>
                <div class="value">{{message}}</div>
            </div>
        </div>
        
        <div class="footer">
            <p>This email was sent from the RxDoctor contact form</p>
            <p>Reply to: {{from_email}}</p>
        </div>
    </div>
</body>
</html>
```

**To Email:** `rxdoctor24@gmail.com`

**Reply To:** `{{reply_to}}`

4. Click **"Save"** - Your **Template ID** will be displayed - **copy this**

### Step 4: Get Public Key

1. Go to **"Account"** in the dashboard
2. Find **"Public Key"** (also called API Key)
3. **Copy this key**

### Step 5: Configure Your App

1. In your `rxdoctor-web` folder, create a `.env` file:

```bash
# In PowerShell
cd C:\Coding\Project-Rx\RxDoctor\rxdoctor-web
New-Item -Path .env -ItemType File
```

2. Add your credentials to `.env`:

```env
REACT_APP_EMAILJS_SERVICE_ID=service_xxxxxxx
REACT_APP_EMAILJS_TEMPLATE_ID=template_xxxxxxx
REACT_APP_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxx
```

Replace the `xxxxxxx` with your actual IDs from EmailJS.

### Step 6: Test the Setup

1. Restart your development server:

```bash
npm start
```

2. Fill out the contact form on your website
3. Submit the form
4. Check `rxdoctor24@gmail.com` for the email

## Troubleshooting

### "Failed to send message"

**Check:**
- All three environment variables are set correctly in `.env`
- No extra spaces or quotes in `.env` values
- Server was restarted after creating `.env`

### Email not received

**Check:**
- EmailJS service is connected to correct Gmail account
- Template is set to send to `rxdoctor24@gmail.com`
- Check spam folder
- Check EmailJS dashboard for delivery status

### "Service ID not found"

**Solution:**
- Copy the Service ID exactly from EmailJS dashboard
- Make sure it starts with `service_`

## Free Tier Limits

EmailJS Free Plan includes:
- ✅ 200 emails per month
- ✅ 2 email services
- ✅ Unlimited templates
- ✅ Full features

For higher volume, upgrade to paid plan.

## Security Notes

1. ✅ **Never commit `.env` file to git**
2. ✅ Public key is safe to use in frontend
3. ✅ EmailJS protects against spam/abuse
4. ✅ Rate limiting is built-in

## Email Delivery Time

- Emails usually arrive within **5-30 seconds**
- During high traffic, may take up to **2 minutes**

## Alternative: Use Django Backend (Advanced)

If you prefer to use your Django backend instead:

1. Create an API endpoint in `Rxbackend-aws/users/views/`
2. Use Django's email backend
3. Call the API from React

See `DJANGO_BACKEND_EMAIL_SETUP.md` for details.

## Support

If you need help:
- EmailJS Docs: https://www.emailjs.com/docs/
- EmailJS Support: https://www.emailjs.com/contact

## Testing Checklist

- [x] EmailJS account created
- [x] Gmail service connected
- [x] Email template created and configured
- [x] Public key obtained
- [x] `.env` file created with credentials
- [x] Development server restarted
- [x] Test email sent successfully
- [x] Email received at rxdoctor24@gmail.com

---

**Setup Complete!** 🎉 Your contact form is now live and sending emails to `rxdoctor24@gmail.com`.

