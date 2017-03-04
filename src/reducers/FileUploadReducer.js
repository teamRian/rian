// import Data
import UploadFileFolder from '../components/Todo/filelisttest/testUploadFileFolder';
import UploadFile from '../components/Todo/filelisttest/testUploadFile';

export function filefolder (state = UploadFileFolder, action) {    
  switch(action.type){
    case 'ADD_FILE':
      return state;
    default:
      return state;
  }
}

export function uploadfile (state = UploadFile, action) {    
  switch(action.type){
    case 'ADD_FILE':
      return state;
    default:
      return state;
  }
}