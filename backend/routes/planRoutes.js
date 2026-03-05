import express from 'express';
import * as planController from '../controllers/planController.js';

const router = express.Router();

router.get('/', planController.getPlans);
router.get('/:id', planController.getPlanDetails);

export default router;
