import { getMembers } from "../controllers/memberControllers.js"
import express, { Router } from "express"
import { checkAuthorization } from "../middleware/checkAuthorization.js"
import {checkAdminLevelPermissions, checkStaffLevelPermissions} from "../middleware/checkPermission.js"
import { updateRole } from "../controllers/userControllers.js"

const router = express.Router()

router.route("/").get(checkAuthorization, checkStaffLevelPermissions, getMembers)
router
  .route("/:userId/change-role")
  .patch(checkAuthorization, checkAdminLevelPermissions, updateRole);

export default router