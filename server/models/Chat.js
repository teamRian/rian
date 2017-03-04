import mongoose from 'mongoose';
const Schema = mongoose.Schema;
mongoose.promise = global.promise;


const ChatlogSchema = new Schema({
	username: { type: String, required: true },
			text: { type: String, required: true },
 date_added: { type: Date, default: Date.now, required: true }
})

export default mongoose.model('Chatlog', ChatlogSchema)