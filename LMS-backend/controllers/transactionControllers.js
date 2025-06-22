import { transactionModel } from "../models/transactionModel.js";

export const getTransaction = async (req, res) => {
  try {
    const transaction = await transactionModel.find();

    res.json({
      success: true,
      data: transaction
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
    const reqBody = req.body;

      const transaction =await transactionModel.create(reqBody);
      res.json({
          success: true,
          data: transaction
      })

  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message
    });
  }
};
