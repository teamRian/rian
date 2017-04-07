import mongoose from 'mongoose';
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const User = new Schema({
  email: String,
  phone: Number,
  picture: String,
  token: String,
  name: String,
  created_at: String,
  facebook_id: String,
  naver_id: String,
  kakao_id: String,
  google_id: String,
  created_at: { type: 'Date', default: Date.now, required: true },
});
 
export default mongoose.model('Users', User)
