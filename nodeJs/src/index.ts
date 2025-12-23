import express, { type Request, type Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import database from './config/database.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic Route
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, Welcome to the API!');
});





// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    database();
});
