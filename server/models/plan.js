import mongoose from 'mongoose';
mongoose.promise = global.promise
const Schema = mongoose.Schema;

const planSchema = new Schema({
	_userId: { type: Schema.Types.ObjectId, ref: 'User', required: true},
	username: String,
  	day: Number,
  	year: Number,
  	month: Number,
	type: { type: 'String', required: true},
	title: { type: 'String', required: true },
	content: String,
	startTime: String,
	endTime: String,
	dateAdded: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('Plan', planSchema);
