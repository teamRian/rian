import { Router } from 'express';
import * as ProjectController from '../controllers/Project.ctrl';
const router = new Router();

// Get all Project
router.route('/getProjects').get((req,res)=>{
	ProjectController.projectGet(req,res);
});

router.route('/newProject').post((req,res)=>{
	ProjectController.projectPost(req,res);
})

router.route('/deleteProject').delete((req,res)=>{
	ProjectController.projectDelete(req,res);
})
export default router;
