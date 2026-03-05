import express from 'express';
import * as userController from '../controllers/userController.js';
import { isAuthenticated } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', isAuthenticated, userController.getDashboard);
router.get('/profile', isAuthenticated, userController.getProfile);
router.post('/profile', isAuthenticated, userController.updateProfile);

export default router;
