import mongoose from 'mongoose';
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise


// // 다른 모델의 스키마 가져오는방법 ! 아래와 같습니다
// import Plan from './plan.js'
// import Note from './Note.js'
// import Chat from './Chat.js'


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

 	mynote : [{ type: Schema.Types.ObjectId, ref: 'Note' }],

 	chatlogs: [{ type: Schema.Types.ObjectId, ref: 'Chat' }]


 		 
});


 
export default mongoose.model('User', UserSchema)
