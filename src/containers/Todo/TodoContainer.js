import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import Actions
import * as actionCreators from '../../actions/TodoActions.js';

// import ToDo List Grid
import TodoListGrid from '../../components/Todo/TodoListGrid';

class TodoContainer extends React.Component {
  render() {
    return (
      <div>
        <TodoListGrid />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    todoList: state.TodosListReducer,
    logs: state.TodosLogsReducer,
    user: state.User,
    filefolder: state.filefolder,
    uploadfile: state.uploadfile
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoListGrid);
