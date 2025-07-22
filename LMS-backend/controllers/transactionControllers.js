import { TransactionModel } from "../models/transactionModel.js";
import { BookModel } from "../models/bookmodels.js";


export const getTransaction = async (req, res) => {
  try {
    const transactions = await TransactionModel.find()
      .populate('issuedBy')
      .populate('issuedTo')       
      .populate("book");

    res.status(200).json({
      success: true,
      data: transactions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const createTransaction = async (req, res) => {
  try {
    const { bookId, issuedTo, estimatedReturnDate } = req.body;
    const requestiongUser = req.user;
    const defaultIssuanceAllowedDays = 14;
    const defaultEstimatedReturnDate = new Date(Date.now() + defaultIssuanceAllowedDays * 24 * 60 * 60 * 1000).toISOString();


    if (!bookId) {
      return res.status(400).json({
        success: false,
        message: "No book issued if no book needed!"
      });
    }

    if (!issuedTo) {
      return res.status(400).json({
        success: false,
        message: "No book issued if no reader exists!"
      });
    }


    const bookExists = await BookModel.findById(bookId);

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
      status: requestiongUser.role === "Member" ? "Pending" : "Approved",
      estimatedReturnDate: estimatedReturnDate || defaultEstimatedReturnDate
    });

    bookExists.availability = false;  //change one variable
    await bookExists.save();

    
     return res.status(201).json({
          success: true,
          data: newTransaction,
      })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const updatetransaction = async (req, res) => {

  try {
    const { transactionId } = req.body;
    if (!transactionId) {
      return res.status(400).json({
        success: false,
        message: "Please mention the issue order!",
      });
    }

    const transaction = await TransactionModel.findById(transactionId);

    if (!transaction) {
      return res.status(400).json({
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

    return res.status(200).json({
      success: true,
      data: updatedTransaction,
      message: "Issue order Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
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
      return res.status(400).json({
        success: false,
        message: "Please mention the issue order!"
      });
    }

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Updated status is required"
      });
    }

    const transaction = await TransactionModel.findById(transactionId);

    if (!transaction) {
      return res.status(400).json({
        success: false,
        message: "Looks like the issue order does not exist!"
      });
    }

    transaction.status = status;

    await transaction.save();

    return res.status(200).json({
      success: true,
      data: transaction,
      message: "Issue order Updated Successfully"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};




export const deleteTransaction = async (req, res) => {
  try {
    const { transactionId } = req.params;

    if (!transactionId) {
      return res.status(400).json({
        success: false,
        message: "Please mention the issue order!"
      });
    }

    const transaction = await TransactionModel.findById(transactionId);

    if (!transaction) {
      return res.status(400).json({
        success: false,
        message: "Looks like the issue order doesnot exist!"
      });
    }

    await TransactionModel.findByIdAndDelete(transactionId);

    return res.status(200).json({
      success: true,
      message: "Issue order deleted successfully!"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


export const returnBook = async (req, res) => {
  try {
    const { transactionId } = req.params;
    // const { returnTo } = req.body;
    const returnTo = req.user._id

    const foundTransaction = await TransactionModel.findById(transactionId).populate('book').populate(issuedto).populate(issuedBy);

    if (!foundTransaction) {
      return res.status(400).json({
        success: false,
        message: "No issue order found!!!"
      })
    }


    foundTransaction.returnDate = new Date(Date.now()).toISOString();

    foundTransaction.returned = true;
    foundTransaction.returnTo = returnTo;

    const issuedBook = await BookModel.findById(foundTransaction.book);

    issuedBook.availability = true;
    
    
    await foundTransaction.save();

    await issuedBook.save();

    res.status(200).json({
      success: true,
      message: "Book returned successfully!!!",
      data: foundTransaction
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}