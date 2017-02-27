import React from 'react';
import { Link } from 'react-router';
import '../../styles/Navigation.css';

class Navigation extends React.Component {

  render() {

    const textWhite = {
      color: "white"
    }

    return (
      <div id="navigation">
        <div id="home"><span><Link to='/'>홈</Link></span></div>
        <div id="calendar"><span><Link to='/calendar'>캘린더</Link></span></div>
        <div id="todolist"><span><Link to='/todolist'>투두</Link></span></div>
        <div id="editor"><span><Link to='/editor'>에디터</Link></span></div>
        <div id="chat"><span><Link to='/chat'>채팅</Link></span></div>
        <div id="whiteboard"><span><Link to='/whiteboard'>화이트보드</Link></span></div>
      </div>
    )
  }
}

export default Navigation;