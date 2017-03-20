import React from 'react';
import { Button, Modal, Tooltip, OverlayTrigger } from 'react-bootstrap';

// Import Component
import TodoLog from './TodoLog';

// Import ICON
import svgIcon from './svgIcon';

// Import CSS
import './TodoLogButton.css';

class TodoLogButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
    this.open  = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  // Modal Button Action
  open () { this.setState( { showModal: true  } ); }
  close() { this.setState( { showModal: false } ); }

  render() {
    return (
      <div className="todo-log-button-wrap">
        <OverlayTrigger overlay={tooltip} placement="bottom">
          {svgIcon.logButton(this.open)}
        </OverlayTrigger>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header className="todo-log-button-log-header-box" closeButton>
            LOG
          </Modal.Header>
          <Modal.Body>
            <table className="todo-log-button-table-width">
              <tbody>
              {this.props.logs.map((log,i) => (
                <TodoLog log={log} index={i} key={i} />
              ))}
              </tbody>
            </table>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

const tooltip = (
  <Tooltip id="showLog">
    Log 보기
  </Tooltip>
);

export default TodoLogButton;

