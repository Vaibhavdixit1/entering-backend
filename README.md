# Entering Backend

A simple Express.js backend API with multiple endpoints for jokes, quotes, facts, and weather data.

## 🎯 About the Developer

This project is created by someone transitioning from frontend development to backend development. This is the first step to backend 

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <https://github.com/Vaibhavdixit1/entering-backend>
cd entering-backend
```

2. Install dependencies
```bash
npm install
```

3. Start the server
```bash
npm start
```

The server will start on `http://localhost:3000` (or the port specified in your environment variables).

## 📚 API Endpoints

### Base URL
```
http://localhost:3000
```

### Available Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Returns a simple "Hello World!" message |
| `/jokes` | GET | Returns a collection of jokes |
| `/quotes` | GET | Returns inspirational quotes |
| `/facts` | GET | Returns interesting facts |
| `/weather` | GET | Returns sample weather data |

## 🛠️ Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework for Node.js
- **dotenv** - Environment variable management

## 📁 Project Structure

```
entering-backend/
├── index.js          # Main server file
├── package.json      # Project dependencies and scripts
├── package-lock.json # Dependency lock file
└── README.md         # This file
```

## 🔧 Development

### Available Scripts

- `npm start` - Start the server
- `node index.js` - Alternative way to start the server

### Environment Variables

You can set the following environment variables:

- `PORT` - Server port (default: 3000)

Example:
```bash
PORT=8080 npm start
```

## 📝 License

ISC License

---

**Happy coding! 🎉**
