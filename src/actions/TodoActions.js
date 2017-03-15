import { TODO_ADD, TODO_CHANGE_STATUS, TODO_REMOVE } from '../constants';

export const addTodo = (newId, author, player, title, text, importance, index, log, ratio) => {
  return {
    type: TODO_ADD,
    newId,
    author,
    player,
    title,
    text,
    importance,
    index,
    log,
    ratio
  }
}

export const changeStatus = (status, id, startdate, enddate, log) => {
  return {
    type: TODO_CHANGE_STATUS,
    status,
    id,
    startdate,
    enddate,
    log
  }
}

export const removeTodo = (id, log) => {
  return {
    type: TODO_REMOVE,
    id,
    log
  }
}