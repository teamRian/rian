import { TODO_ADD, TODO_CHANGE_STATUS, TODO_REMOVE } from '../constants';

export const addTodo = (newId, author, player, title, text, index) => {
  return {
    type: TODO_ADD,
    newId,
    author,
    player,
    title,
    text,
    index
  }
}

export const changeStatus = (status, id) => {
  return {
    type: TODO_CHANGE_STATUS,
    status,
    id
  }
}

export const removeTodo = (id) => {
  return {
    type: TODO_REMOVE,
    id
  }
}