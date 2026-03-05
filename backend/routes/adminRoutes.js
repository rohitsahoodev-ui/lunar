import express from 'express';
import * as adminController from '../controllers/adminController.js';
import { isAuthenticated } from '../middleware/authMiddleware.js';
import { isAdmin } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.use(isAuthenticated, isAdmin);

router.get('/', adminController.getAdminDashboard);
router.get('/users', adminController.getAdminUsers);
router.get('/plans', adminController.getAdminPlans);
router.get('/nodes', adminController.getAdminNodes);

export default router;
