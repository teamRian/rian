import * as types from '../constants';

let nextTodoId = 0

export const addTodo = (text) => {
  return {
    type: types.ADD_TO_DO, //string value
    id: nextTodoId++,
    text
  }
}
