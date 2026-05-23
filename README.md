DevBook — AI-Powered Web Development Booking Platform
A full-stack web application where clients can browse web development services, get an instant AI-powered price estimate, and book a developer all in one place. Built as a Capstone Project using the MERN stack.
Live Demo
Frontend: https://devbook-rho.vercel.app
Backend API: https://devbook-api.onrender.com
Tech Stack
Frontend: React.js with Vite, React Router, and Axios
Backend: Node.js and Express.js
Database: MongoDB with Mongoose hosted on MongoDB Atlas
Authentication: JWT and bcryptjs
AI Feature: Groq API with LLaMA 3.3 70B Versatile
Deployment: Vercel for the frontend and Render for the backend
Key Features
User registration and login with JWT authentication and protected routes
Browse 5 web development service categories with category filter buttons
AI-powered pricing estimator that generates an instant cost breakdown before booking
Full booking system with project name, description, preferred start date and notes
Client dashboard showing all bookings, statuses, AI estimates and scheduled meeting details
Admin dashboard to manage all bookings, update project statuses and schedule client meetings
Meeting scheduling where the admin sets a date, time and notes that are saved to the database and shown to the client
Fully responsive dark glassmorphism UI built with React and custom CSS
AI Pricing Estimator
The AI pricing estimator uses the Groq API with the LLaMA 3.3 70B Versatile model. When a client fills out the booking form they provide their project type, number of pages, desired timeline and any additional features needed. This information is sent to the backend where a structured prompt is passed to the Groq API. The model returns a cost estimate range, a detailed line item cost breakdown and a recommended project timeline. The estimate is displayed to the client before they confirm their booking and is saved alongside the booking record in MongoDB.
Getting Started
Prerequisites
Node.js version 18 or higher
A MongoDB Atlas account
A free Groq API key from console.groq.com
Clone the Repository
git clone https://github.com/JesseTrimmer/devbook.git
cd devbook
Backend Setup
Open a terminal and run the following commands:
cd server
npm install
Then create a file called .env inside the server folder and add these five lines replacing the placeholder values with your real ones:
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=http://localhost:5173
PORT=5000
GROQ_API_KEY=your_groq_api_key
Then start the backend:
npm run dev
Then seed the database with the default services:
node seed.js
Frontend Setup
Open a second terminal and run the following commands:
cd client
npm install
Then create a file called .env inside the client folder and add this line:
VITE_API_URL=http://localhost:5000
Then start the frontend:
npm run dev
Then open http://localhost:5173 in your browser.
Environment Variables
Server Variables
MONGO_URI is the MongoDB Atlas connection string
JWT_SECRET is the secret key used to sign JWT tokens
CLIENT_URL is the frontend URL used for CORS
PORT is the port the Express server runs on and defaults to 5000
GROQ_API_KEY is the API key for the Groq AI service
Client Variables
VITE_API_URL is the base URL of the backend API
Deployment
The frontend is deployed to Vercel and connects to the production backend using the VITE_API_URL environment variable set in the Vercel dashboard. The backend is deployed to Render with all environment variables configured in the Render dashboard. The database is hosted on MongoDB Atlas on the free M0 tier. CORS on the backend is configured to accept requests from the Vercel production URL.
Responsible AI Use
The AI pricing estimator is used only to help clients understand approximate project costs before booking. All estimates are clearly labelled as estimates and not binding quotes. No personal user data is sent to the AI model. Only the project type, page count, selected features, timeline preference and project description are included in the prompt. All AI responses are validated on the backend before being returned to the client.
SDLC Phases Completed
Phase 1 Planning covered the problem statement, user stories, functional requirements, wireframes and MongoDB schema design.
Phase 2 Setup covered the GitHub repository, project folder structure, Express server and MongoDB Atlas connection.
Phase 3 Backend covered the Mongoose models, JWT authentication middleware and all REST API routes and controllers.
Phase 4 Frontend covered all React pages, the AuthContext for global state, React Router for navigation and the responsive dark UI.
Phase 5 AI Feature covered the Groq API integration, the pricing estimator controller and wiring the estimate into the booking form.
Phase 6 Testing covered end to end testing of all user flows including registration, booking, AI estimates, admin management and meeting scheduling.
Phase 7 Deployment covered Vercel, Render, MongoDB Atlas and CORS configuration for production.
Author
Jessica Trimmer — Capstone Project 2026
