import React, { Component, PropTypes } from 'react';
// import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import Rian from './Rian';
import DevTools from './DevTools';
// import '../styles/Rian.css';
// import Home from '../components/Rian/Home';
// import NewProject from '../components/Rian/NewProject';
// import Calendar from './Calendar/Calendar';
// import CalendarSub from './Calendar/CalendarSub'
// import NoteEditor from './NoteEditor/NoteEditorContainer';
// import NotetimelineContainer from './NoteTimeline/NotetimelineContainer';
// import FirebaseChatContainer from './FirebaseChat/FirebaseChatContainer';
// import WhiteBoard from './WhiteBoard/WhiteBoardContainer';



export default class Root extends Component {
 
  render() {
    const { store } = this.props;
    return (

      <div>
        <Rian/>
        <DevTools/>
      </div>

    );
  }
}