import express from 'express';
import * as ticketController from '../controllers/ticketController.js';
import { isAuthenticated } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(isAuthenticated);

router.get('/', ticketController.getTickets);
router.post('/', ticketController.createTicket);
router.get('/:id', ticketController.getTicketDetails);
router.post('/:id/reply', ticketController.replyTicket);

export default router;
