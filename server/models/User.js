import mongoose from 'mongoose';
import Plan from './plan.js'
const PlanSchema = plan
mongoose.promise = global.promise
const Schema = mongoose.Schema;

const PlanSchema = new Schema({
  	day: Number,
  	year: Number,
  	month: Number,
  	plans: 
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

export default mongoose.model('Plan', PlanSchema);
