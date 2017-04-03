import mongoose from 'mongoose';
mongoose.Promise = global.Promise
const Schema = mongoose.Schema;

const planSchema = new Schema({
	_userId: { type: Schema.Types.ObjectId, ref: 'User', required: true},
	username: String,
	day: Number,
	month: Number,
	year: Number,		
	repeat: Object,
	type: String,
	title: String,
	description: String,
	startingTime: Number,
	endingTime: Number, 
	// durationLength: Number, // how long
	color: String, // color of box
	created_at: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('Plan', planSchema);
