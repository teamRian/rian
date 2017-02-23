import mongoose from 'mongoose';
mongoose.promise = global.promise
const Schema = mongoose.Schema;

const planSchema = new Schema({
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

// const monthSchema = new Schema({
// 	month: Number,
// 	days: [daySchema]
// })
// const yearSchema = new Schema({
// 	year: Number,
// 	months: [monthSchema]
// })
// const planSchema = new Schema({
// 	years : [yearSchema]
// })

export default mongoose.model('Plan', planSchema);
