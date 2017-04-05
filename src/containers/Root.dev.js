import React, { Component, PropTypes } from 'react';
import {
  BrowserRouter as Router,
  Route,
  IndexRoute,
  Link,
  Switch
} from 'react-router-dom'
import createHistory from 'history/createBrowserHistory';
const history = createHistory();

import Rian from './Rian';
import DevTools from './DevTools';
import '../styles/Rian.css';
import HomeComponent from '../components/Rian/Home';
import NewProject from '../components/Rian/NewProject';
import Calendar from './Calendar/Calendar';
import CalendarSub from './Calendar/CalendarSub'
import NoteEditor from './NoteEditor/NoteEditorContainer';
import NotetimelineContainer from './NoteTimeline/NotetimelineContainer';
import FirebaseChatContainer from './FirebaseChat/FirebaseChatContainer';
import WhiteBoard from './WhiteBoard/WhiteBoardContainer';

        // <DevTools/>


export default class Root extends Component {
 
  render() {
    const { store } = this.props;
    return (
      <Router history={history}>
        <Rian />
      </Router>
    );
  }
}

