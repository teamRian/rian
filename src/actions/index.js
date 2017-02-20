import * as types from '../constants';

let nextTodoId = 0

export const addTodo = (text) => {
  return {
    type: types.addToDo,
    id: nextTodoId++,
    text
  }
}
