import { getMembers } from "../controllers/memberControllers.js"
import express, { Router } from "express"
import { checkAuthorization } from "../middleware/checkAuthorization.js"
import {checkStaffLevelPermissions} from "../middleware/checkPermission.js"

const router = express.Router()

router.route("/").get(checkAuthorization,checkStaffLevelPermissions, getMembers)

export default router