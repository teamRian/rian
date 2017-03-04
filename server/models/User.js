import mongoose from 'mongoose';
const Schema = mongoose.Schema;
mongoose.promise = global.promise

// import Note from './Note';

const UserSchema = new Schema({

	username: { 
		type: String, 
		required: true 
	},	
  
	local : {
		username: String,
		token: String,
	    name: String,
	    email: String,
	    picture: String
	},

	facebook : {
	    id: String,
	    token: String,
	    name: String,
	    email: String,
	    picture: String
 	},

 	projects : [{ type: Schema.Types.ObjectId, ref: 'Project'}],
 	plans : [{ type: Schema.Types.ObjectId, ref: 'Plan'}],
 	mynote : [{ type: Schema.Types.ObjectId, ref: 'Note' }]

 		 
});


 
export default mongoose.model('User', UserSchema)
