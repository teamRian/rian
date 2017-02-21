import * as types from '../constants';

let nextTodoId = 0

export const addTodo = (text) => {
  return {
    type: types.addToDo, //string value
    id: nextTodoId++,
    text
  }
}
