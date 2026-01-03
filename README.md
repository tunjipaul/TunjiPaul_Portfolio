# 🚀 Personal Portfolio - Full Stack Application

A modern, full-featured portfolio website built with FastAPI (Python) backend and React frontend. This application allows you to showcase your projects, skills, and professional information with a complete admin panel for content management.

## ✨ Features

### Public Features
- **Hero Section**: Dynamic landing page with customizable title, subtitle, and call-to-action buttons
- **About Section**: Professional bio with education history and profile image
- **Projects Showcase**: Display your portfolio projects with links to GitHub repos and live demos
- **Skills Display**: Organized skill categories with icons
- **Contact Form**: Functional contact form with email notifications
- **Resume/CV Download**: Downloadable PDF documents for resume and CV

### Admin Features
- **Secure Authentication**: Login system for admin access
- **Content Management**: Full CRUD operations for all sections
- **Message Management**: View, mark as read, and reply to contact form submissions
- **Document Upload**: Upload and manage resume/CV PDF files
- **Real-time Updates**: All changes reflect immediately on the public site

## 🛠️ Tech Stack

### Backend
- **FastAPI**: Modern Python web framework
- **SQLAlchemy**: ORM for database operations
- **PostgreSQL**: Primary database
- **Pydantic**: Data validation
- **Resend**: Email service for contact form notifications
- **python-multipart**: File upload support

### Frontend
- React (mentioned in CORS origins)
- Deployed on Vercel

## 📋 Prerequisites

- Python 3.8+
- PostgreSQL database
- Node.js (for frontend)
- Resend API key (for email functionality)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd portfolio-project
```

### 2. Backend Setup

#### Create Virtual Environment

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

#### Install Dependencies

```bash
pip install -r requirements.txt
```

#### Configure Environment Variables

Create a `.env` file in the root directory:

```env
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/portfolio_db
# OR individual components:
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=portfolio_db

# Admin Credentials
ADMIN_LOGIN_EMAIL=admin@example.com
ADMIN_LOGIN_PASSWORD=your_secure_password

# Email Configuration
RESEND_API_KEY=your_resend_api_key
ADMIN_EMAIL=your_email@example.com
```

#### Setup Database

```bash
# Create PostgreSQL database
psql -U postgres
CREATE DATABASE portfolio_db;
\q

# Run the application (tables will be created automatically)
python app.py
```

### 3. Run the Application

```bash
# Development mode
uvicorn app:app --reload

# Production mode
uvicorn app:app --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

## 📚 API Documentation

Once the server is running, visit:
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

## 🔌 API Endpoints

### Authentication
- `POST /login` - Admin login

### Hero Section
- `GET /api/hero` - Get all hero sections
- `GET /api/hero/{id}` - Get specific hero section
- `POST /api/hero` - Create hero section
- `PUT /api/hero/{id}` - Update hero section
- `DELETE /api/hero/{id}` - Delete hero section

