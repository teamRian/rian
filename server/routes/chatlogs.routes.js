import { Router } from 'express';
import * as ChatlogsController from '../controllers/chat.controller';

const router = new Router();

router.route('/postChat').post((req, res) => {
		ChatlogsController.chatLogPost(req, res);
});

router.route('/getChat').get((req, res) => {
		ChatlogsController.chatLogRequest(req, res);
})


export default router;