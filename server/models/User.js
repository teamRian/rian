import mongoose from 'mongoose';
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise

// 다른 모델의 스키마 가져오는방법 ! 아래와 같습니다
// import Plan from './plan.js'
// const PlanSchema = mongoose.model('Plan').schema;

const UserSchema = new Schema({
	username: { type: String, required: true },

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

 	plans : [{ type: Schema.Types.ObjectId, ref: 'Plan'}]
 	// Populate 하는 방법

});

export default mongoose.model('User', UserSchema);
