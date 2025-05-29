# Developer Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS. Features dark/light mode toggle, smooth scrolling navigation, and mobile-first design.

## 🚀 Features

- **Modern Design**: Clean, minimalist design with professional aesthetics
- **Responsive**: Mobile-first approach, works on all devices
- **Dark/Light Mode**: Toggle between themes with system preference detection
- **Smooth Animations**: Subtle hover effects and transitions
- **SEO Optimized**: Proper meta tags and structured data
- **Accessible**: ARIA labels and semantic HTML
- **Fast Loading**: Optimized for performance

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Create React App
- **Deployment**: Ready for Vercel/Netlify

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/portfolio-website.git
cd portfolio-website
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 🎨 Customization

### Personal Information

1. **Hero Section** (`src/components/Hero.tsx`):

   - Update name, title, and introduction
   - Modify social media links
   - Change call-to-action buttons

2. **About Section** (`src/components/About.tsx`):

   - Replace profile information and bio
   - Update skills and technologies
   - Modify statistics (projects, years, etc.)

3. **Projects Section** (`src/components/Projects.tsx`):

   - Replace sample projects with your own
   - Update project descriptions, technologies, and links
   - Add real project images

4. **Contact Section** (`src/components/Contact.tsx`):
   - Update contact information (email, phone, location)
   - Modify social media links
   - Customize form submission logic

### Styling & Branding

1. **Colors** (`tailwind.config.js`):

   - Modify the primary color scheme
   - Adjust gray scale if needed

2. **Typography**:

   - The project uses Inter font by default
   - Modify font imports in `src/index.css`

3. **Layout**:
   - Adjust section padding in `src/index.css`
   - Modify component layouts as needed

### SEO & Meta Tags

Update the following in `public/index.html`:

- Title, description, and keywords
- Open Graph and Twitter Card meta tags
- Structured data (JSON-LD)
- Canonical URL

## 🚀 Deployment

### Vercel (Recommended)

1. Install Vercel CLI:

```bash
npm i -g vercel
```

2. Deploy:

```bash
npm run build
vercel --prod
```

### Netlify

1. Build the project:

```bash
npm run build
```

2. Drag and drop the `build` folder to [Netlify](https://netlify.com)

### GitHub Pages

1. Install gh-pages:

```bash
npm install --save-dev gh-pages
```

2. Add to package.json:

```json
{
  "homepage": "https://yourusername.github.io/portfolio-website",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

3. Deploy:

```bash
npm run deploy
```

## 📁 Project Structure

```
portfolio-website/
├── public/
│   ├── index.html          # Main HTML file with SEO meta tags
│   └── manifest.json       # PWA manifest
├── src/
│   ├── components/         # React components
│   │   ├── Navigation.tsx  # Header navigation
│   │   ├── Hero.tsx        # Hero section
│   │   ├── About.tsx       # About section
│   │   ├── Projects.tsx    # Projects showcase
│   │   ├── Contact.tsx     # Contact form and info
│   │   └── Footer.tsx      # Footer
│   ├── contexts/
│   │   └── ThemeContext.tsx # Dark/light mode context
│   ├── App.tsx             # Main App component
│   ├── index.tsx           # Entry point
│   └── index.css           # Global styles and Tailwind imports
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
└── package.json            # Dependencies and scripts
```

## 🎯 Performance

The website is optimized for performance with:

- Lazy loading of images
- Optimized bundle size
- Efficient CSS with Tailwind
- Minimal external dependencies

## 📱 Responsive Design

The website is fully responsive with breakpoints:

- Mobile: 640px and below
- Tablet: 641px - 1024px
- Desktop: 1025px and above

## 🔧 Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (not recommended)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/yourusername/portfolio-website/issues).

## 📧 Contact

If you have any questions or need help customizing the portfolio, feel free to reach out:

- Email: your.email@example.com
- LinkedIn: [your-profile](https://linkedin.com/in/yourusername)
- GitHub: [yourusername](https://github.com/yourusername)

---

**⭐ Star this repository if you found it helpful!**
