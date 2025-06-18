import { UserModel } from "../models/usermodels.js";
import { generateToken } from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
  try {
    const reqBody = req.body;

    const foundUser = await UserModel.find({ email: reqBody.email });

    if (foundUser.length > 0) {
      return res.json({
        success: false,
        message: `User with email: ${reqBody.email} already exits`
      });
    }

    const newUser = await UserModel.create(reqBody);

    return res.json({
      success: true,
      data: newUser,
      message: `Dear ${newUser.name} Welcome to Library management System`
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const reqBody = req.body;
    const foundUser = await UserModel.findOne({ email: reqBody.email });
    console.log(foundUser);

    if (!foundUser) {
      return res.json({
        success: false,
        message: "Invalid Credential"
      });
    }

    const isPasswordMatched = await foundUser.isPasswordValid(reqBody.password);

    if (isPasswordMatched) {
      
     const token = await generateToken({ _id: foundUser?._id });

      if (!token) {
       return res.json({
          success: false,
          message:"Something went wrong!!"
        })
      }

      const userData = {
        name: foundUser.name,
        email: foundUser.email,
        address: foundUser.address,
        phoneNumber: foundUser.phoneNumber
      };

      return res.json({
        success: true,
        data: userData,
        message: `Welcome back ${foundUser.name}`,
        token: token
      });
    }

    res.json({
      success: true,
      message: "Invalid Credentials!!!"
    });
  }
  
  catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message
    });
  }
};

export const getUserController = async (req, res) => {
  try {
    const User = await UserModel.find();
    res.json({
      success: true,
      data: User
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id: userId } = req.params;

    const reqBody = req.body;

    const foundUser = await UserModel.findById(userId);
    console.log(foundUser);
    if (foundUser) {
      const updatedUser = await UserModel.findByIdAndUpdate(userId, reqBody, {
        new: true
      });

      return res.json({
        success: true,
        data: updatedUser
      });
    }
    res.json({
      success: false,
      message: `User with ${userId} not found!`
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message
    });
  }
};
