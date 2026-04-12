# CRM Lead Manager

A full-stack CRM application to manage client leads from website contact forms.

## Tech Stack

- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Database**: MongoDB (via Mongoose)
- **Auth**: JWT (JSON Web Tokens)

## Project Structure

```
crm-app/
├── backend/
│   ├── models/       # MongoDB schemas (User, Lead, Note)
│   ├── routes/       # API routes (auth, leads, notes)
│   ├── middleware/   # JWT auth middleware
│   ├── server.js     # Express server entry point
│   ├── .env.example  # Environment variable template
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/  # Sidebar, LeadModal
    │   ├── context/     # AuthContext
    │   ├── pages/       # Dashboard, Leads, LeadDetail, Login, Register
    │   ├── utils/       # Axios API instance
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    └── package.json
```

## Prerequisites

- Node.js v18+
- MongoDB (local install or free MongoDB Atlas cloud)

## Setup Instructions

### 1. Clone / Download the project

### 2. Set up the Backend

```bash
cd backend
npm install
cp .env.example .env
```

Open `.env` and fill in:

```
MONGO_URI=mongodb://localhost:27017/crm_db
JWT_SECRET=pick_any_long_random_string
```

Start the backend:

```bash
npm run dev
```

You should see:

```
✅ MongoDB connected
🚀 Server on http://localhost:5000
```

### 3. Set up the Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000

### 4. Create your admin account

- Go to http://localhost:3000/register
- The **first** registered user automatically becomes admin
- After that, log in at http://localhost:3000/login

## Features

- ✅ Secure JWT login / register
- ✅ Lead listing with search + filters + pagination
- ✅ Add / edit / delete leads
- ✅ Lead status updates (new → contacted → qualified → converted → lost)
- ✅ Notes & activity log per lead (note, call, email, meeting, follow_up)
- ✅ Dashboard with stats and recent leads
- ✅ Follow-up date tracking
- ✅ Deal value in ZAR

## MongoDB Atlas (Cloud) — Optional

If you don't want to install MongoDB locally:

1. Create a free account at https://mongodb.com/atlas
2. Create a free cluster
3. Get your connection string and put it in `.env` as MONGO_URI
