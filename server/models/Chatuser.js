import mongoose from 'mongoose';
const Schema = mongoose.Schema;
mongoose.promise = global.promise;


const ChatuserSchema = new Schema({
	name: { type: String, require: true},
	messages: { 
		user: String,
		text: String
	}
})

export default mongoose.model('Chatuser', ChatuserSchema)