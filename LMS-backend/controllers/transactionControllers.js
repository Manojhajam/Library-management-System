import { TransactionModel } from "../models/transactionModel.js";
import { BookModel } from "../models/bookmodels.js";

export const getTransaction = async (req, res) => {
  try {
    const transactions = await TransactionModel.find();

    res.json({
      success: true,
      data: transactions
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message
    });
  }
};

export const createTransaction = async (req, res) => {
  try {
    const { bookId, issuedTo } = req.body;
    const requestiongUser = req.user;

    if (!bookId) {
      return res.json({
        success: false,
        message: "No book issued if no book needed!"
      });
    }

    if (!issuedTo) {
      return res.json({
        success: false,
        message: "No book issued if no reader exists!"
      });
    }

    const bookExists = BookModel.findById(bookId);

    if (!bookExists || !bookExists.availability) {
      return res.json({
        success: false,
        message: "Requested Book is not available at the moment!"
      });
    }

    const newTransaction = await TransactionModel.create({
      issuedBy: requestiongUser._id,
      issuedTo,
      book: bookId,
      status: requestiongUser.role === "Member" ? "Pending" : "Approved"
    });
    
     return res.json({
          success: true,
          data: newTransaction,
      })

  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message
    });
  }
};

export const updatetransaction = async (req, res) => {

  try {
    const { transactionId } = req.body;
    if (!transactionId) {
      return res.json({
        success: false,
        message: "Please mention the issue order!",
      });
    }

    const transaction = await TransactionModel.findById(transactionId);

    if (!transaction) {
      return res.json({
        success: false,
        message: "Looks like the issue order doesnot exist!",
      });
    }

    const updatedTransaction = await TransactionModel.findByIdAndUpdate(
      transactionId,
      req.body,
      {
        new: true,
      }
    );

    return res.json({
      success: true,
      data: updatedTransaction,
      message: "Issue order Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
}


export const updateTransactionStatus = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const { status } = req.body;

    if (!transactionId) {
      return res.json({
        success: false,
        message: "Please mention the issue order!"
      });
    }

    if (!status) {
      return res.json({
        success: false,
        message: "Updated status is required"
      });
    }

    const transaction = await TransactionModel.findById(transactionId);

    if (!transaction) {
      return res.json({
        success: false,
        message: "Looks like the issue order doesnot exist!"
      });
    }

    transaction.status = status;

    await transaction.save();

    return res.json({
      success: true,
      data: transaction,
      message: "Issue order Updated Successfully"
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message
    });
  }
};




export const deleteTransaction = async (req, res) => {
  try {
    const { transactionId } = req.params;

    if (!transactionId) {
      return res.json({
        success: false,
        message: "Please mention the issue order!"
      });
    }

    const transaction = await TransactionModel.findById(transactionId);

    if (!transaction) {
      return res.json({
        success: false,
        message: "Looks like the issue order doesnot exist!"
      });
    }

    await TransactionModel.findByIdAndDelete(transactionId);

    return res.json({
      success: true,
      message: "Issue order deleted successfully!"
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message
    });
  }
};