import mongoose from 'mongoose';
mongoose.Promise = global.Promise
const Schema = mongoose.Schema;

const ProjectTodo = new Schema({
	creator: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
	project_id: { type: Schema.Types.ObjectId, ref: 'Projects', required: true },
	is_plan: { type: Boolean, required: true },
	is_done: { type: Boolean, required: true },
	is_removed: { type: Boolean, required: true },
	text: String,
	assigned: { type: Schema.Types.Mixed },
	time_count: { type: Number, required: true },
	link: String,
	limited_date: String,
	created_at: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('Projecttodos', ProjectTodo);
