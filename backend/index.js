const express = require("express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const app = express();

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Entering Backend API",
      version: "1.0.0",
      description: "A comprehensive API for jokes, quotes, and facts with rate limiting and health monitoring",
      contact: {
        name: "Vaibhav Dixit",
        email: "vaibhav@videosdk.live"
      }
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server"
      }
    ],
    components: {
      schemas: {
        Joke: {
          type: "object",
          properties: {
            jokes: {
              type: "array",
              items: { type: "string" }
            },
            total: { type: "number" },
            returned: { type: "number" }
          }
        },
        Quote: {
          type: "object",
          properties: {
            quotes: {
              type: "array",
              items: { type: "string" }
            }
          }
        },
        Fact: {
          type: "object",
          properties: {
            facts: {
              type: "array",
              items: { type: "string" }
            }
          }
        },
        Health: {
          type: "object",
          properties: {
            status: { type: "string" },
            timestamp: { type: "string" },
            uptime: { type: "number" },
            memory: { type: "object" },
            version: { type: "string" }
          }
        }
      }
    }
  },
  apis: ["./index.js"]
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Simple rate limiting middleware
const rateLimit = (() => {
  const requests = new Map();
  const WINDOW_MS = 60000; // 1 minute
  const MAX_REQUESTS = 100; // 100 requests per minute
  
  return (req, res, next) => {
    const clientId = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    
    if (!requests.has(clientId)) {
      requests.set(clientId, { count: 1, resetTime: now + WINDOW_MS });
      return next();
    }
    
    const clientData = requests.get(clientId);
    
    if (now > clientData.resetTime) {
      clientData.count = 1;
      clientData.resetTime = now + WINDOW_MS;
    } else if (clientData.count >= MAX_REQUESTS) {
      return res.status(429).json({ 
        error: 'Too many requests', 
        retryAfter: Math.ceil((clientData.resetTime - now) / 1000) 
      });
    } else {
      clientData.count++;
    }
    
    res.set('X-RateLimit-Limit', MAX_REQUESTS);
    res.set('X-RateLimit-Remaining', Math.max(0, MAX_REQUESTS - clientData.count));
    res.set('X-RateLimit-Reset', new Date(clientData.resetTime).toISOString());
    
    next();
  };
})();

// Apply rate limiting
app.use(rateLimit);

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Enable CORS for frontend communication
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Parse JSON bodies
app.use(express.json());

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get API welcome message
 *     description: Returns a welcome message with timestamp and version
 *     responses:
 *       200:
 *         description: Welcome message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 timestamp:
 *                   type: string
 *                 version:
 *                   type: string
 */
app.get("/", (req, res) => {
  res.json({ 
    message: "Hello World!",
    timestamp: new Date().toISOString(),
    version: "1.0.0"
  });
});

/**
 * @swagger
 * /jokes:
 *   get:
 *     summary: Get jokes
 *     description: Returns a collection of jokes with optional limit
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 10
 *         description: "Number of jokes to return (default: all)"
 *     responses:
 *       200:
 *         description: Successfully retrieved jokes
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Joke'
 *       500:
 *         description: Server error
 */
app.get("/jokes", (req, res) => {
  try {
    const jokes = [
      "Why don't scientists trust atoms? Because they make up everything!",
      "Why did the scarecrow win an award? He was outstanding in his field!",
      "Why don't eggs tell jokes? They'd crack each other up!",
      "What do you call a fake noodle? An impasta!",
      "Why did the math book look so sad? Because it had too many problems!",
    ];
    
    // Add random selection feature
    const limit = parseInt(req.query.limit) || jokes.length;
    const selectedJokes = jokes.slice(0, Math.min(limit, jokes.length));
    
    res.json({ 
      jokes: selectedJokes,
      total: jokes.length,
      returned: selectedJokes.length
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch jokes" });
  }
});

app.get("/quotes", (req, res) => {
  const quotes = [
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Innovation distinguishes between a leader and a follower. - Steve Jobs",
    "Life is what happens to you while you're busy making other plans. - John Lennon",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    "It is during our darkest moments that we must focus to see the light. - Aristotle",
  ];
  res.json({ quotes: quotes });
});

app.get("/facts", (req, res) => {
  const facts = [
    "A group of flamingos is called a 'flamboyance'.",
    "Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3000 years old and still perfectly good to eat.",
    "A shrimp's heart is in its head.",
    "It's impossible to hum while holding your nose.",
    "The shortest war in history was between Britain and Zanzibar on August 27, 1896. Zanzibar surrendered after 38 minutes.",
  ];
  res.json({ facts: facts });
});

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     description: Returns server health status and system metrics
 *     responses:
 *       200:
 *         description: Server health status
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Health'
 */
// Add health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: "1.0.0"
  });
});

// Add error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Add 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/`);
});
