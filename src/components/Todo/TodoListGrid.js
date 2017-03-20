import React from 'react';
// import { Grid, Row ,Col } from 'react-bootstrap';

// import component
import Todo from './Todo';
import TodoAdd from './TodoAdd';
import TodoContributeButton from './TodoContributeButton';
import TodoLogButton from './TodoLogButton';

// File List Test
import FileList from './filelisttest/fileList';

// import CSS
import '../../styles/TodoListGrid.css';

class TodoListGrid extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {        
        let readyItem = [];
        let progressItem = [];
        let completedItem = [];
        let contributionList = [];
        let IndividualContributionItem = {};
        let contriItemList = []
        let total = 0;

        for ( let i = 0; i < this.props.todoList.length; i++ ) {

            let todoData = this.props.todoList[i];

            if ( todoData.status === 'created' ) {
                readyItem.push( todoData );
            } else if ( todoData.status === 'progress' ) {
                progressItem.push( todoData );
            } else {
              // For Completed Grid
              completedItem.push( todoData );

              // For Contribution Individual Value
              var contributor = Object.keys(todoData.ratio);

              for(let i = 0; i < contributor.length; i++) {
                let contValue = Math.ceil(todoData.ratio[ contributor[i] ] * todoData.importance / 100);

                let addItem = {
                         title : todoData.title, 
                         ratio : todoData.ratio[ contributor[i] ],
                    importance : todoData.importance
                }

                // Project Total Value
                total = total + contValue;
                
                // Individual Total Contribution Value
                if ( !IndividualContributionItem[ contributor[i] ] ) { 
                  IndividualContributionItem[ contributor[i] ] = {};
                  IndividualContributionItem[ contributor[i] ].value = contValue;
                  IndividualContributionItem[ contributor[i] ].participatedList = [ addItem ];
                } else {
                  IndividualContributionItem[ contributor[i] ].value = IndividualContributionItem[contributor[i]].value + contValue;
                  IndividualContributionItem[ contributor[i] ].participatedList.push( addItem );
                }
              }
            }
        }

        let contriKey = Object.keys(IndividualContributionItem);

        for ( let k = 0; k < contriKey.length; k++ ) {
          let item  = {};
          let key   = contriKey[k];
          item[key] = IndividualContributionItem[key];
          contributionList.push( item );
        }

        let todoTotalListNumber = this.props.todoList.length;
        let todoDoneListNumber  = completedItem.length;

        const wrap = {
            display : "flex",
            padding : "5px 5px"
        }

        return(
            <div>
                <div className="row">
                    <div className="col-xs-12 alignCenter">
                        <span className="todoHeaderText">To-Do List</span>
                        <FileList {...this.props} filefolder={this.props.filefolder} uploadfile={this.props.uploadfile}/>
                        <div style={wrap}>
                            <TodoAdd {...this.props}
                                id={this.props.todoList[this.props.todoList.length - 1] ? this.props.todoList[this.props.todoList.length - 1].projectId : ''} 
                                index={this.props.todoList[this.props.todoList.length - 1]? this.props.todoList[this.props.todoList.length - 1].index: ''}
                            />
                            <TodoContributeButton
                                contributionList={contributionList} 
                                total={total} 
                                todoTotalListNumber={todoTotalListNumber} 
                                todoDoneListNumber={todoDoneListNumber}/>
                            <TodoLogButton logs={this.props.logs}/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-md-4">
                        <h5 className="todo-grid-head-text-ready">Ready</h5>
                        {readyItem.map((todo,i) => 
                            <Todo {...this.props} key={i} i={i} todo={todo}/>)}
                    </div>
                    <div className="col-xs-12 col-md-4">
                        <h5 className="todo-grid-head-text-progress">Progress</h5>
                        {progressItem.map((todo,i) => 
                            <Todo {...this.props} key={i} i={i} todo={todo}/>)}
                    </div>
                    <div className="col-xs-12 col-md-4">
                        <h5 className="todo-grid-head-text-done">Done</h5>
                        {completedItem.map((todo,i) => 
                            <Todo {...this.props} key={i} i={i} todo={todo}/>)}
                    </div>
                </div>
            </div>
        );
    }
}

export default TodoListGrid;
