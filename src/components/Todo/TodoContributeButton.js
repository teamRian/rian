import React from 'react';
import { Modal, Button } from 'react-bootstrap';

// Import Component
import TodoContribute from './TodoContribute.js';

class TodoContributeButton extends React.Component {
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
    });
  }


  close() {
    this.setState({
        showModal: false
    });
  }

  render() {
    return (
      <div>
        <Button bsStyle="info" onClick={this.open}>Contribution</Button>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>
              <p>Test</p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.props.contriList.map((list,i) => 
            <TodoContribute {...this.props} key={i} i={i} total={this.props.total} list={list}/>)}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default TodoContributeButton;
