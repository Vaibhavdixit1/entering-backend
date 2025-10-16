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

## 🧪 Testing

### Backend API Tests
```bash
cd backend
npm test
```

### Manual Testing
- **API Documentation**: http://localhost:3000/api-docs
- **Health Check**: http://localhost:3000/health
- **Rate Limiting**: Test with multiple rapid requests

## 📚 API Endpoints

The backend provides the following endpoints:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Returns API welcome message with version |
| `/jokes` | GET | Returns a collection of jokes (supports `?limit=N`) |
| `/quotes` | GET | Returns inspirational quotes |
| `/facts` | GET | Returns interesting facts |
| `/health` | GET | Returns server health and system metrics |
| `/api-docs` | GET | Interactive API documentation (Swagger UI) |

### 🔧 API Features
- **Rate Limiting**: 100 requests per minute per IP
- **Error Handling**: Comprehensive error responses
- **Health Monitoring**: System metrics and uptime tracking
- **API Documentation**: Interactive Swagger UI
- **Request Logging**: Detailed request/response logging

## 🛠️ Technologies Used

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework for Node.js
- **Swagger/OpenAPI** - API documentation
- **Custom Rate Limiting** - Request throttling
- **Health Monitoring** - System metrics

### Frontend
- **Next.js 15** - React framework with Turbopack
- **React 19** - UI library
- **Tailwind CSS** - Styling framework
- **Error Boundaries** - Robust error handling
- **Request Timeouts** - Network resilience

### Testing & Development
- **Custom Test Suite** - API endpoint testing
- **Health Checks** - Server monitoring
- **API Documentation** - Swagger/OpenAPI integration

## 📝 License

ISC License

---

**Happy coding! 🎉**
