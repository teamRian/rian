import { Router } from 'express';
import * as PlanController from '../controllers/plan.controller';
const router = new Router();

// Get all Posts
router.route('/').get(PlanController.getPlan);

export default router;
