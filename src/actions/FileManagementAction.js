import { ADD_FILE, DELETE_FILE, DOWNLOAD_FILE, EDIT_FILE } from '../constants/index.js';
import axios from 'axios';
import FileDownload from 'react-file-download';
//gridfs-stream

// FILE ADD
export const addFile = (filename, projectId, projectName, uploader, createdAt, tag, fileSize) => {
  return {
    type: ADD_FILE,
    filename,
    projectId,
    projectName,
    uploader,
    createdAt,
    tag,
    fileSize
  }
}

// FILE EDIT
export const editFile = (filename, tag) => {
  return {
    type: EDIT_FILE,
    filename,
    tag
  }
}

// FILE DELETE
export const deleteFileInfo = (filename) => {
  return {
    type: DELETE_FILE,
    filename
  }
}

export const deleteFile = (filename) => {
  return function(dispatch) {
    dispatch(deleteFileInfo(filename))
    return axios.get('/file/delete/' + filename)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      if(err) throw err;
    })
  }
}

// FILE DOWNLOAD
export const downloadRequest = () => {
  return {
    type: DOWNLOAD_FILE
  }
}

export const downloadFile = (filename) => {
  return function(dispatch) {
    dispatch(downloadRequest())
    return axios.get('/file/download/' + filename)
    .then(res=>{
      FileDownload(res.data, filename);
    })
    .catch(err=>{
      if(err) throw err
    })
  }
}

