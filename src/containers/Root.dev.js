import React, { Component, PropTypes } from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import Rian from './Rian';
import DevTools from './DevTools';
import '../styles/Rian.css';
import Calendar from './Calendar/Calendar.js';
import TodoContainer from './Todo/TodoContainer.js';
import NoteEditor from './NoteEditor/NoteEditorContainer';
import Chat from './Chat/ChatApp.js';
import WhiteBoard from './WhiteBoard/WhiteBoardContainer.js';



export default class Root extends Component {
  // static propTypes = {
  //   store: PropTypes.object
  // };

  // <Rian />
  // <DevTools />

  render() {
    const { store } = this.props;
    return (

      <div>
        <Router history={browserHistory}>
            <Route path="/" component={Rian}>
                <IndexRoute component = {Calendar} />
                <Route path="/calendar" component={Calendar} />
                <Route path="/todolist" component={TodoContainer} />
                <Route path="/editor" component={NoteEditor} />
                <Route path="/chat" component={Chat} />
                <Route path="/whiteboard" component={WhiteBoard} />
            </Route>
        </Router>
        <DevTools/>
      </div>

    );
  }
}