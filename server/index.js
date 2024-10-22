const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoutes');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(cors({
    origin: "http://localhost:5173",  // Replace with your frontend URL if needed
    credentials: true // Enable credentials for cookie handling
}));
app.use(cookieParser());

// Use Routes
app.use('/auth', userRouter);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.log('Error connecting to MongoDB:', error.message));

// Default route
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Start server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
