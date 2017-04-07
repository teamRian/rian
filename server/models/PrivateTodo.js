import mongoose from 'mongoose';
mongoose.Promise = global.Promise
const Schema = mongoose.Schema;

const PrivateTodo = new Schema({
	creator: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
	is_plan: { type: Boolean, required: true },
	is_done: { type: Boolean, required: true },
	is_removed: { type: Boolean, required: true },
	text: String,
	time_count: { type: Number, required: true },
	created_at: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('Privatetodos', PrivateTodo);
