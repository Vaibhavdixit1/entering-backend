# Backend API Server

This is the backend API server for the entering application.

## Features

- Express.js server
- CORS enabled for frontend communication
- Multiple API endpoints:
  - `/jokes` - Get random jokes
  - `/quotes` - Get inspirational quotes
  - `/facts` - Get interesting facts
  - `/weather` - Get weather information

## Setup and Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

   Or for development:
   ```bash
   npm run dev
   ```

## API Endpoints

- `GET /` - Health check endpoint
- `GET /jokes` - Returns array of jokes
- `GET /quotes` - Returns array of quotes
- `GET /facts` - Returns array of facts
- `GET /weather` - Returns weather information

## Server Configuration

- Default port: 3000
- CORS enabled for all origins
- JSON response format

## Environment Variables

You can set the following environment variables:
- `PORT` - Server port (default: 3000)

## Dependencies

- express: ^5.1.0
- dotenv: ^17.2.3
