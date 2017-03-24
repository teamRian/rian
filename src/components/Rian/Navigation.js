import React from 'react';

import { browserHistory } from 'react-router';

import '../../styles/Navigation.css';

class Navigation extends React.Component {


  clickLink(link){
    browserHistory.push(link);
  }



  render() {
    return (
      <div id="nav-bar">
        <div onClick={()=>this.clickLink('/calendar')}>캘린더</div>
        <div onClick={()=>this.clickLink('/todolist')}>투두</div>
        <div onClick={()=>this.clickLink('/editor')}>노트</div>
        <div onClick={()=>this.props.clickShowChat()}>채팅</div>
        <div onClick={()=>this.clickLink('/whiteboard')}>화이트보드</div>
      </div>
    )
  }
}

export default Navigation;