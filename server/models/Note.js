import mongoose from 'mongoose';
mongoose.Promise = global.Promise
const Schema = mongoose.Schema;

const noteSchema = new Schema({
	_userId: { type: Schema.Types.ObjectId, ref: 'User', required: true},
	username: String,
  	create_at: Date,
  	finalmodified_at: Date,
	type: { type: 'String', required: true},
	title: { type: 'String', required: true },
	tag: Object,
	content: String,
});

export default mongoose.model('Note', noteSchema);
