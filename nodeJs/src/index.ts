import express, { type Request, type Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic Route
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, Welcome to the API!');
});

// MongoDB Connection (Placeholder)
const MONGODB_URI = 'mongodb://localhost:27017/my_database'; // Replace with your actual connection string

mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
