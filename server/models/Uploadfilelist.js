import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UploadFileListSchema = new Schema({
  projectID: String,
  folderName: []
})

export default mongoose.model('UploadFileList', UploadFileListSchema);
