import mongoose from "mongoose";
import Joi from "joi";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  isbn: {
    type: String,
    required: true
  },
  publications: {
    type: Date,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  noOfPages: Number,
  availability: {
    type: Boolean,
    required : true
  }
});

export const validatebookSchema = Joi.object({
  title: Joi.string().min(3).max(100).required().messages({
    "string.empty": "Title should not be empty",
    "string.min": "Title should be Longer",
    "string.max": "Title should be less than 100 characters"
  }),
  author: Joi.string().required().messages({
    "string.empty": "Author should not be empty",
    "string.min": "Author name should be Longer",
    "string.max": "Author should be less than 100 characters"
  }),
  isbn: Joi.string().required().messages({
    "string.empty": "isbn is required"
  }),
  publications: Joi.date().required().messages({
    "string.empty": "Publications is required"
  }),
  genre: Joi.string().optional(),
  noOfPages: Joi.number().optional(),
    // .messages({"any.required": "Page no should require" }),
  availability: Joi.boolean().required()
});

export const BookModel = mongoose.model("books", bookSchema);
