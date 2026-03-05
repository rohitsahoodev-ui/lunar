import express from 'express';
import * as paymentController from '../controllers/paymentController.js';
import { isAuthenticated } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/stripe/:invoiceId', isAuthenticated, paymentController.createStripeSession);
router.get('/success', paymentController.handlePaymentSuccess);

export default router;
