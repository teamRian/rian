import { Router } from 'express';
import * as UserController from '../controllers/User.ctrl';
const router = new Router();

// Get all User
router.route('/signUp').post((req,res)=>{
	UserController.userCheck(req,res);
});

router.route('/logIn').post((req,res)=>{
	if(!req.body.form){
		/*----------  IF ITS SOCIAL LOGIN  ----------*/
		console.log("User Social Login");
		UserController.userFacebookLogIn(req.body,res);
	} else {
		/*----------  IF ITS EMAIL LOGIN  ----------*/
		console.log("User Email Login");
		UserController.userLogIn(req.body,res);
	}
});

export default router;
