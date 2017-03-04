import mongoose from 'mongoose';
const Schema = mongoose.Schema;
mongoose.promise = global.promise

const ProjectSchema = new Schema({
	projectName: { type: String, required: true },
 	users : [{ type: Schema.Types.ObjectId, ref: 'User'}],
	_creatorId : { type: Schema.Types.ObjectId, ref: 'User'},
	_creatorUsername : { type:String, require:true },
	dateAdded: { type: 'Date', default: Date.now, required: true }
});


 
export default mongoose.model('Project', ProjectSchema)
