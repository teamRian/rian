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
  }

  componentDidMount() {
    const { dispatch } = this.props;
    this.socket = io();
    this.socket.on('init', user => dispatch(actions.newUser(user)));
    this.socket.on('send:message', msg => {
      console.log('on:send:message')
      dispatch(actions.newMessage(msg))});
    this.socket.on('user:join', user => dispatch(actions.userJoin(user)));
    this.socket.on('user:left', user => dispatch(actions.userLeft(user)));
    this.socket.on('change:name', name => {
      console.log('on:change:name', name)
      dispatch(actions.changeName(name))});
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
    const dropDownMenu = (
      <div style={{'width': '21rem', 'top': '0', alignSelf: 'baseline', padding: '0', margin: '0', order: '1'}}>
        <DropdownButton key={1} style={{'width': '21rem'}} id="user-menu"  bsSize="large" bsStyle="primary" >
          {/*<MenuItem style={{'width': '21rem'}} eventKey="4" onSelect={this.handleSignOut}>Sign out</MenuItem>*/}
        </DropdownButton>
      </div>
    );
    const bigNav = (
      <div className="nav">
        {dropDownMenu}
        <section style={{order: '2', marginTop: '1.5em'}}>
          {/*<Channels socket={socket} onClick={this.changeActiveChannel} channels={channels} messages={messages} dispatch={dispatch} />*/}
        </section>
      </div>
    );

    return (
      <Grid>
        
        <Row className='show-grid'>
          <Col md={4}>
            <UsersList
              users={this.props.users}
            />
            <ChangeNameForm
              onChangeName={this.handleChangeName.bind(this)}
            />  
          </Col>
          <Col md={8}>
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


