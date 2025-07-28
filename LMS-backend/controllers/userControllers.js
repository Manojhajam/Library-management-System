import { UserModel, validateUserSchema } from "../models/usermodels.js";
import { generateToken } from "../utils/generateToken.js";


export const registerUser = async (req, res) => {
  try {
    const reqBody = req.body;

    const validatedUser = validateUserSchema.validate(reqBody)

    if (validatedUser.error) {
     return res.status(400).json({
        success: false,
        message: validatedUser.error.message,
      })
    }
    const foundUser = await UserModel.find({ email: reqBody.email });

    if (foundUser.length > 0) {
      return res.status(409).json({
        success: false,
        message: `User with email: ${reqBody.email} already exits`
      });
    }

    // const newUserInfo = {
    //   email: reqBody.email,
    //   phoneNumber: reqBody.phoneNumber,
    //   password: reqBody.password,
    //   address: reqBody.address,
    //   name: reqBody.name,
    // }
    const newUser = await UserModel.create(validatedUser.value);

    const userData = {
      name: newUser.name,
      email: newUser.email,
      address: newUser.address,
      phoneNumber: newUser.phoneNumber,
      _id: newUser._id,
      role: newUser.role,
    }
    return res.status(201).json({
      success: true,
      data: userData,
      message: `Dear ${newUser.name} Welcome to Library management System`
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
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
      return res.status(400).json({
        success: false,
        message: "Invalid Credential"
      });
    }

    const isPasswordMatched = await foundUser.isPasswordValid(reqBody.password);

    if (isPasswordMatched) {
      
     const token = await generateToken({ _id: foundUser?._id });

      if (!token) {
       return res.status(400).json({
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

      return res.status(200).json({
        success: true,
        data: userData,
        message: `Welcome back ${foundUser.name}`,
        token: token
      });
    }

    res.status(400).json({
      success: true,
      message: "Invalid Credentials!!!"
    });
  }
  
  catch (error) {
    console.status(500).log(error);
    res.json({
      success: false,
      message: error.message
    });
  }
};


export const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const reqBody = req.body;

    const foundUser = await UserModel.findById(userId);

    if (!foundUser) {
      return res.status(400).json({
        success: false,
        message: `User with ${userId} not found!`
      });
    }

    if (foundUser._id.toString() !== req.user._id.toString() && !["Admin"].includes(req.user.role)) {
      return res.status(401).json({
        success: false,
        message: "You cannot update this user"
      }
  )
}

    const updatedUser = await UserModel.findByIdAndUpdate(userId, reqBody, {
      new: true
    });

    res.status(200).json({
      success: true,
      data: updatedUser,
      message: "User Updated Successfully"
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const deleteUser = async (req, res) => {
  
  
  try {
    
    const { userId } = req.params
  
    const foundUser = await UserModel.findById(userId);
  
      if (!foundUser) {
        return res.status(400).json({
          success: false,
          message: `User with ${userId} not found!`
        });
    }
    
    const deletedUser = await UserModel.findByIdAndDelete(userId)
  
    res.status(200).json(
      {
        success: true,
        data: deletedUser,
        message: `User with ${userId} deleted successfully!!`
      }
    )
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
  
}


export const updatePassword = async (req, res) => {
  try {
    const { userId } = req.params;

    const { newPassword, oldPassword } = req.body;
  
    const foundUser = await UserModel.findById(userId);
  
      if (!foundUser) {
        return res.status(400).json({
          success: false,
          message: `User with ${userId} not found!`
        });
    }
const passwordMatched = await foundUser.isPasswordValid(oldPassword)
    if (!passwordMatched) {
      return res.status(400).json({
        success: false,
        message: "Old Password doesnot matched"
  })
    }
    if (foundUser._id.toString() !== req.user._id.toString() && !["Admin"].includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "You cannot update the password"
      });
    }

    
    foundUser.password = newPassword;

    foundUser.save();

    const userData = {
      name: foundUser.name,
      address: foundUser.address,
      phoneNumber: foundUser.phoneNumber,
      role: foundUser.role,
      email: foundUser.email,
      _id: foundUser._id
    }
    
    res.status(200).json({
      success: true,
      message: "Password Updated Successfully",
      data: userData
    })

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}



export const getProfile = async (req, res) => {
  try {
    const user = req.user.toObject();

    delete user.password;

    res.status(200).json({
      success: true,
      data: user,
    })
  }
  catch (error) {
    res.status(500).json(
      {
        success: false,
        message: error
      }
    )
  }
}


export const updateRole = async (req, res) => {
  try {
    const { userId } = req.params;

    const existingUser = await UserModel.findById(userId);
    if (!existingUser)
    {
      return res.status(404).json({
        success: false,
        message: 'Can`t find user with requested id!'
      })

    }
    if (existingUser.role === 'Admin') {
      return res.status(400).json({
        success: false,
        message: "Can't update role of admin"
      })
    }

     if (existingUser.role === 'Member') {
      existingUser.role = 'Staff'
     } else if (existingUser.role === 'Staff') {
       existingUser.role = 'Member'
    }
    await existingUser.save();

    //task remove password user details from here
    const userWithoutPassword = existingUser.toObject();
    delete userWithoutPassword.password;

    return res.status(201).json({
      success: true,
      data: userWithoutPassword,
    })

  } catch (error) {
    console.log(error);
    
     res.status(500).json({
      success: false,
      message: error.message
    });
  }
}