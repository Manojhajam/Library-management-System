import express from "express"

import bookRouter from './routes/bookRoutes.js'
import authRoutes from "./routes/usersRoutes.js";
import transactioRoutes from "./routes/transactionRoutes.js"

import mongoose from "mongoose";
import { connectToDB } from './config/db.js'
import dotenv from "dotenv"


const app = express();

dotenv.config();  //read the .env file

const mongoURI = process.env.MONGO_URI;

const PORT = 5000;


connectToDB();

app.use(express.json());

app.get("/books", (req, res) => {
    res.json({
        success: true,
        message: "This is test route"
    })
});



app.use('/api/books', bookRouter);

app.use('/api/auth', authRoutes)

app.use('/api/transaction', transactioRoutes);

app.listen(PORT, () => {
    const f14daysfromNow = Date.now() + 15 * 24 * 60 * 60 * 1000;
    console.log(
        `Time: ${new Date(f14daysfromNow).toTimeString()}\n` +
        `Date: ${new Date(f14daysfromNow).toDateString()}\n` +
        `ISO: ${new Date(f14daysfromNow).toISOString()}`
    )
    console.log(`Server is running on PORT ${PORT}`);
})