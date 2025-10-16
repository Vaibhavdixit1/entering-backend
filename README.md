# Entering Project

A full-stack application with separate backend and frontend projects that can be run independently.

## 🎯 About the Developer

This project is created by someone transitioning from frontend development to backend development. This is the first step to backend development with a complete full-stack setup.

## 🏗️ Project Structure

```
entering-backend/
├── backend/          # Backend API server (Node.js/Express)
├── frontend/         # Frontend application (Next.js/React)
└── README.md         # This file
```

## 🚀 Quick Start

### Option 1: Run Backend and Frontend Separately

#### Backend Server
```bash
cd backend
npm install
npm start
```
Backend will run on http://localhost:3000

#### Frontend Application
```bash
cd frontend
npm install
npm run dev
```
Frontend will run on http://localhost:3001

### Option 2: Run in Different Terminals

**Terminal 1 (Backend):**
```bash
cd backend
npm install
npm start
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm install
npm run dev
```

## 📚 Individual Project Documentation

- [Backend README](./backend/README.md) - Backend API server documentation
- [Frontend README](./frontend/README.md) - Frontend application documentation

## 🔧 Development Workflow

1. Start the backend server first (required for frontend API calls)
2. Start the frontend development server
3. Access the application at http://localhost:3001
4. Backend API is available at http://localhost:3000

## 📚 API Endpoints

The backend provides the following endpoints:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Returns a simple "Hello World!" message |
| `/jokes` | GET | Returns a collection of jokes |
| `/quotes` | GET | Returns inspirational quotes |
| `/facts` | GET | Returns interesting facts |
| `/weather` | GET | Returns sample weather data |

## 🛠️ Technologies Used

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework for Node.js
- **dotenv** - Environment variable management

### Frontend
- **Next.js 15** - React framework
- **React 19** - UI library
- **Tailwind CSS** - Styling framework

## 📝 License

ISC License

---

**Happy coding! 🎉**
