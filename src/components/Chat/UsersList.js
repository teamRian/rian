import React, { Component } from 'react';
import { Modal, Button, ListGroup, ListGroupItem, FormGroup, FormControl } from 'react-bootstrap';
import { socketConnect } from 'socket.io-react';
const io = require('socket.io-client');

class UsersList extends Component {
  // static propTypes = {
  //   addTodo: PropTypes.func.isRequired
  // };
  constructor(props) {
    super(props);
    this.state = {
        showDM: false,
        showPM: false,
        userId: '',
        sender: '',
        directMessage: ''
    }
    this.handleClick = this.handleClick.bind(this)
    this.props.socket.on('private msg', (msg, otherUser) => {
          this.setState({
              showDM: true,
              sender: otherUser,
              directMessage: msg
          })
        })
  }


  handleClick(e) {
    this.setState({
        showPM: true,
        userId: e.target.innerHTML
    })
    this.props.socket.emit('join', {studentId: this.state.userId});
    console.log('HI!!!')
  }

  handlePrivateMessageSubmit(e){
      e.preventDefault();
      this.props.socket.emit('user:clicked', {student: this.state.userId, msg: this.inputText.value})
      this.inputText.value = '';
  }

  render() {
    let closePM = () => this.setState({ showPM: false });
    let closeDM = () => this.setState({ showDM: false });
    const PrivateMessageModal = (
        <div className='modal-container'>
          <Modal
              show={this.state.showPM}
              onHide={closePM}
              container={this}
              aria-labelledby='contained-modal-title'
            >
              <Modal.Header closeButton>
                  <Modal.Title id='contained-modal-title'>Private Message</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  Type Message for this user

                  <form onSubmit={this.handlePrivateMessageSubmit.bind(this)}>
                      <FormGroup>
                      <FormControl
                        type='text'
                        placeholder='Enter Message'
                        inputRef={ref => {this.inputText = ref;}}
                      />
                      </FormGroup>
                      <Button type='submit'bsStyle="primary" bsSize='small'>Direct Message</Button>
                  </form>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={closePM}>Close</Button>
              </Modal.Footer>
          </Modal>  
        </div>
    )
        const DeliverdMessageModal = (
        <div className='modal-container'>
          <Modal
              show={this.state.showDM}
              onHide={closeDM}
              container={this}
              aria-labelledby='contained-modal-title'
            >
              <Modal.Header closeButton>
                  <Modal.Title id='contained-modal-title'>Delivered Message</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <b>{this.state.sender}</b> 님으로부터 문자가 도착하였습니다.<br/><br/>
                  <strong>{this.state.directMessage}</strong>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={closeDM}>Close</Button>
              </Modal.Footer>
          </Modal>  
        </div>
    )
    
    return (
      <div>
        {PrivateMessageModal}
        {DeliverdMessageModal}
          <h3> Online Users </h3>

          <ul>
              {
                  this.props.users.map((user, i) => {
                      return (    
                          <ListGroup key={i}>
                              <ListGroupItem ref={(student) => {this.student = student}} onClick={(e)=>this.handleClick(e)} style={{cursor: 'pointer'}}>{user}</ListGroupItem>
                          </ListGroup>
                      )
                  })

              }
          </ul>
          
      </div>  
    );
  }
}

export default socketConnect(UsersList);