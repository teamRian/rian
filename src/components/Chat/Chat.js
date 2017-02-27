import React, { Component } from 'react';
import UsersList from './UsersList';
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import ChangeNameForm from './ChangeNameForm';
import * as actions from '../../actions/chatActions';
import {Grid, Row, Col, Clearfix} from 'react-bootstrap';
import { Modal, DropdownButton, MenuItem, Button, Navbar, NavDropdown, Nav, NavItem } from 'react-bootstrap';
const io = require('socket.io-client');
const socket = io('/chat');
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

    
    var room = 'testroom';
    socket.on('init', user => {
      socket.emit('room', room);
      this.props.newUser(user);
    });
    socket.on('message', function(data){
        console.log('Wellcoming message: ', alert(data));
    })
    socket.on('send:message', msg => {
      console.log('on:send:message')
      this.props.getMessage(msg)});
    socket.on('user:join', user => this.props.userJoin(user));
    socket.on('user:left', user => this.props.userLeft(user));
    socket.on('change:name', name => {
      console.log('on:change:name', name)
      this.props.changeName(name)});

    socket.on('private message', function(data){
        console.log('Private message: ', data.message, data.userName)
    });
  }

  componentDidMount() {


  }

   

  handleMessageSubmit(message){
    socket.emit('send:message', message)
  }

  handleChangeName(newName) {
      socket.emit('change:name', {name: newName}, (result) => {
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


