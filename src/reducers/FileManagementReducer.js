import UploadFile from '../components/Todo/filelisttest/testUploadFile';

export function FileManagementReducer (state = UploadFile, action) {    
  switch ( action.type ) {
    case 'ADD_FILE':
      state[ action.filename ] = {
          projectId : action.projectId,
        projectName : action.projectName,
           uploader : action.uploader,
          createdAt : action.createdAt,
                tag : action.tag,
           filesize : action.fileSize
      }
      return Object.assign({}, {}, state);
    case 'EDIT_FILE':
      state[ action.filename ] = {
                tag : action.tag
      }
      return Object.assign({}, {}, state);
    case 'DELETE_FILE':
      delete state[ action.filename ];
      return Object.assign({}, {}, state);
    case 'DOWNLOAD_FILE':
      return state;
    default:
      return state;
  }
}
