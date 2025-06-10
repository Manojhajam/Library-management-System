import express from "express"
import bookRouter from './routes/bookRoutes.js'
import mongoose from "mongoose";
import {connectToDB} from './config/db.js'

const app = express();
const PORT = 5000;


connectToDB();

app.use(express.json());
app.get("/api/books", (req, res) => {
    res.json({
        success: true,
        message: "This is test route"
    })
});



app.use('/books', bookRouter);

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})