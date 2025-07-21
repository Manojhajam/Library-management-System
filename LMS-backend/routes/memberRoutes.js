import { getMembers,createMember } from "../controllers/memberControllers.js"
import express, { Router } from "express"

const router = express.Router()

router.route("/").get(getMembers).post(createMember);

export default router