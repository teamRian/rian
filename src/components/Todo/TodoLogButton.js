import React from 'react';
import { Button, Modal } from 'react-bootstrap';

class TodoLogButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    }
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  open() {
    this.setState({
      showModal: true
    })
  }

  close() {
    this.setState({
      showModal: false
    })
  }


  render() {
    return (
      <div>
        <Button bsStyle="warning" onCLick={this.open}>Log</Button>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header></Modal.Header>
          <Modal.Body></Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default TodoLogButton;

