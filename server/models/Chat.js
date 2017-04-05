import mongoose from 'mongoose';
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const MessageSchema = new Schema({
        _id: Schema.Types.ObjectId,
        timestamp: Date,
        from: { type: Schema.Types.ObjectId, ref: "User" },
        content: String,
        read: { UserObjectid: Boolean },
        previous: Schema.Types.ObjectId,
        next: Schema.Types.ObjectId,
})

const ChatSchema = new Schema({

	member: [{ type: Schema.Types.ObjectId, ref: 'User'}],
	projects_id: { type: Schema.Types.ObjectId, ref: "Project" },
	first_Message: Schema.Types.ObjectId,
    last_Message: Schema.Types.ObjectId,
    message: [MessageSchema]

})

export default mongoose.model('Chat', ChatSchema)

