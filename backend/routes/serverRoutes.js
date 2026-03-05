import express from 'express';
import * as serverController from '../controllers/serverController.js';
import { isAuthenticated } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(isAuthenticated);

router.get('/:id', serverController.getServiceDetails);
router.post('/:id/control', serverController.controlServer);

export default router;
