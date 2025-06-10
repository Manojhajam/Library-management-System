import { BookModel } from "../models/bookmodels.js";

//Named export
export const getBooksController = async (req, res) => {
  try {
    const books = await BookModel.find();
    res.json({
      success: true,
      data: books
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: true,
      message: error.message
    });
  }
};

export const createBooksController = async (req, res) => {
    const reqBody = req.body;

    const book =await BookModel.create(reqBody);
    try {
    
        res.json({
            success: true,
            data: book
        });
    }

    catch (error) {
        console.log(error);
        res.json({
            success: true,
            message: error.message
        });
    }
}

export const updateBooksController = (req, res) => {
  res.json({
    success: true,
    message: "This is update routes"
  });
};

export const deleteBooksController = (req, res) => {
  res.json({
    success: true,
    message: "This is delete route"
  });
};
