import { UserModel } from '../models/usermodels.js'



export const getMembers = async (req, res) => {
    try {

       const requestingUser = req.user;

    if (requestingUser.role === "Admin") {
      const allUsers = await UserModel.find();

      return res.status(200).json({
        success: true,
        data: allUsers,
      });
    }
    const members = await UserModel.find({ role: "Member" });

    return res.status(200).json({
      success: true,
      data: members,
    });

    } catch (error) {
        console.log(error);
       res.status(500).json({
      success: true,
      message: error.message
    });
    }
}


