// Import required packages
import express from 'express';
import cors from 'cors';
import dotenv from "dotenv"; 
import { connectDB } from './config/db.js';
import cookieParser from 'cookie-parser';
import path from 'path'
import resumeRouter from './routes/resumeRoutes.js';
import userRouter from './routes/userRoutes.js';

import { fileURLToPath } from 'url';
const __filname = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filname);

// Load environment variables from .env file
dotenv.config();

// Define server port (default: 4000)
const port = process.env.PORT || 4000;

// Initialize express app
const app = express();
app.use(cookieParser())


// Enable CORS for cross-origin requests
app.use(cors());

// Connect to MongoDB database
connectDB();

// Middleware to parse incoming JSON requests
app.use(express.json());


app.use('/api/auth', userRouter)
app.use('/api/resume', resumeRouter)



// Serve static files from the "uploads" folder
// Example: http://localhost:4000/uploads/image.png → serves /uploads/image.png
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
    // Add CORS headers so frontend (http://localhost:5173) can access images
    setHeaders: (res, _path) => {
      res.set("Access-Control-Allow-Origin", "http://localhost:5173");
    },
  })
);



// Base route (for testing API status)
app.get('/', (req, res) => {
    res.send("API is working");
});

// Start server and listen on defined port
app.listen(port, () => {
    console.log(`✅ Server is running at: http://localhost:${port}`);
});
