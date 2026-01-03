# 🎨 Portfolio Frontend - React + Vite

A modern, responsive personal portfolio website built with React, Vite, and Tailwind CSS. This frontend application connects to a FastAPI backend to dynamically display professional information, projects, skills, and handle contact form submissions with a complete admin dashboard for content management.

## ✨ Features

### 🏠 Public Pages
- **Hero/Landing Section**: Eye-catching introduction with animated profile image and smooth scroll navigation
- **About Section**: Professional bio with dynamic education timeline and profile display
- **Skills Showcase**: Categorized skills with animated icons from React Icons library
- **Projects Display**: Infinite scrolling carousel of portfolio projects with GitHub and live demo links
- **Contact Form**: Functional contact form with real-time validation, email notifications, and resume/CV download
- **Responsive Navigation**: Mobile-friendly navbar with smooth scrolling to sections
- **Social Media Integration**: Quick links to Twitter, Instagram, LinkedIn, GitHub, and Medium

### 🔐 Admin Dashboard
- **Secure Authentication**: Protected routes with localStorage-based session management
- **Hero Management**: Update landing page content, images, and CTA button text
- **About Section Editor**: Manage biography, profile image, and education history
- **Skills Manager**: Add, edit, delete skills with category organization and icon selection
- **Projects CRUD**: Full project management with GitHub/demo links
- **Message Inbox**: View contact form submissions, mark as read, reply via email, and delete messages
- **Resume/CV Management**: Upload, preview, and delete PDF documents
- **Responsive Sidebar**: Collapsible admin navigation for mobile devices

### 📱 Responsive Design
- Mobile-first approach with Tailwind CSS
- Breakpoint optimizations for tablet and desktop
- Touch-friendly navigation and interactions
- Smooth CSS animations and transitions

## 🛠️ Tech Stack

- **React 19.2.0** - Latest UI library
- **Vite 7.2.2** - Lightning-fast build tool
- **React Router DOM 7.9.6** - Client-side routing
- **Tailwind CSS 4.1.17** - Utility-first CSS framework
- **Fetch API** - Native HTTP client for API requests
- **React Icons 5.5.0** - Icon library (Lucide + others)
- **JavaScript (JSX)** - No TypeScript in this project

## 📋 Prerequisites

- Node.js 18+ (recommended)
- npm or yarn package manager
- Backend API running on port 8000 (see backend README)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd TunjiPaul-Portfolio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `src/config.js` file with your API URL:

```javascript
const API_URL = "http://localhost:8000";
export default API_URL;
```

For production, update this to your deployed backend URL:
```javascript
const API_URL = "https://your-backend-api.com";
export default API_URL;
```

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
TunjiPaul-Portfolio/
├── public/                     # Static assets
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── About.jsx         # About section with education
│   │   ├── Contacts.jsx      # Contact form + social links
│   │   ├── Footer.jsx        # Site footer with social icons
│   │   ├── Hero.jsx          # Landing/hero section
│   │   ├── NavBar.jsx        # Navigation with smooth scroll
│   │   ├── Projects.jsx      # Projects carousel
│   │   └── Skills.jsx        # Skills grid with icons
│   ├── pages/                 # Page-level components
│   │   ├── Home.jsx          # Public home page
│   │   ├── Admin.jsx         # Admin login wrapper
│   │   ├── Login.jsx         # Login form
│   │   ├── AdminDashboard.jsx # Main admin panel
│   │   ├── DashboardHome.jsx  # Admin home view
│   │   ├── ManageHero.jsx     # Hero section editor
│   │   ├── AboutSection.jsx   # About section editor
│   │   ├── ManageSkills.jsx   # Skills manager
│   │   ├── ManageProjects.jsx # Projects manager
│   │   ├── Messages.jsx       # Message inbox + replies
│   │   ├── MoreProjects.jsx   # Coming soon page
│   │   └── ProtectedRoute.jsx # Auth wrapper
│   ├── config.js              # API configuration
│   ├── App.jsx                # Main App with routing
│   ├── App.css                # Custom animations
│   ├── index.css              # Global styles
│   └── main.jsx               # Entry point
├── .gitignore
├── index.html                  # HTML template
├── package.json
├── vite.config.js             # Vite configuration
└── README.md
```

## 🎨 Styling & Animations

### Tailwind CSS Configuration

This project uses **Tailwind CSS v4** with the Vite plugin:

```javascript
// vite.config.js
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

### Custom Animations

The project includes custom CSS animations in `App.css`:

