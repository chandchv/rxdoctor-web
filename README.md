# RxDoctor - Healthcare Management Platform Website

A modern, responsive website for RxDoctor healthcare management platform built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Design**: Clean, professional interface with gradient backgrounds and smooth animations
- **Responsive Layout**: Optimized for all devices (desktop, tablet, mobile)
- **Interactive Components**: Smooth scrolling, hover effects, and dynamic content
- **Contact Form**: Functional contact form with validation
- **Pricing Plans**: Detailed subscription plans with comparison
- **Testimonials**: Customer reviews and success stories
- **Performance Optimized**: Fast loading times and smooth animations
- **Symptom-Based Doctor Recommendation**: AI-inspired triage assistant that maps user symptoms to medical specialities and nearby doctors

## 🩺 Symptom-Based Flow

### Overview
The home page now includes a three-step wizard (`SymptomChecker.tsx`) that:
1. Collects free-form symptoms plus optional location/GPS details.
2. Runs a Level-1 rule-based classifier powered by `disease_symptom_speciality.json`.
3. Surfaces nearby specialists (mocked today) along with teleconsult fallbacks and deep links to RxDoctor booking.

### Architecture
- **Classifier service** (`src/services/symptomClassifier.ts`): Normalizes the JSON dataset, scores each disease by symptom overlap, and returns a `SymptomAssessment` with speciality, urgency, confidence, and candidate conditions.
- **Doctor API shim** (`src/services/doctorApi.ts`): Provides typed responses and sample data until the real backend endpoint is wired. Replace `findNearbyDoctors` with a fetch call later without touching the UI.
- **UI component** (`SymptomChecker.tsx`): Handles form state, GPS fallback, error messaging, speciality display, and doctor cards with booking links `https://rxdoctor.in/book/<id>` plus app deep links `rxdoctor://doctor/<id>/book`.

### Extending the Flow
- To integrate a backend/LLM classifier, keep the `SymptomAssessment` shape and swap the implementation inside `classifySymptoms`.
- Configure urgency rules in `SPECIALITY_URGENCY` to fine-tune chip colors and messaging.
- Replace the mock doctor list by updating `findNearbyDoctors` to call your API and return the same `DoctorProfile` interface.
- Track analytics by emitting events on submit, speciality confirmation, and booking clicks inside `SymptomChecker`.

## 🛠 Tech Stack

- **React 19** - Frontend framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Framer Motion** - Animation library
- **React Icons** - Additional icon set

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd rxdoctor-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the website

## 🏗 Build for Production

```bash
npm run build
```

This builds the app for production to the `build` folder.

## 📁 Project Structure

```
rxdoctor-web/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── About.tsx
│   │   ├── Stats.tsx
│   │   ├── Pricing.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── index.tsx
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## 🎨 Design Features

### Color Scheme
- **Primary**: Blue gradient (#0ea5e9 to #0369a1)
- **Secondary**: Purple gradient (#d946ef to #a21caf)
- **Accent**: Green (#22c55e)

### Typography
- **Headings**: Poppins font family
- **Body**: Inter font family
- **Responsive**: Optimized for all screen sizes

### Animations
- **Smooth scrolling**: Enhanced navigation experience
- **Hover effects**: Interactive elements with transform and shadow effects
- **Loading animations**: Spinner animations for form submissions
- **Fade-in animations**: Content appears smoothly on scroll

## 📱 Sections

### 1. Header
- Fixed navigation with smooth scrolling
- Mobile-responsive hamburger menu
- CTA buttons for sign-in and getting started

### 2. Hero Section
- Compelling headline with gradient text
- Key benefits highlighting
- Call-to-action buttons
- Animated dashboard mockup

### 3. Stats Section
- Impressive numbers and metrics
- Trust badges and certifications
- Social proof elements

### 4. Features Section
- Comprehensive feature grid (12 main features)
- Icon-based feature cards
- Detailed descriptions
- Integration showcase

### 5. About Section
- Company mission and values
- Team information
- Customer testimonial highlight
- Core values grid

### 6. Pricing Section
- Three-tier pricing structure
- Monthly/Annual toggle with savings
- Feature comparison
- Add-ons section
- FAQ section

### 7. Testimonials Section
- Customer reviews with photos
- Success metrics
- Detailed case study
- Star ratings

### 8. Contact Section
- Interactive contact form
- Contact information
- Quick FAQ
- Emergency support options

### 9. Footer
- Comprehensive link organization
- Newsletter signup
- Social media links
- Legal and compliance information

## 🔧 Customization

### Colors
Edit `tailwind.config.js` to modify the color scheme:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom primary colors
      },
      secondary: {
        // Your custom secondary colors
      }
    }
  }
}
```

### Content
Update the content in each component file:
- `Hero.tsx` - Main headline and description
- `Features.tsx` - Feature list and descriptions
- `Pricing.tsx` - Pricing plans and features
- `Testimonials.tsx` - Customer reviews
- `Contact.tsx` - Contact information

### Styling
Modify `src/index.css` for global styles and custom animations.

## 🌐 Deployment

### Netlify
1. Build the project: `npm run build`
2. Deploy the `build` folder to Netlify

### Vercel
1. Connect your GitHub repository to Vercel
2. Vercel will automatically build and deploy

### Traditional Hosting
1. Run `npm run build`
2. Upload the contents of the `build` folder to your web server

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for excellent user experience
- **Mobile-First**: Responsive design with mobile optimization
- **SEO-Friendly**: Semantic HTML and meta tags

## 🔒 Security Features

- **HTTPS Ready**: Secure by default
- **Content Security Policy**: Protection against XSS
- **No Sensitive Data**: Client-side only, no backend secrets

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions:
- Email: support@rxdoctor.com
- Phone: +1 (555) 123-4567
- Website: [https://rxdoctor.com](https://rxdoctor.com)

## 🙏 Acknowledgments

- Design inspiration from leading healthcare platforms
- Icons by Lucide React
- Fonts by Google Fonts
- Images from Unsplash

---

Built with ❤️ for the healthcare community
