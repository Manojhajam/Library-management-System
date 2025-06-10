import express from "express";
const bookRouter = express.Router();
import { getBooksController, createBooksController, updateBooksController, deleteBooksController } from "../controllers/bookControllers.js";


bookRouter.route('/')
    .get(getBooksController)
    .post(createBooksController)


bookRouter.route('/:id')
    .put(updateBooksController)
    .delete(deleteBooksController)



// bookRouter.get("/", (req, res) => {
//     res.json({
//         success: true,
//         message: "This is root of books, this gives me all books",
//     })
// })

// bookRouter.post("/createBooks", (req, res) => {
//     res.json({
//         success: true,
//         message: "This is create root of books"
//     });
// })


export default bookRouter;
