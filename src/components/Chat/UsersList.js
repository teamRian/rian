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

      <div>
          <h3> Online Users </h3>
          <ul>
              {
                  this.props.users.map((user, i) => {
                      return (
                          <ListGroup key={i}>
                              <ListGroupItem>{user}</ListGroupItem>
                          </ListGroup>
                      )
                  })

              }
          </ul>
      </div>
    );
  }
}