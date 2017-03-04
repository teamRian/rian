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
	Chat.find().sort('date_added')
	.exec((err, chatlogs) => {
			if(err) {
					res.status(500).send(err);
			}
			res.json({chatlogs});
	})
}
