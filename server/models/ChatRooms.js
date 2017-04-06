import mongoose from 'mongoose';
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise

const ChatRoomSchema = new Schema({

	project_id: [{ type: Schema.Types.ObjectId, ref: "Projects", required: true}],
	tag: Array
	
});
 
export default mongoose.model('Chatrooms', ChatRoomSchema)


