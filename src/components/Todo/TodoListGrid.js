import React from 'react';
// import { Grid, Row ,Col } from 'react-bootstrap';

// import component
import Todo from './Todo';
import TodoAdd from './TodoAdd';
import TodoContributeButton from './TodoContributeButton';
import TodoLogButton from './TodoLogButton'

// import Css
import '../../styles/TodoListGrid.css';

class TodoListGrid extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {        
        let readyItem = [];
        let progressItem = [];
        let completedItem = [];
        let contriList = [];
        let contriObj = {}
        let total = 0;

        for(let i = 0; i < this.props.todoList.length; i++) {

            let todoData = this.props.todoList[i];

            if(todoData.status === 'created') {
                readyItem.push(todoData);
            } else if(todoData.status === 'progress') {
                progressItem.push(todoData);
            } else {
              // For Complted Grid
              completedItem.push(todoData);

              // For Contribution
              var contributor = Object.keys(todoData.ratio);

              for(let i = 0; i < contributor.length; i++) {
                let contValue = Math.ceil(todoData.ratio[contributor[i]] * todoData.importance / 100);
                
                total = total + contValue;
                
                if(!contriObj[contributor[i]]) { 
                  contriObj[contributor[i]] = contValue; 
                } else {
                  contriObj[contributor[i]] = contriObj[contributor[i]] + contValue;
                }
              }
            }
        }

        let contriKey = Object.keys(contriObj);

        for(let k = 0; k < contriKey.length; k++) {
          let item = {};
          let key = contriKey[k];
          item[key] = contriObj[key];
          contriList.push(item);
        }

        return(
            <div>
                <div className="row alignCenter">
                    <span className="todoHeaderText">To-Do List</span>
                    <TodoAdd {...this.props} 
                        id={this.props.todoList[this.props.todoList.length - 1] ? this.props.todoList[this.props.todoList.length - 1].projectId : ''} 
                        index={this.props.todoList[this.props.todoList.length - 1]? this.props.todoList[this.props.todoList.length - 1].index: ''}
                    />
                    <TodoContributeButton contriList={contriList} total={total}/>
                    <TodoLogButton />
                </div>
                <div  className="row">
                    <div className="col-xs-4">
                        <h5 className="todo-grid-head-text">Ready</h5>
                        {readyItem.map((todo,i) => 
                            <Todo {...this.props} key={i} i={i} todo={todo}/>)}
                    </div>
                    <div className="col-xs-4">
                        <h5 className="todo-grid-head-text">Progress</h5>
                        {progressItem.map((todo,i) => 
                            <Todo {...this.props} key={i} i={i} todo={todo}/>)}
                    </div>
                    <div className="col-xs-4">
                        <h5 className="todo-grid-head-text">Done</h5>
                        {completedItem.map((todo,i) => 
                            <Todo {...this.props} key={i} i={i} todo={todo}/>)}
                    </div>
                </div>
            </div>
        );
    }
}

export default TodoListGrid;
