import mongoose from 'mongoose';
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise

const MessageSchema = new Schema({

	chatroom_id : { type: Schema.Types.ObjectId, ref: 'Chatrooms', required: true},
	user_id: { type: Schema.Types.ObjectId, ref: 'Users', required: true},
	text: { type: String, required: true},
	read: Array,
	timestamp: { type: Date, default: Date.now, required: true},
	
});

 
export default mongoose.model('Messages', MessageSchema)


