import jwt from 'jsonwebtoken';
import { UserModel } from '../models/usermodels.js';

export const jwtsecretKey = 'dkjjbhbekusbeliw';


export const generateToken = async (user) => {
    try {
        const token = jwt.sign(user, jwtsecretKey)
        return token;
    }
    catch (error) {
        console.log(error)
        return;
    }

};

export const decodeJWT = async (token) => {
    try {
        const decoded = jwt.verify(token, jwtsecretKey)

        if (!decoded || !decoded._id) {
            console.log('Invalid Token Detected')
            return;
        }
        
        const userId = decoded._id;

        const foundUser = await UserModel.findById(userId)
        console.log('decoded',decoded, foundUser)
        return foundUser
    } catch (error) {
        console.log(error);
    }
}