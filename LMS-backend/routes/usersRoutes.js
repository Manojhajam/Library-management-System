import express from "express";
import { registerUser, loginUser, updateUser, getUserController } from "../controllers/userControllers.js";
const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser)

router.route('/getUser').get(getUserController)
router.route('/update/:id').put(updateUser)

export default router;