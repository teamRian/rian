import React from 'react';
import { Link } from 'react-router';
import '../../styles/Navigation.css';

class Navigation extends React.Component {

  render() {

    const textWhite = {
      color: "white"
    }

    return (
      <div>
        <div className="home"><span><Link to='/'>홈</Link></span></div>
        <div className="cal"><span><Link to='/calendar'>캘린더</Link></span></div>
        <div className="tp"><span><Link to='/todolist'>투두</Link></span></div>
        <div className="contain"><span><Link to='/editor'>에디터</Link></span></div>
        <div className="chat"><span><Link to='/chat'>채팅</Link></span></div>
        <div className="contain"><span><Link to='/whiteboard'>화이트보드</Link></span></div>
      </div>
    )
  }
}

export default Navigation;