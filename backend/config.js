// Configuration file for the backend
module.exports = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  apiVersion: '1.0.0',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3001',
  logLevel: process.env.LOG_LEVEL || 'info',
  
  // API endpoints configuration
  endpoints: {
    jokes: {
      defaultLimit: 5,
      maxLimit: 10
    },
    quotes: {
      defaultLimit: 5,
      maxLimit: 10
    },
    facts: {
      defaultLimit: 5,
      maxLimit: 10
    }
  }
};
