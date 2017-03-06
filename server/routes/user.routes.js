import { Router } from 'express';
import * as UserController from '../controllers/user.controller';
const router = new Router();

// Get all User
router.route('/signUp').post((req,res)=>{
	UserController.userCheck(req,res);
});

router.route('/logIn').post((req,res)=>{
	UserController.userLogIn(req,res);
});

export default router;
