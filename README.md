# 🚀 Personal Portfolio - Full Stack Application

A modern, feature-rich portfolio website built with **FastAPI** (Python) backend and **React** (Vite) frontend. This application showcases projects, skills, and professional information with a complete admin dashboard for dynamic content management.

## ✨ Features

### 🌐 Public Features

- **Hero Section**: Dynamic landing page with customizable title, subtitle, and call-to-action buttons
- **About Section**: Professional bio with education history and profile image
- **Projects Showcase**: Portfolio projects with GitHub repositories and live demo links
- **Skills Display**: Categorized technical skills with icons
- **Contact Form**: Functional contact form with email notifications via Resend API
- **Resume/CV Download**: Downloadable PDF documents for resume and CV

### 🔐 Admin Features

- **Secure Authentication**: JWT-based login system with bcrypt password hashing
- **Content Management**: Full CRUD operations for all sections (Hero, About, Projects, Skills)
- **Message Management**: View, mark as read, reply to, and delete contact form submissions
- **Document Upload**: Upload and manage resume/CV PDF files with database persistence
- **Real-time Updates**: All changes reflect immediately on the public site
- **Protected Routes**: Role-based access control for admin-only endpoints
- **Health Monitoring**: Health check endpoint for uptime monitoring

## 🛠️ Tech Stack

### Backend

