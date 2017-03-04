import React, { Component } from 'react';
import UsersList from './UsersList';
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import ChangeNameForm from './ChangeNameForm';
import * as actions from '../../actions/chatActions';
import {Grid, Row, Col, Clearfix} from 'react-bootstrap';
import { Modal, DropdownButton, MenuItem, Button, Navbar, NavDropdown, Nav, NavItem } from 'react-bootstrap';
import io from 'socket.io-client';
import { SocketProvider } from 'socket.io-react';
const socket = io('/chat');
      socket.on('connectMsg', (data) => {
          console.log('connected!!!', data)

        });

      


export default class Chat extends Component {
  // static propTypes = {
  //   addTodo: PropTypes.func.isRequired
  // };

  constructor(props) {
    super(props);
    this.state = {
      privateChannelModal: false,
      targetedUser: ''
    }
    this.newUser = this.newUser.bind(this);
    this.updateMessage = this.getMessages.bind(this);
    this.updateUser = this.joinUsers.bind(this);
    // var room = 'testroom';
    socket.emit('init', 'good!')

    
  }

  newUser(user){
      this.props.newUser(user)
  }

  getMessages(msg){
      this.props.getMessage(msg)
  }

  joinUsers(user){
      this.props.userJoin(user)
  }

  componentWillUnmount() {
    socket.off('init', this.newUser)
    socket.off('send:message', this.updateMessage);
    socket.off('user:join', this.updateUser)
  }

  componentDidMount() {
    console.log('USER:::',this.props.User._id)
    
    if(!!this.props.User._id){
        // get chat logs from DB
        this.props.chatRequest()
    }
    socket.on('init', this.newUser); 
    socket.on('send:message', this.updateMessage);   
    socket.on('user:join', this.updateUser);
    socket.on('user:left', user => this.props.userLeft(user));
  }  
  

  handleMessageSubmit(message){
    socket.emit('send:message', message);
    this.props.chatPost(message)
  }
  
  render() {
    return (
      <Grid>
        
        <Row className='show-grid'>
          <Col md={4}  >
            <SocketProvider socket={socket}>
            <UsersList
              users={this.props.users}
              updateMessage={this.updateMessage}
            />
            </SocketProvider>
          </Col>
          <Col md={8} >
            <SocketProvider socket={socket}>
            <MessageList
              users={this.props.users}
              messages={this.props.Chatlog.messages}
              // Chatlog={this.props.Chatlog}
            />
            </SocketProvider>
            <SocketProvider socket={socket}>
            <MessageForm
              chatPost={this.props.chatPost}
              onMessageSubmit={this.handleMessageSubmit.bind(this)}  
              users={this.props.users}
            />  
            </SocketProvider>
          </Col>  
        </Row>  
      </Grid>
    );
  }
}


