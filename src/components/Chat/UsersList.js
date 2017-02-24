import React, { Component } from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
const io = require('socket.io-client');

export default class UsersList extends Component {
  // static propTypes = {
  //   addTodo: PropTypes.func.isRequired
  // };
  constructor(props) {
    super(props);
    
  }

  render() {
    return (

      <div className='users well'>
          <h3> Online Users </h3>
          <ListGroup>
              {
                  this.props.users.map((user, i) => {
                      return (
                          <ListGroupItem key={i}>
                              {user}
                          </ListGroupItem>
                      )
                  })
              }
          </ListGroup>
      </div>
    );
  }
}