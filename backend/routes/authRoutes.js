import express from 'express';
import * as authController from '../controllers/authController.js';
import { isGuest, isAuthenticated } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/login', isGuest, (req, res) => res.render('auth/login', { title: 'Login' }));
router.post('/login', isGuest, authController.login);

router.get('/register', isGuest, (req, res) => res.render('auth/register', { title: 'Register' }));
router.post('/register', isGuest, authController.register);

router.get('/logout', isAuthenticated, authController.logout);

export default router;
