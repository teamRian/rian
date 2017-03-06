import mongoose from 'mongoose';
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise

const UserSchema = new Schema({

	username: {type: String},	
  
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
 	mynote : [{ type: Schema.Types.ObjectId, ref: 'Note' }],
 	chatlogs: [{ type: Schema.Types.ObjectId, ref: 'Chat' }]

});


 
export default mongoose.model('User', UserSchema)
