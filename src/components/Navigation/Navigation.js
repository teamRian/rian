import React from 'react';
import { Link } from 'react-router';
import '../../styles/Navigation.css';

class Navigation extends React.Component {

    render() {
        return (
            <div>
                <div className= "contain"><span className= "homeColor"><Link to='/'>홈</Link></span></div>
                <div className= "contain"><span className= "chatColor"><Link to='/calendar'>캘린더</Link></span></div>
                <div className= "contain"><span className= "chatColor"><Link to='/todolist'>투두</Link></span></div>
                <div className= "contain"><span className= "calColor"><Link to='/editor'>에디터</Link></span></div>
                <div className= "contain"><span className= "tpColor"><Link to='/chat'>채팅</Link></span></div>
                <div className= "contain"><span className= "tpColor"><Link to='/whiteboard'>화이트보드</Link></span></div>
            </div>
        )
    }
}

export default Navigation;