import express from 'express'
import { getDashboardData } from '../controllers/dashboardControllers.js';

const router = express.Router();

router.route('/').get(getDashboardData)

export default router;