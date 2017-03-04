import User from '../models/User';
import Chat from '../models/Chat';

export function chatLogPost(req, res){
	var chatLog = new Chat(req.body.logs);

	chatLog.save()
				.then(logs => {
						res.json(logs);
				})
				.catch(err => console.error(err))
}

export function chatLogRequest(req, res){
// 	console.log('THIOS IS CHAT REQUESGT!!!!!!', req)
}
