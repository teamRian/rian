import mongoose from 'mongoose';
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise

const ProjectSchema = new Schema({

	name: String,
	creator_id : { type: Schema.Types.ObjectId, ref: 'User'},
	member: [{ type: Schema.Types.ObjectId, ref: "User"}],
	leader: { type: Schema.Types.ObjectId, ref: "User"}, 
	chat: { type: Schema.Types.ObjectId, ref: "Chat" },
	
});





 
export default mongoose.model('Projects', ProjectSchema)


