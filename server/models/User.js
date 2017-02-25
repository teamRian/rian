import mongoose from 'mongoose';
const Schema = mongoose.Schema;
mongoose.promise = global.promise

// 다른 모델의 스키마 가져오는방법 ! 아래와 같습니다
import Plan from './plan.js'
const PlanSchema = mongoose.model('Plan').schema;

const UserSchema = new Schema({
	local : {
		username: String,
		token: String,
	    name: String,
	    email: String,
	    picture: String
	}

	facebook : {
	    id: String,
	    token: String,
	    name: String,
	    email: String,
	    picture: String
 	},

 	plans : [PlanSchema]

});

export default mongoose.model('Plan', PlanSchema);
