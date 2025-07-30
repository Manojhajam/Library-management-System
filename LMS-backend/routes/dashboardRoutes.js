import express from 'express'
import { getDashboardData } from '../controllers/dashboardControllers.js';
import { checkAuthorization, } from '../middleware/checkAuthorization.js'
import { checkStaffLevelPermissions } from '../middleware/checkPermission.js';

const router = express.Router();

router.route('/').get(checkAuthorization,checkStaffLevelPermissions, getDashboardData)

export default router;