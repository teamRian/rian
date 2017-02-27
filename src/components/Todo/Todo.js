import React, { PropTypes } from 'react';
import { Table, Button, Modal, Tooltip, OverlayTrigger, Pager, DropdownButton, MenuItem } from 'react-bootstrap';
import moment from 'moment';
import '../../styles/Todo.css';

const Todo = React.createClass({
    getInitialState() {
      return { 
        showModal: false,
        showDetail: false
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

    detailClose() {
      this.setState({ 
        showDetail: false 
      });
    },

    detailOpen() {
      this.setState({ 
        showDetail: true 
      });
    },

    // Button Control
      // Next Button
    handleNext(e) {
      e.preventDefault();
      let changeStatus = '';
      let id = this.props.todo.id;
      let enddate = this.props.todo.enddate;
      let startdate = this.props.todo.startdate;

      if(this.props.todo.status === 'created') {
        changeStatus = 'progress';
        startdate = moment().format("YYYY-MM-DD");
      } else if (this.props.todo.status === 'progress'){
        changeStatus = 'completed';
        enddate = moment().format("YYYY-MM-DD");
      } else {
        changeStatus = 'completed';
      }

      this.props.changeStatus(changeStatus, id, startdate ,enddate);
      this.detailClose();
    },
      // Prev Button
    handlePrev(e) {
      e.preventDefault();
      let changeStatus = '';
      let id = this.props.todo.id;
      let startdate = this.props.todo.startdate;
      let enddate = this.props.todo.enddate;

      if(this.props.todo.status === 'progress') {
        changeStatus = 'created';
        startdate = "";
      } else if (this.props.todo.status === 'completed'){
        changeStatus = 'progress';
        enddate = "";
      } else {
        changeStatus = 'created';
      }

      this.props.changeStatus(changeStatus, id, startdate ,enddate);
      this.detailClose();
    },
      // Remove Button
    handleRemove(e) {
      e.preventDefault();
      this.props.removeTodo(this.props.todo.id);
      this.close();
    },

    render() {
        const { author, player, title, text, status, startdate, enddate, index } = this.props.todo;
        
        const marginZero = {
          margin: "0px 0px"
        }

        const buttonSelector = (
          <div>
            <Pager style={marginZero}>
              <Pager.Item previous onClick={this.handlePrev}>&larr; 이전 단계로</Pager.Item>
              <Pager.Item next onClick={this.handleNext}>다음 단계로 &rarr;</Pager.Item>
            </Pager>
          </div>
        ) 
    
        return (
            <div className="todoItemCard">
              <Table className="modalHeaderText">
                <thead className="todo-card-table-head-box">
                  <td className="todo-card-table-head-index">No</td>
                  <td className="todo-card-table-head-title">제목</td>
                  <td className="todo-card-table-head-player">참여자</td>
                  <td className="todo-card-table-head-button">작업</td>
                </thead>
                <tbody>
                  <tr>
                    <td className="todo-card-table-body-index">{index}</td>
                    <td className="todo-card-table-body-title">{title}</td>
                    <td className="todo-card-table-body-player">{player.map((player,i) => {
                        var tooltip = (
                          <Tooltip id="modal-tooltip">
                            {player}
                          </Tooltip>
                        )
                        if(player.url === undefined) {
                            return (
                              <OverlayTrigger key={i} overlay={tooltip}>
                                <span className="textCircle">{player[0]+player[1]}</span>
                              </OverlayTrigger>
                            )                      
                        }
                      })}</td>
                    <td className="todo-card-table-body-button">
                      <DropdownButton title="" id="todo-card-table-body-button-show">
                        <MenuItem onClick={this.open}>삭제하기</MenuItem>
                        <MenuItem onClick={this.detailOpen}>자세히 보기</MenuItem>
                      </DropdownButton>
                    </td>
                  </tr>
                </tbody>
              </Table>

              {/* Todo Item Delete Modal */}
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

              {/* Show Todo Item Detail Modal */}
              <Modal show={this.state.showDetail} onHide={this.detailClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>
                      {title}
                      <p className="modalHeaderText">
                        <span>시작일{' '}</span>{startdate? startdate : "시작안됨" }{' '}
                        <span>완료일{' '}</span>{enddate? enddate : "완료안됨"}
                      </p>
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <p><span>작성자{' '}</span>{author}</p>
                    <p><span>책임자{' '}</span>{player.map((player,i) => {
                      var tooltip = (
                        <Tooltip id="modal-tooltip">
                          {player}
                        </Tooltip>
                      )
                      if(player.url === undefined) {
                        return (
                          <OverlayTrigger key={i} i={i} overlay={tooltip}>
                            <img className="playerImage" src="https://cdn1.iconfinder.com/data/icons/managers-15/430/Untitled-34-512.png" width="20px" height="20px"/>
                          </OverlayTrigger>
                        )
                      }
                    })}</p>
                    <p>{text}</p>
                  </Modal.Body>
                  <Modal.Footer>
                    {buttonSelector}
                  </Modal.Footer>
                </Modal>
            </div>
        );
    }
})

export default Todo;
