import mongoose from 'mongoose';
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const User = new Schema({
  email: String,
  email_verified: { type: 'Boolean', default: false },
  phone: Number,
  picture: String,
  token: String,
  name: String,
  created_at: String,
  facebook_id: String,
  naver_id: String,
  kakao_id: String,
  google_id: String,
  projects: [{ type: Schema.Types.ObjectId, ref: "Projects" }],
  created_at: { type: 'Date', default: Date.now, required: true },
  last_login: { type: 'Date', default: null }
});
 
export default mongoose.model('Users', User)
