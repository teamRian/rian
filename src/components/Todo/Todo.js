import React, { PropTypes } from 'react';
import { Table, Button, Panel, Grid, Row, Col, Modal } from 'react-bootstrap'

const Todo = React.createClass({
    getInitialState() {
      return { 
        showModal: false
      };
    },

    // Modal Control
    close() {
      this.setState({ 
        showModal: false 
      });
    },

    open() {
      this.setState({ 
        showModal: true 
      });
    },

    // Button Control
      // Next Button
    handleNext(e) {
      e.preventDefault();
      let changeStatus = '';
      let id = this.props.todo.id;
      
      // Date 추가하기

      if(this.props.todo.status === 'created') {
        changeStatus = 'progress';
      } else if (this.props.todo.status === 'progress'){
        changeStatus = 'completed';
      } else {
        changeStatus = 'completed';
      }

      this.props.changeStatus(changeStatus, id);
    },
      // Prev Button
    handlePrev(e) {
      e.preventDefault();
      let changeStatus = '';
      let id = this.props.todo.id;

      if(this.props.todo.status === 'progress') {
        changeStatus = 'created';
      } else if (this.props.todo.status === 'completed'){
        changeStatus = 'progress';
      } else {
        changeStatus = 'created';
      }

      this.props.changeStatus(changeStatus, id);
    },
      // Remove Button
    handleRemove(e) {
      e.preventDefault();
      this.props.removeTodo(this.props.todo.id);
      this.close();
    },

    render() {
        const { author, player, title, text, status, startdate, enddate, index } = this.props.todo;
      
        const buttonSelector = (
            <Table>
                <tbody className="alignCenter">
                    <tr>
                        <td className="paddingZero">
                          <Button bsStyle="warning" className="prevButton" onClick={this.handlePrev}>
                            <span 
                                className="glyphicon glyphicon-hand-left"
                                aria-hidden="true">{' '}Prev</span>
                            </Button>
                        </td>
                        <td className="paddingZero">
                          <Button bsStyle="danger" className="nextButton" onClick={this.handleNext}>
                            <span 
                                className="glyphicon glyphicon-thumbs-up" 
                                aria-hidden="true">{' '}Next</span>
                          </Button>
                        </td>
                    </tr>
                </tbody>
            </Table>
        ) 
    
        return (
            <div className="todoItemCard">
              <div className="todoItemCardContainer">
                <div className="todoItemCardHeader">
                  <span>{index}</span>
                  <Button type="button" className="close" aria-label="Close" onClick={this.open}>
                    <span aria-hidden="true">&times;</span>
                  </Button>
                  <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                      <Modal.Title>To-Do Item 삭제</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <p>해당 아이템을 삭제하시겠습니까?</p>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button bsStyle="danger" onClick={this.handleRemove}>삭제하기</Button>
                      <Button onClick={this.close}>취소하기</Button>
                    </Modal.Footer>
                  </Modal>
                </div>
                <p><span>작성자{' '}</span>{author}</p>
                <p><span>책임자{' '}</span>{player}</p>
                <p><span>제목{' '}</span>{title}</p>
                <p><span>해야할일{' '}</span>{text}</p>
                <p><span>시작일{' '}</span>{startdate}{' '}<span>완료일{' '}</span>{enddate}</p>
              </div>
              <div>
                {buttonSelector}
              </div>
            </div>
        );
    }
})

export default Todo;
