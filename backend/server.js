// Import required packages
import express from 'express';
import cors from 'cors';
import dotenv from "dotenv"; 
import { connectDB } from './config/db.js';

// Load environment variables from .env file
dotenv.config();

// Define server port (default: 4000)
const port = process.env.PORT || 4000;

// Initialize express app
const app = express();

// Enable CORS for cross-origin requests
app.use(cors());

// Connect to MongoDB database
connectDB();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Base route (for testing API status)
app.get('/', (req, res) => {
    res.send("API is working");
});

// Start server and listen on defined port
app.listen(port, () => {
    console.log(`✅ Server is running at: http://localhost:${port}`);
});
