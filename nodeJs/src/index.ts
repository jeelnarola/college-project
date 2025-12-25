import express, { type Request, type Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import database from './config/database.js';
import router from './routes/index.routes.js';
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


app.use("/v1", router)


// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    database();
});
