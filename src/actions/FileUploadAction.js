import { ADD_FILE, DELETE_FILE, ADD_FILE_FOLDER, DELETE_FILE_FOLDER } from '../constants/index.js';

export function addFile() {
  return {
    type: ADD_FILE
  }
}