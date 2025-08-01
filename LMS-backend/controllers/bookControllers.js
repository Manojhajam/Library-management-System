import { BookModel } from "../models/bookmodels.js";
import { decodeJWT } from "../utils/generateToken.js";

//Named export
export const getBooksController = async (req, res) => {
  try {
    const user = req.user;

    const books = await BookModel.find();
    res.status(200).json({
      success: true,
      data: books,

      userInfo: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createBooksController = async (req, res) => {
  try {
    const reqBody = req.body;
    const book = await BookModel.create(reqBody);
    res.status(201).json({
      success: true,
      data: book,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateBooksController = async (req, res) => {
  try {
    const { id: bookId } = req.params; // const reqPostId = reqParams.bookId;

    // const { title, author, isbn, publications, genre, noOfPages, availability } = req.body;
    const reqBody = req.body;

    const foundBook = await BookModel.findById(bookId);

    if (foundBook) {
      const UpdatedBook = await BookModel.findByIdAndUpdate(
        bookId,
        reqBody,
        // { title,author,isbn,publications,genre, noOfPages,availability },
        {
          new: true,
        }
      );

      return res.status(200).json({
        success: true,
        data: UpdatedBook,
      });
    }

    res.status(400).json({
      success: false,
      message: `Book with id ${bookId} not found`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteBooksController = async (req, res) => {
  try {
    const { id: bookId } = req.params;

    const foundBook = await BookModel.findById(bookId);

    if (foundBook) {
      const deleteBook = await BookModel.findByIdAndDelete(bookId);
      console.log(deleteBook);

      return res.status(200).json({
        success: true,
        message: `${foundBook.title} has deleted`,
      });
    }

    res.status(400).json({
      success: false,
      message: `Book with id: ${bookId} not found!`,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// export default { getBooksController, createBooksController, updateBooksController, deleteBooksController };   //default export
