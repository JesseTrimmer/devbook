# DevBook

## AI-Powered Web Development Booking Platform

A full-stack web application where clients browse web development services, get an instant AI-powered price estimate, and book a developer — all in one place. Built as a Capstone Project using the MERN stack.

---

## Live Demo

- **Frontend:** https://devbook-rho.vercel.app
- **Backend API:** https://devbook-api.onrender.com

---

## Tech Stack

- **Frontend:** React.js with Vite, React Router, Axios
- **Backend:** Node.js and Express.js
- **Database:** MongoDB with Mongoose on MongoDB Atlas
- **Authentication:** JWT and bcryptjs
- **AI Feature:** Groq API with LLaMA 3.3 70B Versatile
- **Deployment:** Vercel (frontend) and Render (backend)

---

## Key Features

- User registration and login with JWT authentication and protected routes
- Browse 5 web development service categories with category filter buttons
- AI-powered pricing estimator generating an instant cost breakdown before booking
- Full booking system with project name, description, preferred start date and notes
- Client dashboard showing bookings, statuses, AI estimates and meeting details
- Admin dashboard to manage all bookings, update statuses and schedule meetings
- Meeting scheduling where admin sets date, time and notes saved to the database
- Fully responsive dark glassmorphism UI

---

## AI Pricing Estimator

The AI pricing estimator uses the Groq API with the LLaMA 3.3 70B Versatile model. When a client fills out the booking form they provide their project type, number of pages, desired timeline and additional features. This is sent to the backend where a structured prompt is passed to the Groq API. The model returns a cost estimate range, a detailed line-item breakdown and a recommended project timeline. The estimate displays before the client confirms their booking and is saved with the booking record in MongoDB.

---

## Getting Started

### Prerequisites

- Node.js version 18 or higher
- A MongoDB Atlas account
- A free Groq API key from console.groq.com

### Clone the Repository

    git clone https://github.com/JesseTrimmer/devbook.git
    cd devbook

### Backend Setup

    cd server
    npm install
    npm run dev

Create a file called .env inside the server folder:

    MONGO_URI=your_mongodb_atlas_connection_string
    JWT_SECRET=your_jwt_secret_key
    CLIENT_URL=http://localhost:5173
    PORT=5000
    GROQ_API_KEY=your_groq_api_key

Seed the database:

    node seed.js

### Frontend Setup

    cd client
    npm install
    npm run dev

Create a file called .env inside the client folder:

    VITE_API_URL=http://localhost:5000

Open http://localhost:5173 in your browser.

---

## Environment Variables

### Server
| Variable | Description |
|---|---|
| MONGO_URI | MongoDB Atlas connection string |
| JWT_SECRET | Secret key for signing JWT tokens |
| CLIENT_URL | Frontend URL for CORS |
| PORT | Server port, defaults to 5000 |
| GROQ_API_KEY | API key for the Groq AI service |

### Client
| Variable | Description |
|---|---|
| VITE_API_URL | Base URL of the backend API |

---

## Deployment

The frontend is deployed to Vercel using the VITE_API_URL environment variable set in the Vercel dashboard. The backend is deployed to Render with all environment variables in the Render dashboard. The database is on MongoDB Atlas M0 free tier. CORS is configured to accept requests from the Vercel production URL.

---

## Responsible AI Use

The AI pricing estimator helps clients understand approximate costs before booking. All estimates are clearly labelled as estimates and not binding quotes. No personal user data is sent to the AI. Only project type, page count, features, timeline and description are in the prompt. All responses are validated on the backend before being returned to the client.

---

## SDLC Phases

| Phase | Description |
|---|---|
| Phase 1 - Planning | Problem statement, user stories, requirements, wireframes, MongoDB schema |
| Phase 2 - Setup | GitHub repo, folder structure, Express server, MongoDB Atlas |
| Phase 3 - Backend | Mongoose models, JWT auth, REST API routes and controllers |
| Phase 4 - Frontend | React pages, AuthContext, React Router, dark UI |
| Phase 5 - AI Feature | Groq API integration, pricing estimator, booking form |
| Phase 6 - Testing | End-to-end testing of all user flows and bug fixes |
| Phase 7 - Deployment | Vercel, Render, MongoDB Atlas, CORS configuration |

---

## Author

Jessica Trimmer - Capstone Project 2026
