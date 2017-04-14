import mongoose from "mongoose";
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const Link = new Schema({
  creator: { type: Schema.Types.ObjectId, ref: "Users" },
  project_id: { type:Schema.Types.ObjectId, ref: "Projects"},
  created_at: { type: "Date", default: Date.now, required: true, expires: 86400 }
});

export default mongoose.model("Links", Link);
