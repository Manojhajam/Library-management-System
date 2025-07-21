import { UserModel } from '../models/usermodels.js'
import { MemberModel } from "../models/membermodel.js";



export const getMembers = async (req, res) => {
    try {
        const members = await UserModel.find({role: 'Member'})

        res.status(200).json({
            success: true,
            data: members
        })

    } catch (error) {
        console.log(error);
       res.status(500).json({
      success: true,
      message: error.message
    });
    }
}

export const createMember = async (req, res) => {
    const reqBody = req.body;

    const member = await MemberModel.create(reqBody);
    try {
        res.status(201).json({
            success: true,
            data: member
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: true, message: error.message });
    }
}
