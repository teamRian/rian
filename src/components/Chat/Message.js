import React, { Component } from 'react';
const moment = require('moment');
const io = require('socket.io-client');

export default class Message extends Component {
  // static propTypes = {
  //   addTodo: PropTypes.func.isRequired
  // };

  render() {
    
    return (
      <div className='message well'>
          <strong>{this.props.user} : </strong>   
          <span>{this.props.text}</span>
          &nbsp;
          &nbsp;
          <span>{moment([2007,0,29]).fromNow()}</span>
      </div>
    );
  }
}