import mongoose from 'mongoose';
mongoose.Promise = global.Promise
const Schema = mongoose.Schema;

const PrivatePlan = new Schema({
	creator: { type: Schema.Types.ObjectId, ref: 'Users', required: true},
	year: Number,		
	month: Number,
	day: Number,
	type: String,
	repeat: Object,
	title: String,
	desc: String,
	start_Time: Number,
	end_Time: Number, 
	color: String,
	created_at: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('Privateplans', PrivatePlan);
