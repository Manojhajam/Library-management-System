import express from "express"
import bookRouter from './routes/bookRoutes.js'

const app = express();
const PORT = 5000;


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