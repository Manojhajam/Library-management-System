import express from "express";
const bookRouter = express.Router();

bookRouter.get("/", (req, res) => {
    res.json({
        success: true,
        message: "This is root of books, this gives me all books",
    })
})

bookRouter.post("/createBooks", (req, res) => {
    res.json({
        success: true,
        message: "This is create root of books"
    });
})


export default bookRouter;
