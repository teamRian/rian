import React, { Component, PropTypes } from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import Rian from './Rian';
import DevTools from './DevTools';
import '../styles/Rian.css';
import Home from '../components/Rian/Home';
import NewProject from '../components/Rian/NewProject';
import Calendar from './Calendar/Calendar';
import CalendarSub from './Calendar/CalendarSub'
import TodoContainer from './Todo/TodoContainer';
import NoteEditor from './NoteEditor/NoteEditorContainer';
import NotetimelineContainer from './NoteTimeline/NotetimelineContainer';
import Chat from './Chat/ChatApp';
import UsersList from '../components/Chat/UsersList';
import WhiteBoard from './WhiteBoard/WhiteBoardContainer';



export default class Root extends Component {
 
  render() {
    const { store } = this.props;
    return (

      <div>
        <Router history={browserHistory}>
            <Route path="/" component={Rian}>
                <IndexRoute component={Home} />
                <Route path="/calendar" component={{main:Calendar, side:CalendarSub}}/>
                <Route path="/todolist" component={{main:TodoContainer}}/>
                <Route path="/editor" component={{main:NoteEditor, side:NotetimelineContainer}}/>
                <Route path="/chat" component={{main:Chat}}/>
                <Route path="/whiteboard" component={{main:WhiteBoard}}/>
                <Route path="/newProject" component={{main:NewProject}}/>
            </Route>
        </Router>
        <DevTools/>
      </div>

    );
  }
}