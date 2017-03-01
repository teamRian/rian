import mongoose from 'mongoose';
mongoose.Promise = global.Promise
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  	created_at: Date,
  	title: String,
  	data: String
});

export default mongoose.model('Note', noteSchema);
