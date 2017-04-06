import mongoose from 'mongoose';
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const NotificationSchema = new Schema({

	user_id: { type: Schema.Types.ObjectId, ref: 'Users', required: true},
    timestamp: { type: Date, default: Date.now, required: true},
    text: { type: String, required: true },
    kind: { type: String, required: true },
    read: { type: Boolean, default: false, required: true},

})

export default mongoose.model('Notifications', NotificationSchema)

