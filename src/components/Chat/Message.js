import React, { Component } from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import { socketConnect } from 'socket.io-react';
import classNames from 'classnames';
const moment = require('moment');
const io = require('socket.io-client');

class Message extends Component {
  // static propTypes = {
  //   addTodo: PropTypes.func.isRequired
  // };
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.findUser = this.findUser.bind(this);
    this.state = {
      time: moment(new Date()).fromNow(),
      isPressed: false
    } 
  }

  // update() {
  //     let currentTime = moment(new Date()).fromNow();
  //     this.updateTime.value = currentTime;
  // }
  componentDidMount() {

    var that = this
    setInterval(function(){
        // console.log('come?')
        that.setState({
          time: moment(new Date()).fromNow()
        })
    }, 60000)

  }

  findUser(){
      for (var i = 0; i <= this.props.users.length; i++) {
        if(this.props.users[i].includes(this.props.socket.id.slice(6))){
            return this.props.users[i]
        }
      }
  }

  handleClick(){
      
      if(!this.state.isPressed){
          this.setState({
            isPressed: true
          })
      }else{
          this.setState({
            isPressed: false
          })
      }
      
  }

  render() {
    var likeClass = classNames({
      'likeTest': this.state.isPressed
    })
    var showClass = classNames({
      'showLikeMsg': this.state.isPressed
    })
    return (
      <div className='message well'>
          <strong>{this.props.username} : </strong>   
          <span>{this.props.text}</span>
          &nbsp;
          &nbsp;
          <span className='time' ref={ref => {this.updateTime = ref;}} >{moment(this.props.date).fromNow()}</span>
          <Button id='likeBtn' className={likeClass} onClick={this.handleClick} bsSize="xsmall"><Glyphicon glyph="thumbs-up" /> Like</Button>
          <span id='likeMsg' ref='likeUser' className={showClass}>{this.findUser()} 님이 좋아합니다!!</span>
      </div>
    );
  }
}

export default socketConnect(Message);
