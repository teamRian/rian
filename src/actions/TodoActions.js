import { TODO_ADD, TODO_CHANGE_STATUS, TODO_REMOVE } from '../constants';

export const addTodo = (newId, author, player, title, text, importance, index) => {
  return {
    type: TODO_ADD,
    newId,
    author,
    player,
    title,
    text,
    importance,
    index
  }
}

export const changeStatus = (status, id, startdate, enddate) => {
  return {
    type: TODO_CHANGE_STATUS,
    status,
    id,
    startdate,
    enddate
  }
}

export const removeTodo = (id) => {
  return {
    type: TODO_REMOVE,
    id
  }
}