### About Section
- `GET /api/about` - Get all about sections
- `GET /api/about/{id}` - Get specific about section
- `POST /api/about` - Create about section
- `PUT /api/about/{id}` - Update about section
- `DELETE /api/about/{id}` - Delete about section

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/manage` - Get projects (admin view)
- `GET /api/projects/{id}` - Get specific project
- `POST /api/projects` - Create project
- `PUT /api/projects/{id}` - Update project
- `DELETE /api/projects/{id}` - Delete project

### Skills
- `GET /api/skills` - Get all skills
- `GET /api/skills/{id}` - Get specific skill
- `POST /api/skills` - Create skill
- `PUT /api/skills/{id}` - Update skill
- `DELETE /api/skills/{id}` - Delete skill

### Messages (Contact Form)
- `GET /api/messages` - Get all messages
- `GET /api/messages/{id}` - Get specific message
- `POST /api/messages` - Submit contact form
- `PUT /api/messages/{id}` - Update message (mark as read)
- `DELETE /api/messages/{id}` - Delete message
- `POST /api/messages/reply` - Reply to a message

### Resume/CV Management
- `GET /api/resume/current` - Get current uploaded files info
- `GET /api/resume/download/{type}` - Download resume or CV
- `POST /api/resume/upload` - Upload resume or CV (PDF only)
- `DELETE /api/resume/delete/{type}` - Delete resume or CV

## 📁 Project Structure

```
portfolio-project/
├── backend/
│   ├── app.py                 # Main FastAPI application
│   ├── database.py            # Database models and configuration
│   ├── about_routes.py        # About section endpoints
│   ├── hero_routes.py         # Hero section endpoints
│   ├── projects_routes.py     # Projects endpoints
│   ├── skills_routes.py       # Skills endpoints
│   ├── messages_routes.py     # Contact form endpoints
│   ├── resume_routes.py       # Resume/CV management
│   ├── requirements.txt       # Python dependencies
│   ├── .env                   # Environment variables
│   └── uploads/              # Uploaded documents storage
│       └── documents/
├── frontend/                  # React frontend (separate repo/folder)
└── README.md
```

## 🗃️ Database Schema

### Users Table
- `id`: Primary key
- `email`: Unique email
- `password`: Admin password

### Hero Table
- `id`: Primary key
- `title`: Hero title
- `subtitle`: Hero subtitle
- `image_url`: Profile/hero image
- `view_button_text`: CTA button text
- `contact_button_text`: Contact button text

### About Table
- `id`: Primary key
- `title`: Section title
- `content`: About content
- `image_url`: Profile image
- `education`: JSON array of education items

### Projects Table
- `id`: Primary key
- `title`: Project name
- `desc`: Project description
- `github`: GitHub repository URL
- `demo`: Live demo URL
- `created_at`: Timestamp
- `updated_at`: Timestamp

### Skills Table
- `id`: Primary key
- `name`: Skill name (unique)
- `category`: Skill category
- `icon`: Icon identifier
- `created_at`: Timestamp

### Messages Table
- `id`: Primary key
- `name`: Sender name
- `email`: Sender email
- `subject`: Message subject
- `message`: Message content
- `is_read`: Read status
- `created_at`: Timestamp

## 🔒 Security Features

- Password-protected admin routes
- CORS configuration for allowed origins
- SQL injection prevention via SQLAlchemy ORM
- Input validation with Pydantic models
- Environment variable protection

## 📧 Email Notifications

The application uses Resend for sending email notifications:
- Automatic notifications when contact form is submitted
- Admin can reply to messages directly through the API
- Professional HTML email templates

## 🚀 Deployment

### Backend Deployment (Render/Railway/Heroku/DigitalOcean)

1. Set environment variables on your hosting platform
2. Ensure PostgreSQL database is provisioned
3. Deploy using:
```bash
uvicorn app:app --host 0.0.0.0 --port $PORT
```

### Frontend Deployment (Vercel)

The CORS configuration already includes Vercel deployment:
```python
origins = [
    "https://tunji-paul-portfolio.vercel.app",
]
```

## 🧪 Testing

Test database connection:
```bash
python test_db.py
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👤 Author

**Tunji Paul**

- Portfolio: [https://tunji-paul-portfolio.vercel.app](https://tunji-paul-portfolio.vercel.app)
- GitHub: [@tunjipaul](https://github.com/tunjipaul)

## 🙏 Acknowledgments

- FastAPI for the excellent framework
- Resend for email services
- SQLAlchemy for ORM capabilities
- The open-source community

## 📞 Support

For support, email tunjipaul007@gmail.com or open an issue in the repository.

---

**Note**: Remember to never commit your `.env` file to version control. Add it to `.gitignore`:

```gitignore
# .gitignore
.env
venv/
__pycache__/
*.pyc
uploads/
.DS_Store
```

Happy coding! 🎉
