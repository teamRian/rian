import React from 'react';
// import { Grid, Row ,Col } from 'react-bootstrap';

// import component
import Todo from './Todo';
import TodoAdd from './TodoAdd';

class TodoListGrid extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {        
        const readyItem = [];
        const progressItem = [];
        const completedItem = [];

        const textCenter = {
            textAlign: "center",
            backgroundColor: "black",
            color: "white",
            padding: "5px 0px"
        }

        for(let i = 0; i < this.props.todoList.length; i++) {
            if(this.props.todoList[i].status === 'created') {
                readyItem.push(this.props.todoList[i]);
            } else if(this.props.todoList[i].status === 'progress') {
                progressItem.push(this.props.todoList[i])
            } else {
                completedItem.push(this.props.todoList[i]);
            }
        }

        return(
            <div>
                    <div className="row">
                        <div className="col-md-8 col-xs-10">
                            <h1>Welcome to Our To-Do List</h1>
                        </div>
                        <div className="col-md-4 col-xs-2">
                            <TodoAdd {...this.props} 
                                id={this.props.todoList[this.props.todoList.length - 1] ? this.props.todoList[this.props.todoList.length - 1].projectId : ''} 
                                index={this.props.todoList[this.props.todoList.length - 1]? this.props.todoList[this.props.todoList.length - 1].index: ''}
                            />
                        </div>
                    </div>
                    <div  className="row">
                        <div className="col-xs-4">
                            <h4 style={textCenter}>Ready</h4>
                            {readyItem.map((todo,i) => 
                                <Todo {...this.props} key={i} i={i} todo={todo}/>)}
                        </div>
                        <div className="col-xs-4">
                            <h4 style={textCenter}>Progress</h4>
                            {progressItem.map((todo,i) => 
                                <Todo {...this.props} key={i} i={i} todo={todo}/>)}
                        </div>
                        <div className="col-xs-4">
                            <h4 style={textCenter}>Done</h4>
                            {completedItem.map((todo,i) => 
                                <Todo {...this.props} key={i} i={i} todo={todo}/>)}
                        </div>
                    </div>
            </div>
        );
    }
}

export default TodoListGrid;


/*import React from 'react';
import { Grid, Row ,Col } from 'react-bootstrap';

// import component
import Todo from './Todo';
import TodoAdd from './TodoAdd';

class TodoListGrid extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {        
        const readyItem = [];
        const progressItem = [];
        const completedItem = [];

        const textCenter = {
            textAlign: "center",
            backgroundColor: "black",
            color: "white",
            padding: "5px 0px"
        }

        for(let i = 0; i < this.props.todoList.length; i++) {
            if(this.props.todoList[i].status === 'created') {
                readyItem.push(this.props.todoList[i]);
            } else if(this.props.todoList[i].status === 'progress') {
                progressItem.push(this.props.todoList[i])
            } else {
                completedItem.push(this.props.todoList[i]);
            }
        }

        return(
            <div>
                <Grid>
                    <Row>
                        <Col sm={10}>
                            <h1>Welcome to Our To-Do List</h1>
                        </Col>
                        <Col sm={2}>
                            <TodoAdd {...this.props} 
                                id={this.props.todoList[this.props.todoList.length - 1] ? this.props.todoList[this.props.todoList.length - 1].projectId : ''} 
                                index={this.props.todoList[this.props.todoList.length - 1]? this.props.todoList[this.props.todoList.length - 1].index: ''}
                            />
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <Col sm={4}>
                            <h4 style={textCenter}>Ready</h4>
                            {readyItem.map((todo,i) => 
                                <Todo {...this.props} key={i} i={i} todo={todo}/>)}
                        </Col>
                        <Col sm={4}>
                            <h4 style={textCenter}>Progress</h4>
                            {progressItem.map((todo,i) => 
                                <Todo {...this.props} key={i} i={i} todo={todo}/>)}
                        </Col>
                        <Col sm={4}>
                            <h4 style={textCenter}>Done</h4>
                            {completedItem.map((todo,i) => 
                                <Todo {...this.props} key={i} i={i} todo={todo}/>)}
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default TodoListGrid;
*/

