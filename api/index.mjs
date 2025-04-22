import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

//import models
import user from '../models/userModel.mjs';
import Comments from '../models/commentsModel.mjs';
import Post from '../models/postModel.mjs';


// 💡 Import routes
import userRoutes from './routes/userRoutes.mjs';

const app = express();
const PORT = 3000;
const mongo = mongoose
mongo.connect("mongodb+srv://angelolapagan:54nCq8o4pFTcxIKO@cluster0.qzw9lyx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
app.use(express.json()); // Needed for POST/PUT requests

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
app.get('/', (req, res) => {
  console.log('Request received at /try');
  res.send('hello Jake and Charles');
}); 
// 💡 Use the route
app.use('/api/users', userRoutes); // Now: GET /api/users
// Start server
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
