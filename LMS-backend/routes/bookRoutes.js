import express from "express";
const bookRouter = express.Router();

import {
  getBooksController,
  createBooksController,
  updateBooksController,
  deleteBooksController
} from "../controllers/bookControllers.js";
import { checkAuthorization } from "../middleware/checkAuthorization.js";
// import bookControllers from "../controllers/bookControllers.js";  //default import for get use .get(bookControllers.getBooksController)
import { checkStaffLevelPermissions } from "../middleware/checkPermission.js";

bookRouter
  .route("/")
  .get(getBooksController)
  .post(checkAuthorization, checkStaffLevelPermissions, createBooksController);

bookRouter
  .route("/:id")
  .put(checkAuthorization, updateBooksController)
  .delete(checkAuthorization, deleteBooksController);

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
