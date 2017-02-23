import mongoose from 'mongoose';
mongoose.promise = global.promise
const Schema = mongoose.Schema;

const daySchema = new Schema({
  	day: Number,
	type: { type: 'String', required: true},
	title: { type: 'String', required: true },
	content: { type: 'String', required: true },
	startTime: { type: 'String', required: true},
	endTime: { type: 'String', required: true},
	dateAdded: { type: 'Date', default: Date.now, required: true },
});

const monthSchema = new Schema({
	month: Number,
	days: [daySchema]
})
const yearSchema = new Schema({
	year: Number,
	months: [monthSchema]
})
const planSchema = new Schema({
	years : [yearSchema]
})

export default mongoose.model('Plan', planSchema);
