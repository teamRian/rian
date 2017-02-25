import React, { Component } from 'react';
import UsersList from './UsersList';
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import ChangeNameForm from './ChangeNameForm';
import * as actions from '../../actions/chatActions';
import {Grid, Row, Col, Clearfix} from 'react-bootstrap';
import { Modal, DropdownButton, MenuItem, Button, Navbar, NavDropdown, Nav, NavItem } from 'react-bootstrap';
const io = require('socket.io-client');

export default class Chat extends Component {
  // static propTypes = {
  //   addTodo: PropTypes.func.isRequired
  // };

  constructor(props) {
    super(props);
    this.handleChangeName.bind(this);
    this.state = {
      privateChannelModal: false,
      targetedUser: ''
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;
    
    this.socket = io('/chat');

    var room = 'testroom';
    this.socket.on('init', user => {
      this.socket.emit('room', room);
      dispatch(actions.newUser(user))
    });
    this.socket.on('message', function(data){
        console.log('Wellcoming message: ', data);
    })
    this.socket.on('send:message', msg => {
      console.log('on:send:message')
      dispatch(actions.newMessage(msg))});
    this.socket.on('user:join', user => dispatch(actions.userJoin(user)));
    this.socket.on('user:left', user => dispatch(actions.userLeft(user)));
    this.socket.on('change:name', name => {
      console.log('on:change:name', name)
      dispatch(actions.changeName(name))});

    this.socket.on('private message', function(data){
        console.log('Private message: ', data.message, data.userName)
    });

  }

 

  handleMessageSubmit(message){
    this.socket.emit('send:message', message)
  }

  handleChangeName(newName) {
      this.socket.emit('change:name', {name: newName}, (result) => {
          if(!result) {
              return alert('There was an error changing your name');
          }
      });
  }
  



  render() {
    

    var style = {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      borderRight: '1px solid rgba(0, 0, 0, .12)',
      backgroundColor: 'rgba(249,249,249,1)'
    }
    return (
      <Grid>
        
        <Row className='show-grid'>
          <Col md={4}  >
            <UsersList
              users={this.props.users}
            />
            <ChangeNameForm
              onChangeName={this.handleChangeName.bind(this)}
            /> 
            
          </Col>
          <Col md={8} >

            <MessageList
              messages={this.props.messages}
            />
            
            <MessageForm
              
              onMessageSubmit={this.handleMessageSubmit.bind(this)}  
              user={this.props.user}
            />  
            
          </Col>  
        </Row>  
      </Grid>
    );
  }
}


