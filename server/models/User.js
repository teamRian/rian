import mongoose from 'mongoose';
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise

const UserSchema = new Schema({

    email: String,
    phone: Number,
    profile: Buffer,
	facebook : {
	    _id: String,
	    token: String,
	    name: String,
	    email: String,
	    picture: String
 	},

 	projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
 	plans: [{ type: Schema.Types.ObjectId, ref: 'Plan' }],
 	notification: { type: Schema.Types.ObjectId, ref: 'Notifications' }

});


 
export default mongoose.model('User', UserSchema)
