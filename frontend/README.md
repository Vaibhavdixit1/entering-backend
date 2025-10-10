# Frontend Application

This is the frontend Next.js application for the entering project.

## Features

- Next.js 15 with React 19
- Tailwind CSS for styling
- API integration with backend
- Modern React features

## Setup and Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3001](http://localhost:3001) in your browser

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## API Integration

The frontend connects to the backend API server running on `http://localhost:3000`. Make sure the backend server is running before starting the frontend.

## Project Structure

- `src/app/` - Next.js app directory
- `src/services/` - API service functions
- `public/` - Static assets

## Dependencies

### Main Dependencies
- react: 19.1.0
- react-dom: 19.1.0
- next: 15.5.4

### Development Dependencies
- @tailwindcss/postcss: ^4
- tailwindcss: ^4
- eslint: ^9
- eslint-config-next: 15.5.4

## Environment

- Node.js >= 18.0.0 required
- Next.js 15 with App Router
- Tailwind CSS for styling