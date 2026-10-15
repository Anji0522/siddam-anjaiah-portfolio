# Siddam Anjaiah — MERN Developer Portfolio 🚀

[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-24-green?logo=node.js)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express-4.19-lightgrey?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-brightgreen?logo=mongodb)](https://www.mongodb.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> A production-grade, full-stack **MERN Developer Portfolio** engineered for **Siddam Anjaiah** (React Frontend Developer | Full-Stack Developer). Built to showcase real-world REST API-driven single page applications, full-stack architectures, protected routing, and backend systems.

---

## 📌 Table of Contents
- [About the Project](#-about-the-project)
- [Live Demo & Repositories](#-live-demo--repositories)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Featured Projects](#-featured-projects)
- [Architecture & Data Flow](#-architecture--data-flow)
- [API Documentation](#-api-documentation)
- [Environment Variables](#-environment-variables)
- [Installation & Local Setup](#-installation--local-setup)
- [Production Build & Deployment](#-production-build--deployment)
- [Future Enhancements](#-future-enhancements)
- [Author & Contact](#-author--contact)

---

## 📖 About the Project
This application is not a static template. It is a complete, production-ready full-stack MERN application connecting a high-performance **React (Vite)** client to an **Express.js & Node.js** API server with a **MongoDB (Mongoose)** database.

The frontend retrieves dynamic portfolio data (Profile, Projects, Skills, Certifications, Education, and Contact Messages) through structured REST APIs, while enabling verified administrative management with JWT authentication and password hashing.

---

## 🌐 Live Demo & Repositories
- **GitHub Repository**: [https://github.com/Anji0522/siddam-anjaiah-portfolio](https://github.com/Anji0522)
- **LinkedIn Profile**: [https://www.linkedin.com/in/siddam-anjaiah/](https://www.linkedin.com/in/siddam-anjaiah/)
- **ServiceNest Live Demo**: [https://anji0522.github.io/ServiceNest/](https://anji0522.github.io/ServiceNest/)
- **Book Hub Live Demo**: [https://anji0522.github.io/bookhub/](https://anji0522.github.io/bookhub/)
- **Jobby App Live Demo**: [https://anji0522.github.io/JobbyApp/](https://anji0522.github.io/JobbyApp/)
- **Nxt Watch Live Demo**: [https://nxtwatch-anjisiddam01.surge.sh/](https://nxtwatch-anjisiddam01.surge.sh/)

---

## ✨ Key Features
- **True MERN Architecture**: React client communicates with Express REST endpoints backed by MongoDB / Mongoose models.
- **Admin JWT Authentication**: Secure bcrypt password encryption and HS256 JWT tokens guarding admin dashboard routes (`/admin/dashboard`).
- **Interactive Admin Dashboard**: Full CRUD management over Projects, Skills, Certifications, Profile metadata, and inbound Contact Messages.
- **Live GitHub Integration**: Direct synchronization with `https://api.github.com/users/Anji0522/repos` featuring loading spinners, error boundaries, empty states, and retry actions.
- **Dynamic Filter & Search System**: Instant multi-criteria filtering across categories (Full-Stack, Frontend, Backend) and individual technologies with alphabetical and date sorting.
- **Verified Official Resume Viewer**: Embedded 1-page PDF viewer with direct in-browser inspection and one-click PDF downloading.
- **NxtWave Verified Certifications**: Direct links to official CCBP 4.0 Academy certificate verification credentials.
- **Contact Message Pipeline**: Validated contact form submitting to `POST /api/contact`, stored securely in MongoDB with rate-limiting spam protection and celebratory canvas-confetti.
- **Light & Dark Mode**: Seamless theme toggling persisted in `localStorage` and synchronized with system color schemes.
- **Fluid & Accessible Animations**: Framer Motion transitions adhering strictly to `prefers-reduced-motion` accessibility standards.
- **Full SEO & Open Graph Support**: Optimized title tags, meta descriptions, Open Graph banners, Twitter cards, `robots.txt`, and `sitemap.xml`.
- **Zero-Setup Database Fallback**: Built-in in-memory MongoDB fallback so the app starts and seeds immediately in development even before setting up MongoDB Atlas!

---

## 🛠 Tech Stack

### Frontend
- **Framework & Tooling**: React 18, Vite, JavaScript (ES6+)
- **Routing**: React Router v6 (Nested layouts, protected routes, breadcrumbs)
- **Styling**: Modern CSS3 Custom Properties (Design Tokens), Flexbox, CSS Grid, Styled Components
- **Animations**: Framer Motion, Canvas Confetti
- **Icons**: React Icons (FontAwesome, SimpleIcons, TablerIcons)

### Backend
- **Runtime**: Node.js v20+ / v24
- **Framework**: Express.js
- **Database ORM**: Mongoose 8
- **Security & Middleware**: Helmet, CORS, Express-Rate-Limit, Morgan
- **Authentication**: JSON Web Tokens (`jsonwebtoken`), `bcryptjs`

### Database
- **Primary**: MongoDB Atlas / Local MongoDB
- **Development Fallback**: In-Memory MongoDB Server (`mongodb-memory-server`)

### Deployment & Tooling
- **Frontend**: Vercel / GitHub Pages
- **Backend**: Render / Railway
- **Database**: MongoDB Atlas
- **CI/CD**: GitHub Actions

---

## 🚀 Featured Projects

### 1. ServiceNest (Primary Featured Flagship)
- **Subtitle**: Full Stack Service Marketplace with Role-Based Accounts and Payments
- **Tech Stack**: React, Vite, Node.js, Express.js, SQLite, JWT, bcrypt, Razorpay, GitHub Actions
- **Live Demo**: [https://anji0522.github.io/ServiceNest/](https://anji0522.github.io/ServiceNest/)
- **Core Features**:
  - Customer accounts & Provider accounts with role-based access control (RBAC).
  - 15+ REST endpoints with SQLite database queries.
  - Idempotent booking system (`Idempotency-Key` header) preventing duplicate charges.
  - Razorpay Checkout integration with cryptographic webhook signature verification.
  - Participant-only auto-refreshing chat and cash-after-service support.

### 2. Book Hub
- **Description**: Book Discovery Web App with Cookie-Based JWT Authentication
- **Tech Stack**: React, React Router, react-slick, react-icons, js-cookie, REST APIs
- **Live Demo**: [https://anji0522.github.io/bookhub/](https://anji0522.github.io/bookhub/)
- **Core Features**: 5-route protected application, cookie auth, combined shelf and keyword search, responsive carousel, and React Testing Library compliance.

### 3. Jobby App
- **Description**: Job Search Web App with Multi-Criteria Query Filtering
- **Tech Stack**: React, React Router, js-cookie, react-icons, REST APIs
- **Live Demo**: [https://anji0522.github.io/JobbyApp/](https://anji0522.github.io/JobbyApp/)
- **Core Features**: JWT authentication, unified search string merging checkboxes and salary radio buttons, job details page with similar recommendations.

### 4. Nxt Watch
- **Description**: Video Streaming Application with Light and Dark Theming
- **Tech Stack**: React, React Router, Styled Components, Context API, react-player, REST APIs
- **Live Demo**: [https://nxtwatch-anjisiddam01.surge.sh/](https://nxtwatch-anjisiddam01.surge.sh/)
- **Core Features**: Global state with Context API, light/dark theming, video playback, mutually exclusive Like/Dislike, and Saved Videos route.

### 5. Twitter Clone — Backend REST API
- **Description**: Scalable Social Network REST API with Relational Queries
- **Tech Stack**: Node.js, Express.js, SQLite, JWT, bcrypt
- **Core Features**: 11 RESTful endpoints, bcrypt hashing, JWT middleware, SQL joins and aggregates across 5 relational tables, and feed generation.

---

## 📡 API Documentation

### Profile Endpoints
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/profile` | Public | Retrieve candidate profile details and statistics |
| `PUT` | `/api/profile` | Private (Admin) | Update candidate profile details |

### Projects Endpoints
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/projects` | Public | List all projects (supports `?category=`, `?search=`, `?sort=`) |
| `GET` | `/api/projects/:id` | Public | Get single project by MongoDB ID or slug (e.g. `/api/projects/servicenest`) |
| `POST` | `/api/projects` | Private (Admin) | Create a new portfolio project |
| `PUT` | `/api/projects/:id` | Private (Admin) | Update project information |
| `DELETE` | `/api/projects/:id` | Private (Admin) | Delete a portfolio project |

### Skills Endpoints
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/skills` | Public | Retrieve all categorized technical skills |
| `POST` | `/api/skills` | Private (Admin) | Add a new technical skill |
| `PUT` | `/api/skills/:id` | Private (Admin) | Update an existing skill |
| `DELETE` | `/api/skills/:id` | Private (Admin) | Remove a skill |

### Certifications Endpoints
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/certifications` | Public | List all verified NxtWave certifications |
| `POST` | `/api/certifications` | Private (Admin) | Add a new certification record |
| `PUT` | `/api/certifications/:id` | Private (Admin) | Edit certification details |
| `DELETE` | `/api/certifications/:id` | Private (Admin) | Delete a certification |

### Education Endpoints
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/education` | Public | Retrieve education timeline milestones |
| `POST` | `/api/education` | Private (Admin) | Add an education qualification |
| `PUT` | `/api/education/:id` | Private (Admin) | Update qualification details |
| `DELETE` | `/api/education/:id` | Private (Admin) | Delete an education item |

### Contact Endpoints
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/contact` | Public (Rate-Limited) | Submit a message through the contact form |
| `GET` | `/api/contact` | Private (Admin) | View all received contact messages |
| `PUT` | `/api/contact/:id/read` | Private (Admin) | Toggle message read status |
| `DELETE` | `/api/contact/:id` | Private (Admin) | Delete an inbound message |

### Admin Endpoints
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/admin/login` | Public (Rate-Limited) | Authenticate admin credentials & issue JWT |
| `GET` | `/api/admin/me` | Private (Admin) | Validate active admin token |

---

## ⚙️ Environment Variables

### Server (`server/.env`)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/siddam_portfolio?retryWrites=true&w=majority
JWT_SECRET=super_secret_jwt_token_change_in_production_key_12345
ADMIN_EMAIL=anjisiddam01@gmail.com
ADMIN_PASSWORD=AdminSecurePassword@2026
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000,https://anji0522.github.io
```

### Client (`client/.env`)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 💻 Installation & Local Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Anji0522/siddam-anjaiah-portfolio.git
cd siddam-anjaiah-portfolio
```

### 2. Install Dependencies
Install dependencies across the root, backend, and frontend with a single command:
```bash
npm run install:all
```
*(Or install individually: `npm install`, then `cd server && npm install`, then `cd ../client && npm install`)*

### 3. Run Development Servers
Start both the Express API and Vite React development server concurrently:
```bash
npm run dev
```

The application will be live at:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`
- API Health Check: `http://localhost:5000/api/health`

---

## 📦 Production Build & Deployment

### Production Build
To create an optimized production bundle:
```bash
npm run build
```
The compiled assets will be placed in `client/dist`.

### Deployment Guide

#### 1. MongoDB Atlas Database
1. Create a free M0 cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a database user and allow network access from anywhere (`0.0.0.0/0`).
3. Copy your connection string into `MONGODB_URI` in your backend environment variables.

#### 2. Backend Deployment (Render)
1. Create a new Web Service on [Render](https://render.com).
2. Connect your repository and set the root directory to `server`.
3. Set Build Command: `npm install`
4. Set Start Command: `npm start`
5. Configure Environment Variables: `MONGODB_URI`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ALLOWED_ORIGINS`.

#### 3. Frontend Deployment (Vercel / GitHub Pages)
1. On Vercel, import the repository and specify the root directory as `client`.
2. Build Command: `npm run build`
3. Output Directory: `dist`
4. Set Environment Variable: `VITE_API_URL=https://your-render-backend-url.onrender.com/api`.

---

## 🔮 Future Enhancements
- [ ] Blog / Technical articles section with Markdown editor.
- [ ] Direct calendar scheduling integration for interview invitations.
- [ ] Interactive live code playground component showcasing React hook patterns.
- [ ] Dark/Light mode theme schedule (auto-switch based on user sunset time).

---

## 👨‍💻 Author & Contact

**Siddam Anjaiah**  
*React Frontend Developer | Full-Stack Developer*  
- 📍 **Location**: Mancherial, Telangana, India  
- 📧 **Email**: [anjisiddam01@gmail.com](mailto:anjisiddam01@gmail.com)  
- 📞 **Phone**: [+91 9390098364](tel:9390098364)  
- 🐙 **GitHub**: [https://github.com/Anji0522](https://github.com/Anji0522)  
- 💼 **LinkedIn**: [https://www.linkedin.com/in/siddam-anjaiah/](https://www.linkedin.com/in/siddam-anjaiah/)  

---
*Built with ❤️ using the MERN Stack (MongoDB, Express, React, Node.js).*
