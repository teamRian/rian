import mongoose from 'mongoose';
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const NotificationSchema = new Schema({

	user_id: { type: Schema.Types.ObjectId, required: true }
    box : [{
      timestamp: Date,
      kind: String,
      message: String,
      read: Boolean,
    }]

})

export default mongoose.model('Notification', NotificationSchema)