**Infinite Scroll Animation** (Projects carousel):
```css
@keyframes infinite-scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.animate-infinite-scroll {
  display: flex;
  width: max-content;
  animation: infinite-scroll 40s linear infinite;
}
```

**Spinning Border** (Hero & Skills icons):
```css
/* Applied inline in Hero.jsx and Skills.jsx */
animation: spin 8s linear infinite
```

## 🔌 API Integration with Fetch

### API Configuration

All API calls use the centralized config:

```javascript
// src/config.js
const API_URL = "http://localhost:8000";
export default API_URL;
```

### Example API Calls

**Fetching Data (GET)**:
```javascript
import API_URL from "../config";

useEffect(() => {
  fetch(`${API_URL}/api/hero`)
    .then(res => res.json())
    .then(data => setHero(data[0]))
    .catch(err => console.error(err));
}, []);
```

**Creating Data (POST)**:
```javascript
const response = await fetch(`${API_URL}/api/messages`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(form),
});

if (!response.ok) throw new Error("Failed to send");
const data = await response.json();
```

**Updating Data (PUT)**:
```javascript
const response = await fetch(`${API_URL}/api/hero/${heroId}`, {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(hero),
});
```

**Deleting Data (DELETE)**:
```javascript
await fetch(`${API_URL}/api/projects/${id}`, {
  method: "DELETE"
});
```

**File Downloads**:
```javascript
const response = await fetch(`${API_URL}/api/resume/download/resume`);
const blob = await response.blob();
const url = window.URL.createObjectURL(blob);
const a = document.createElement("a");
a.href = url;
a.download = "Tunji_Paul_RESUME.pdf";
a.click();
```

## 🛡️ Authentication & Protected Routes

### Login Flow

The app uses localStorage for authentication:

```javascript
// Login.jsx
const response = await fetch(`${API_URL}/login`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password }),
});

const data = await response.json();
localStorage.setItem("adminEmail", data.email);
localStorage.setItem("isLoggedIn", "true");
navigate("/dashboard");
```

### Protected Route Implementation

```javascript
// App.jsx
function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  return isLoggedIn ? children : <Navigate to="/admin" replace />;
}

// Usage
<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  } 
/>
```

### Logout

```javascript
const handleLogout = () => {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("adminEmail");
  navigate("/admin");
};
```

## 🎯 Key Features Explained

### 1. Infinite Scrolling Projects

The projects section uses CSS animation for infinite horizontal scrolling:

```jsx
<div className="animate-infinite-scroll space-x-6 pb-2">
  {displayProjects.map((project, index) => (
    <div key={index} className="min-w-[300px] bg-white p-6 rounded-xl">
      {/* Project content */}
    </div>
  ))}
</div>
```

### 2. Dynamic Skills with React Icons

Skills are dynamically loaded and mapped to React Icons:

```javascript
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";

const iconMap = {
  HTML: FaIcons.FaHtml5,
  CSS: FaIcons.FaCss3Alt,
  JavaScript: FaIcons.FaJsSquare,
  React: FaIcons.FaReact,
  // ... more mappings
};

const getIcon = (skillName, iconFromDB) => {
  if (iconFromDB) {
    return FaIcons[iconFromDB] || SiIcons[iconFromDB];
  }
  return iconMap[skillName] || DefaultIcon;
};
```

### 3. Smooth Scroll Navigation

```javascript
const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
  setIsOpen(false);
};
```

### 4. Contact Form with Dropdown

The contact section includes a dropdown for resume/CV downloads:

```jsx
<button onClick={() => setDropdownOpen(!dropdownOpen)}>
  <Download className="w-5 h-5" />
  Hire me!
  <ChevronDown className={`transition-transform ${
    dropdownOpen ? "rotate-180" : ""
  }`} />
</button>

{dropdownOpen && (
  <div className="absolute w-full mt-2 bg-white rounded-lg shadow-2xl">
    <button onClick={() => handleDownload("resume")}>
      <FileText /> Resume
    </button>
    <button onClick={() => handleDownload("cv")}>
      <File /> Curriculum Vitae
    </button>
  </div>
)}
```

### 5. Admin Dashboard with Sidebar

Responsive sidebar navigation with mobile toggle:

```jsx
const [open, setOpen] = useState(false);

// Mobile toggle button
<button onClick={() => setOpen(true)} className="md:hidden">
  <FiMenu />
</button>

// Sidebar with transform animation
<aside className={`fixed transform transition-transform 
  ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
  {/* Sidebar content */}
