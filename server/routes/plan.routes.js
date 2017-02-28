import { Router } from 'express';
import * as PlanController from '../controllers/plan.controller';
const router = new Router();

// Get all Plan
router.route('/getPlans').post((req,res)=>{
	PlanController.calendarRequest(req,res);
});

router.route('/newPlan').post((req,res)=>{
	PlanController.calendarPost(req,res);
})

export default router;
