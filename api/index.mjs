import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

// Use CORS middleware properly
app.use(cors({
  origin: "*", // Allow all origins
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Ensure all responses include CORS headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Handle preflight requests
app.options('*', (req, res) => {
  res.sendStatus(204);
});

// Test route
app.get('/try', (req, res) => {
  console.log('Request received at /try');
  res.send('hello Jake and Charles');
});

// Start server
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