</aside>
```

## 🏗️ Build for Production

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

Build output goes to `dist/` directory.

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**:
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Import to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Update API URL**:
   
   Update `src/config.js` with your production backend URL:
   ```javascript
   const API_URL = "https://your-backend.railway.app";
   ```

4. **Deploy** - Vercel auto-deploys on every push

### Deploy to Netlify

```bash
# Build locally
npm run build

# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

Or drag and drop the `dist` folder to Netlify UI.

## 🎨 Customization

### Changing Colors

Update Tailwind colors throughout the codebase. Main color is `orange-600`:

```jsx
// Search and replace throughout files:
text-orange-600   // Headings
bg-orange-600     // Buttons
border-orange-600 // Borders
hover:bg-orange-500 // Hover states
```

### Adding New Sections

1. Create component in `src/components/`
2. Add route in `App.jsx`
3. Update `NavBar.jsx` with new link
4. Create admin management page in `src/pages/`
5. Add to admin dashboard sidebar

### Custom Fonts

Update `index.html` or import in CSS:

```html
<!-- In index.html -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

```css
/* In index.css */
body {
  font-family: 'Inter', sans-serif;
}
```

## 📊 Performance Optimizations

- **Code Splitting**: Vite automatically splits by route
- **Lazy Loading Images**: All images use standard lazy loading
- **Optimized Animations**: CSS-based for better performance
- **Minimal Dependencies**: Only essential packages included

## 🐛 Common Issues & Solutions

### Issue: API Connection Failed

**Solution**: Verify backend is running and CORS is configured:
```python
# Backend (app.py)
origins = [
    "http://localhost:5173",
    "https://your-vercel-app.vercel.app",
]
```

### Issue: Login Not Working

**Solution**: Check backend credentials in `.env`:
```env
ADMIN_LOGIN_EMAIL=your_email@example.com
ADMIN_LOGIN_PASSWORD=your_password
```

### Issue: Projects Not Scrolling

**Solution**: Ensure `App.css` is imported in `main.jsx` or `App.jsx`:
```javascript
import "./App.css";
```

### Issue: Icons Not Displaying

**Solution**: Verify React Icons is installed:
```bash
npm install react-icons
```

## 🔧 Available Scripts

```json
{
  "scripts": {
    "dev": "vite",              // Start dev server
    "build": "vite build",      // Build for production
    "preview": "vite preview",  // Preview production build
    "lint": "eslint ."          // Run ESLint
  }
}
```

## 📦 Dependencies

### Main Dependencies
- `react` (19.2.0) - UI library
- `react-dom` (19.2.0) - DOM rendering
- `react-router-dom` (7.9.6) - Routing
- `react-icons` (5.5.0) - Icon library
- `lucide-react` (0.554.0) - Modern icons
- `tailwindcss` (4.1.17) - CSS framework
- `@tailwindcss/vite` (4.1.17) - Tailwind Vite plugin

### Dev Dependencies
- `vite` (7.2.2) - Build tool
- `@vitejs/plugin-react` (5.1.0) - React plugin for Vite
- `eslint` (9.39.1) - Code linting
- `@types/react` (19.2.2) - React types
- `@types/react-dom` (19.2.2) - React DOM types

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**Tunji Paul**

- Portfolio: [https://tunji-paul-portfolio.vercel.app](https://tunji-paul-portfolio.vercel.app)
- GitHub: [@tunjipaul](https://github.com/tunjipaul)
- LinkedIn: [Paul Ogor](https://www.linkedin.com/in/paul-ogor-9103601b1/)
- Twitter: [@tunji_paul_](https://x.com/tunji_paul_)
- Medium: [@tunji_paul_](https://medium.com/@tunji_paul_)
- Email: tunjipaul007@gmail.com

## 🙏 Acknowledgments

- [React](https://react.dev/) - The UI library
- [Vite](https://vitejs.dev/) - The blazing fast build tool
- [Tailwind CSS](https://tailwindcss.com/) - The utility-first CSS framework
- [React Icons](https://react-icons.github.io/react-icons/) - Comprehensive icon library
- [Lucide Icons](https://lucide.dev/) - Beautiful & consistent icons
- [Vercel](https://vercel.com/) - Deployment platform

## 🔗 Related Links

- [Backend Repository](https://github.com/yourusername/portfolio-backend)
- [Live Demo](https://tunji-paul-portfolio.vercel.app)
- [API Documentation](http://localhost:8000/docs)

---

### Quick Start Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 📞 Support

For support, questions, or feedback:
- Open an issue on GitHub
- Email: tunjipaul007@gmail.com
- Twitter DM: [@tunji_paul_](https://x.com/tunji_paul_)

---

**Made with ❤️ using React + Vite + Tailwind CSS**