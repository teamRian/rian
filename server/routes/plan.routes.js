import { Router } from 'express';
import * as PlanController from '../controllers/plan.controller';
const router = new Router();

// Get all Posts
router.route('/').get((req,res)=>{
	console.log('inside router route get: ');
	PlanController.calendarRequest(req,res);
});

router.route('/').post((req,res)=>{
	console.log('inside plan router post: ', req.body);
	PlanController.calendarPost(req,res);
})

export default router;
