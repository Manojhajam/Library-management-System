import express from "express"
import bookRouter from './routes/bookRoutes.js'
import mongoose from "mongoose";
import {connectToDB} from './config/db.js'

import authRoutes from './routes/usersRoutes.js'
const app = express();
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

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})