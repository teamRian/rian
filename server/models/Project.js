import mongoose from "mongoose";
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const Project = new Schema({
  name: { type: String, required: true },
  creator: { type: Schema.Types.ObjectId, ref: "Users" },
  member: [{ type: Schema.Types.ObjectId, ref: "Users" }],
  chatroom: { type: Schema.Types.ObjectId, ref: "Chatrooms" },
  whiteboard: [{ type: Schema.Types.ObjectId, ref: "Whiteboards" }],
  created_at: { type: "Date", default: Date.now, required: true }
});

export default mongoose.model("Projects", Project);
