import React, { Component } from 'react';
const moment = require('moment');
const io = require('socket.io-client');

export default class Message extends Component {
  // static propTypes = {
  //   addTodo: PropTypes.func.isRequired
  // };
  constructor(props) {
    super(props);
    // this.state = {
    //   time: moment(new Date()).fromNow()
    // } 
  }

  // update() {
  //     let currentTime = moment(new Date()).fromNow();
  //     this.updateTime.value = currentTime;
  // }
  // componentDidMount() {

  //   var that = this
  //   setInterval(function(){
  //       console.log('come?')
  //       that.setState({
  //         time: moment(new Date()).fromNow()
  //       })
  //   }, 3000)

  // }

  render() {
  
    return (
      <div className='message well'>
          <strong>{this.props.user} : </strong>   
          <span>{this.props.text}</span>
          &nbsp;
          &nbsp;
          <span ref={ref => {this.updateTime = ref;}} ></span>
      </div>
    );
  }
}

