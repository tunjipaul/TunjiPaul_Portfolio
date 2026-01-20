# TunjiPaul Portfolio - Frontend

> A modern, responsive personal portfolio website built with React, Vite, and Tailwind CSS, featuring dynamic content management and a secure admin dashboard.

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://tunji-paul-portfolio.vercel.app)
[![React](https://img.shields.io/badge/React-19.2.0-blue)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.2.2-purple)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.17-cyan)](https://tailwindcss.com/)

## Overview

This frontend application connects to a FastAPI backend to dynamically display professional information, showcase projects and skills, handle contact form submissions, and provide a complete admin dashboard for content management.

## ✨ Key Features

### Public Portfolio

- **Hero Section**: Animated profile display with smooth scroll navigation
- **About**: Professional biography with education timeline
- **Skills Showcase**: Categorized skills with dynamic icons
- **Projects Gallery**: Infinite scrolling carousel with live demos
- **Contact Form**: Real-time validation with resume/CV download
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### Admin Dashboard

- **Secure Authentication**: JWT-based protected routes
- **Content Management**: Full CRUD operations for hero, about, skills, and projects
- **Message Inbox**: View, reply, and manage contact submissions
- **Resume Management**: Upload and manage PDF documents
- **Responsive Interface**: Mobile-friendly admin panel

## 🛠️ Tech Stack

| Technology   | Version | Purpose      |
| ------------ | ------- | ------------ |
| React        | 19.2.0  | UI Library   |
| Vite         | 7.2.2   | Build Tool   |
| Tailwind CSS | 4.1.17  | Styling      |
| React Router | 7.9.6   | Routing      |
| React Icons  | 5.5.0   | Icon Library |
| Lucide React | 0.554.0 | Modern Icons |

## 📋 Prerequisites

- Node.js 18+ (recommended: 20.x)
- npm or yarn
- Backend API running (see backend repository)

## 🚀 Quick Start

### 1. Installation

```bash
# Clone the repository
git clone <your-repository-url>
cd TunjiPaul-Portfolio

# Install dependencies
npm install
```

### 2. Configuration

Create `src/config.js`:

```javascript
const API_URL = "http://localhost:8000";
export default API_URL;
```

For production, update to your deployed backend URL.

### 3. Development

```bash
npm run dev
```

Application runs at `http://localhost:5173`

### 4. Production Build

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── About.jsx
│   ├── Contacts.jsx
│   ├── ErrorBoundary.jsx
│   ├── Footer.jsx
│   ├── Hero.jsx
│   ├── NavBar.jsx
│   ├── Projects.jsx
│   └── Skills.jsx
├── pages/              # Page-level components
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── AdminDashboard.jsx
│   ├── ManageHero.jsx
│   ├── AboutSection.jsx
│   ├── ManageSkills.jsx
│   ├── ManageProjects.jsx
│   ├── Messages.jsx
│   └── ProtectedRoute.jsx
├── utils/              # Utility functions
│   └── api.js         # API request helpers
├── config.js           # API configuration
├── App.jsx            # Main app with routing
├── App.css            # Custom animations
└── main.jsx           # Entry point
```

## 🎨 Custom Features

### Infinite Scroll Animation

Projects carousel uses CSS animation for smooth infinite scrolling:

```css
@keyframes infinite-scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
```

### Smooth Navigation

```javascript
const scrollToSection = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};
```

### Dynamic Icon Mapping

Skills automatically map to React Icons:

```javascript
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";

const getIcon = (skillName, iconFromDB) => {
  return FaIcons[iconFromDB] || SiIcons[iconFromDB] || DefaultIcon;
};
```

## 🔐 Authentication

The application uses JWT-based authentication with localStorage:

```javascript
// Login stores token and expiry
localStorage.setItem("accessToken", data.access_token);
localStorage.setItem("tokenExpiry", expiryTime.toString());

// Protected routes check authentication
const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
const token = localStorage.getItem("accessToken");
```

## 🌐 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import repository to Vercel
3. Configure:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Update `src/config.js` with production API URL
5. Deploy

### Netlify

```bash
npm run build
netlify deploy --prod --dir=dist
```

## 🎯 Available Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint               |

## 🐛 Troubleshooting

### API Connection Failed

- Verify backend is running
- Check CORS configuration in backend
- Confirm API_URL in `config.js`

### Login Not Working

- Check backend credentials in `.env`
- Verify token expiration settings
- Clear localStorage and try again

### Icons Not Displaying

```bash
npm install react-icons lucide-react
```

## 📦 Dependencies

### Production

- `react` & `react-dom` - UI library
- `react-router-dom` - Client-side routing
- `tailwindcss` - CSS framework
- `react-icons` & `lucide-react` - Icon libraries

### Development

- `vite` - Build tool
- `@vitejs/plugin-react` - React plugin
- `eslint` - Code linting

## 🌟 Performance

- **Code Splitting**: Automatic route-based splitting
- **Lazy Loading**: Optimized image loading
- **CSS Animations**: Hardware-accelerated transitions
- **Minimal Bundle**: Only essential dependencies

## 📄 License

MIT License - feel free to use this project for your own portfolio!

## 👤 Author

**Tunji Paul**

- Portfolio: [tunji-paul-portfolio.vercel.app](https://tunji-paul-portfolio.vercel.app)
- GitHub: [@tunjipaul](https://github.com/tunjipaul)
- LinkedIn: [Paul Ogor](https://www.linkedin.com/in/paul-ogor-gmnse-9103601b1)
- Twitter: [@tunji*paul*](https://x.com/tunji_paul_)
- Medium: [@tunji*paul*](https://medium.com/@tunji_paul_)
- Email: tunjipaul007@gmail.com

## 🙏 Acknowledgments

- [React](https://react.dev/) - The UI library
- [Vite](https://vitejs.dev/) - The blazing fast build tool
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [React Icons](https://react-icons.github.io/react-icons/) - Icon library
- [Vercel](https://vercel.com/) - Deployment platform

## 🔗 Related Links

- [Backend Repository](https://github.com/yourusername/portfolio-backend)
- [Live Demo](https://tunji-paul-portfolio.vercel.app)
- [API Documentation](http://localhost:8000/docs)

---

**Made with ❤️ using React + Vite + Tailwind CSS**