- **[FastAPI](https://fastapi.tiangolo.com/)**: Modern, high-performance Python web framework
- **[SQLAlchemy](https://www.sqlalchemy.org/)**: SQL toolkit and ORM
- **[PostgreSQL](https://www.postgresql.org/)**: Relational database
- **[Pydantic](https://docs.pydantic.dev/)**: Data validation using Python type annotations
- **[bcrypt](https://pypi.org/project/bcrypt/)**: Secure password hashing
- **[JWT](https://jwt.io/)**: JSON Web Tokens for authentication
- **[Resend](https://resend.com/)**: Modern email API for contact form notifications
- **[python-multipart](https://pypi.org/project/python-multipart/)**: File upload support
- **[Alembic](https://alembic.sqlalchemy.org/)**: Database migration tool for version-controlled schema changes
- **[Aiven](https://aiven.io/)**: Managed PostgreSQL database hosting

### Frontend

- **[React](https://react.dev/)**: UI library for building user interfaces
- **[Vite](https://vitejs.dev/)**: Next-generation frontend build tool
- **[React Router](https://reactrouter.com/)**: Client-side routing
- **Deployment**: [Vercel](https://vercel.com/)

## 📋 Prerequisites

- **Python 3.8+** (Python 3.12 recommended)
- **PostgreSQL** database
- **Node.js 16+** (for frontend)
- **Resend API key** (for email functionality)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/tunjipaul/TunjiPaul_Portfolio.git
cd TunjiPaul_Portfolio
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd backEnd
```

#### Create Virtual Environment

```bash
# Create virtual environment
python -m venv myenv

# Activate virtual environment
# On Windows:
myenv\Scripts\activate
# On macOS/Linux:
source myenv/bin/activate
```

#### Install Dependencies

```bash
pip install -r requirements.txt
```

#### Configure Environment Variables

Create a `.env` file in the `backEnd` directory (use `.env.example` as reference):

```env
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/portfolio_db

# OR individual components:
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=portfolio_db

# Admin Credentials (will be hashed automatically)
ADMIN_LOGIN_EMAIL=admin@example.com
ADMIN_LOGIN_PASSWORD=your_secure_password

# JWT Configuration
JWT_SECRET_KEY=your_jwt_secret_key_here_make_it_long_and_random
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_HOURS=24

# Email Configuration
RESEND_API_KEY=re_your_resend_api_key
ADMIN_EMAIL=your_email@example.com

# CORS Configuration (optional, defaults provided)
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000,https://tunji-paul-portfolio.vercel.app
```

#### Setup Database

```bash
# Create PostgreSQL database
psql -U postgres
CREATE DATABASE portfolio_db;
\q

# Tables will be created automatically when you run the application
```

### 3. Frontend Setup

Navigate to the frontend directory:

```bash
cd ../TunjiPaul-Portfolio
```

#### Install Dependencies

```bash
npm install
```

#### Configure Environment Variables

Create a `.env.local` file:

```env
VITE_API_URL=http://localhost:8000
```

### 4. Run the Application

#### Start Backend Server

```bash
# From the backEnd directory
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

#### Start Frontend Development Server

```bash
# From the TunjiPaul-Portfolio directory
npm run dev
```

The frontend will be available at `http://localhost:5173`

## 📚 API Documentation

Once the backend server is running, interactive API documentation is available at:

- **Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc**: [http://localhost:8000/redoc](http://localhost:8000/redoc)

## 🔌 API Endpoints

### Authentication

- `POST /login` - Admin login (returns JWT access token)

### Hero Section

- `GET /api/hero` - Get all hero sections
- `GET /api/hero/{id}` - Get specific hero section
- `POST /api/hero` - Create hero section ✅ _Protected_
- `PUT /api/hero/{id}` - Update hero section ✅ _Protected_
- `DELETE /api/hero/{id}` - Delete hero section ✅ _Protected_

### About Section

- `GET /api/about` - Get all about sections
- `GET /api/about/{id}` - Get specific about section
- `POST /api/about` - Create about section ✅ _Protected_
- `PUT /api/about/{id}` - Update about section ✅ _Protected_
- `DELETE /api/about/{id}` - Delete about section ✅ _Protected_

### Projects

- `GET /api/projects` - Get all projects
- `GET /api/projects/manage` - Get projects (admin view) ✅ _Protected_
- `GET /api/projects/{id}` - Get specific project
- `POST /api/projects` - Create project ✅ _Protected_
- `PUT /api/projects/{id}` - Update project ✅ _Protected_
- `DELETE /api/projects/{id}` - Delete project ✅ _Protected_

### Skills

- `GET /api/skills` - Get all skills
- `GET /api/skills/{id}` - Get specific skill
- `POST /api/skills` - Create skill ✅ _Protected_
- `PUT /api/skills/{id}` - Update skill ✅ _Protected_
- `DELETE /api/skills/{id}` - Delete skill ✅ _Protected_

### Messages (Contact Form)

- `GET /api/messages` - Get all messages ✅ _Protected_
- `GET /api/messages/{id}` - Get specific message ✅ _Protected_
- `POST /api/messages` - Submit contact form (public, sends email notification)
- `PUT /api/messages/{id}` - Update message (mark as read) ✅ _Protected_
- `DELETE /api/messages/{id}` - Delete message ✅ _Protected_
- `POST /api/messages/reply` - Reply to a message ✅ _Protected_

### Resume/CV Management

- `GET /api/resume/current` - Get current uploaded files info
- `GET /api/resume/download/{type}` - Download resume or CV (type: `resume` or `cv`)
- `POST /api/resume/upload` - Upload resume or CV PDF (stored in database) ✅ _Protected_
- `DELETE /api/resume/delete/{type}` - Delete resume or CV ✅ _Protected_

### Health Check

- `GET /health` - Health check endpoint for uptime monitoring

## 📁 Project Structure

```
TunjiPaul_Portfolio/
├── backEnd/
│   ├── alembic/               # Database migration scripts
│   ├── uploads/               # Uploaded documents storage
│   │   └── documents/         # PDF files
│   ├── app.py                 # Main FastAPI application
│   ├── database.py            # Database models and configuration
│   ├── auth_utils.py          # JWT authentication utilities
│   ├── about_routes.py        # About section endpoints
│   ├── hero_routes.py         # Hero section endpoints
│   ├── projects_routes.py     # Projects endpoints
│   ├── skills_routes.py       # Skills endpoints
│   ├── messages_routes.py     # Contact form endpoints
│   ├── resume_routes.py       # Resume/CV management
│   ├── requirements.txt       # Python dependencies
│   ├── alembic.ini            # Alembic configuration
│   ├── .env                   # Environment variables (not in git)
│   └── .env.example           # Example environment variables
│
├── TunjiPaul-Portfolio/       # React frontend
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/             # Page components (Home, Admin, etc.)
│   │   ├── utils/             # Utility functions (API client)
│   │   ├── App.jsx            # Main app component with routing
│   │   └── main.jsx           # Entry point
│   ├── public/                # Static assets
│   ├── package.json
│   ├── vite.config.js
│   └── .env.local             # Frontend environment variables
│
├── README.md                  # This file
└── LICENSE
```

## 🗃️ Database Schema

### Users Table

| Column     | Type         | Constraints      | Description            |
| ---------- | ------------ | ---------------- | ---------------------- |
| `id`       | SERIAL       | PRIMARY KEY      | Auto-incrementing ID   |
| `email`    | VARCHAR(255) | UNIQUE, NOT NULL | Admin email address    |
| `password` | VARCHAR(255) | NOT NULL         | Bcrypt-hashed password |

### Hero Table

| Column                | Type         | Constraints | Description            |
| --------------------- | ------------ | ----------- | ---------------------- |
| `id`                  | SERIAL       | PRIMARY KEY | Auto-incrementing ID   |
| `title`               | VARCHAR(255) | NOT NULL    | Hero title text        |
| `subtitle`            | TEXT         | NOT NULL    | Hero subtitle text     |
| `image_url`           | VARCHAR(500) |             | Profile/hero image URL |
| `view_button_text`    | VARCHAR(255) |             | CTA button text        |
| `contact_button_text` | VARCHAR(255) |             | Contact button text    |

### About Table

| Column      | Type         | Constraints | Description              |
| ----------- | ------------ | ----------- | ------------------------ |
| `id`        | SERIAL       | PRIMARY KEY | Auto-incrementing ID     |
| `title`     | VARCHAR(255) |             | Section title            |
| `content`   | TEXT         |             | About content/bio        |
| `image_url` | VARCHAR(500) |             | Profile image URL        |
| `education` | JSON         |             | Array of education items |

### Projects Table

| Column       | Type          | Constraints   | Description           |
| ------------ | ------------- | ------------- | --------------------- |
| `id`         | SERIAL        | PRIMARY KEY   | Auto-incrementing ID  |
| `title`      | VARCHAR(255)  | NOT NULL      | Project name          |
| `desc`       | VARCHAR(1000) | NOT NULL      | Project description   |
| `github`     | VARCHAR(500)  |               | GitHub repository URL |
| `demo`       | VARCHAR(500)  |               | Live demo URL         |
| `created_at` | TIMESTAMP     | DEFAULT NOW() | Creation timestamp    |
| `updated_at` | TIMESTAMP     | DEFAULT NOW() | Last update timestamp |

### Skills Table

| Column       | Type         | Constraints      | Description          |
| ------------ | ------------ | ---------------- | -------------------- |
| `id`         | SERIAL       | PRIMARY KEY      | Auto-incrementing ID |
| `name`       | VARCHAR(255) | UNIQUE, NOT NULL | Skill name           |
| `category`   | VARCHAR(255) | NOT NULL         | Skill category       |
| `icon`       | VARCHAR(255) |                  | Icon identifier      |
| `created_at` | TIMESTAMP    | DEFAULT NOW()    | Creation timestamp   |

### Messages Table

| Column       | Type         | Constraints   | Description          |
| ------------ | ------------ | ------------- | -------------------- |
| `id`         | SERIAL       | PRIMARY KEY   | Auto-incrementing ID |
| `name`       | VARCHAR(255) | NOT NULL      | Sender name          |
| `email`      | VARCHAR(255) | NOT NULL      | Sender email         |
| `subject`    | VARCHAR(255) | NOT NULL      | Message subject      |
| `message`    | TEXT         | NOT NULL      | Message content      |
| `is_read`    | BOOLEAN      | DEFAULT FALSE | Read status          |
| `created_at` | TIMESTAMP    | DEFAULT NOW() | Creation timestamp   |

### Documents Table

| Column        | Type         | Constraints      | Description                  |
| ------------- | ------------ | ---------------- | ---------------------------- |
| `id`          | SERIAL       | PRIMARY KEY      | Auto-incrementing ID         |
| `type`        | VARCHAR(50)  | UNIQUE, NOT NULL | Document type (resume or cv) |
| `filename`    | VARCHAR(255) | NOT NULL         | Original filename            |
| `content`     | BYTEA        | NOT NULL         | PDF binary data              |
| `size`        | INTEGER      | NOT NULL         | File size in bytes           |
| `uploaded_at` | TIMESTAMP    | DEFAULT NOW()    | Upload timestamp             |
| `updated_at`  | TIMESTAMP    | DEFAULT NOW()    | Last update timestamp        |

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication for admin routes
- **Bcrypt Password Hashing**: Industry-standard password encryption
  - Automatic password migration from plaintext to bcrypt on first login
  - Salted hashing with configurable rounds
- **CORS Protection**: Whitelist-based origin control
- **SQL Injection Prevention**: SQLAlchemy ORM with parameterized queries
- **Input Validation**: Pydantic models for request/response validation
- **Environment Variables**: Sensitive credentials stored securely
- **Protected Routes**: Dependency injection for route protection
- **Token Expiration**: Configurable JWT token lifetime

## 📧 Email Notifications

The application uses **Resend** for professional email delivery:

- ✉️ Automatic notifications when contact form is submitted
- ✉️ Admin reply functionality directly through the API
- ✉️ Clean, professional HTML email templates
- ✉️ Error handling and logging for failed deliveries

## 🚀 Deployment

### Backend Deployment (Render/Railway)

1. **Set environment variables** on your hosting platform:
   - `DATABASE_URL`
   - `ADMIN_LOGIN_EMAIL`
   - `ADMIN_LOGIN_PASSWORD`
   - `JWT_SECRET_KEY`
   - `RESEND_API_KEY`
   - `ADMIN_EMAIL`
   - `ALLOWED_ORIGINS`

2. **Provision PostgreSQL database** (most platforms offer managed PostgreSQL)

3. **Deploy command**:

```bash
uvicorn app:app --host 0.0.0.0 --port $PORT
```

4. **Build command** (includes Alembic migrations):

```bash
pip install -r requirements.txt && alembic upgrade head
```

5. **Optional: Set up uptime monitoring** using services like UptimeRobot to ping `/health` endpoint every 5 minutes to prevent free-tier spin-down

### Frontend Deployment (Vercel)

1. **Connect your GitHub repository** to Vercel

2. **Configure build settings**:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Set environment variables**:
   - `VITE_API_URL`: Your deployed backend URL

4. **Deploy**: Vercel will automatically deploy on push to main branch

**Live Portfolio**: [https://tunji-paul-portfolio.vercel.app](https://tunji-paul-portfolio.vercel.app)

## 🧪 Testing

Test database connection:

```bash
cd backEnd
python test_db.py
```

Access API documentation:

- Swagger UI: `http://localhost:8000/docs`
- Test all endpoints interactively

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Tunji Paul**

- 🌐 Portfolio: [tunji-paul-portfolio.vercel.app](https://tunji-paul-portfolio.vercel.app)
- 💻 GitHub: [@tunjipaul](https://github.com/tunjipaul)
- 📧 Email: tunjipaul007@gmail.com

## 🙏 Acknowledgments

- [FastAPI](https://fastapi.tiangolo.com/) for the excellent Python web framework
- [Resend](https://resend.com/) for reliable email services
- [SQLAlchemy](https://www.sqlalchemy.org/) for powerful ORM capabilities
- [React](https://react.dev/) and [Vite](https://vitejs.dev/) for modern frontend development
- The open-source community for continuous inspiration

## 📞 Support

For support, email **tunjipaul007@gmail.com** or [open an issue](https://github.com/tunjipaul/TunjiPaul_Portfolio/issues) in the repository.

---

## 📌 Important Notes

### Security Best Practices

1. **Never commit `.env` files** to version control
2. Use **strong, unique passwords** for admin accounts
3. Keep your **JWT secret key** long and random (min 32 characters)
4. Regularly **update dependencies** for security patches
5. Use **HTTPS** in production deployments

### `.gitignore` Configuration

Make sure your `.gitignore` includes:

```gitignore
# Environment variables
.env
.env.local

# Virtual environments
venv/
myenv/
env/

# Python
__pycache__/
*.pyc
*.pyo
*.pyd
.Python

# Uploads
uploads/
*.pdf

# IDE
.vscode/
.idea/
*.swp

# OS
.DS_Store
Thumbs.db

# Dependencies
node_modules/
```

---

**Happy coding! 🎉** Build something amazing!
