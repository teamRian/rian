import React, { PropTypes } from 'react';
import { Table, Button, Modal, Tooltip, OverlayTrigger, Pager, DropdownButton, MenuItem, ProgressBar, FormControl } from 'react-bootstrap';
import moment from 'moment';

// Import ICON
import svgIcon from './svgIcon';

// Import CSS
import './Todo.css';

const Todo = React.createClass({
    getInitialState() {
      return { 
               showModal : false,
              showDetail : false,
                showEdit : false,
               editTitle : this.props.todo.title,
                editText : this.props.todo.text,
          editImportance : this.props.todo.importance,
         editPlayerRatio : this.props.todo.ratio,
        editDeletePlayer : ""
      };
    },

    // Modal Control
            open () { this.setState( { showModal: true   } ); },    
            close() { this.setState( { showModal: false  } ); },

    todoInfoOpen () { this.setState( { showDetail: true  } ); },
    todoInfoClose() { this.setState( { showDetail: false } ); },

    todoEditOpen () { this.setState( { showEdit: true    } ); },
    todoEditClose() { this.setState( { showEdit: false   } ); },

    // Button Control
      // Next Button
    handleNext(e) {
      e.preventDefault();

      let changeStatus = '';
      let id           = this.props.todo.id;
      let enddate      = this.props.todo.enddate;
      let startdate    = this.props.todo.startdate;
      let changedAt    = moment().format('YYYY-MM-DD hh:mm:ss a');
      let log          = {};
      let logContent   = {};

      if ( this.props.todo.status === 'created' ) {
        changeStatus = 'progress';
        startdate = moment().format("YYYY-MM-DD");
        logContent["message"] = `${this.props.todo.title}이(가) 진행중으로 이동`;
        logContent["author"]  = `${this.props.user.username}`;
      } else if ( this.props.todo.status === 'progress' ) {
        changeStatus = 'completed';
        enddate = moment().format("YYYY-MM-DD");
        logContent['message'] = `${this.props.todo.title}이(가) 완료로 이동`;
        logContent['author']  = `${this.props.user.username}`;
      } else {
        changeStatus = 'completed';
      }

      log[changedAt] = logContent;

      this.props.changeStatus(changeStatus, id, startdate ,enddate, log);
      this.todoInfoClose();
    },
      // Prev Button
    handlePrev(e) {
      e.preventDefault();

      let changeStatus = '';
      let id           = this.props.todo.id;
      let startdate    = this.props.todo.startdate;
      let enddate      = this.props.todo.enddate;
      let changedAt    = moment().format('YYYY-MM-DD hh:mm:ss a');
      let log          = {};
      let logContent   = {};

      if ( this.props.todo.status === 'progress' ) {
        changeStatus = 'created';
        startdate = "";
        logContent['message'] = `${this.props.todo.title}이(가) 준비로 이동`;
        logContent['author'] =  `${this.props.user.username}`;
      } else if ( this.props.todo.status === 'completed' ) {
        changeStatus = 'progress';
        enddate = "";
        logContent['message'] = `${this.props.todo.title}이(가) 진행중으로 이동`;
        logContent['author'] =  `${this.props.user.username}`;
      } else {
        changeStatus = 'created';
      }

      log[changedAt] = logContent;

      this.props.changeStatus(changeStatus, id, startdate, enddate, log);
      this.todoInfoClose();
    },
      // Remove Button
    handleRemove(e) {
      e.preventDefault();

      const removedAt  = moment().format('YYYY-MM-DD hh:mm:ss a')
      const log        = {};
      const logContent = {};

      logContent['message'] = `${this.props.todo.title}이(가) 진행중으로 이동`;
      logContent['author'] =  `${this.props.user.username}`;

      log[removedAt] = logContent;

      this.props.removeTodo(this.props.todo.id, log);
      this.close();
    },

      // Todo Edit Function
    editTitle(e) {
      e.preventDefault();
      this.setState({
        editTitle: e.target.value
      })
    },

    editText(e) {
      e.preventDefault();
      this.setState({
        editText: e.target.value
      })
    },

    editImportance(e) {
      e.preventDefault();
      this.setState({
        editImportance: e.target.value
      })
    },

    editAddPlayer(e) {
      e.preventDefault();
      const number = Number(this.refs.newPlayerRatio.value);
      const name   = this.refs.newPlayerName.value;

      if ( name.length === 0 ) {
        window.alert('이름을 입력하십시요.');
      } else if ( Number.isNaN(number) || number > 100 ) {
        window.alert('기여도는 100이하의 숫자만 입력 가능합니다.')
      } else {
        let newAddPlayer = this.state.editPlayerRatio;
        newAddPlayer[name] = number;
        this.setState( { editPlayerRatio: newAddPlayer } );
      }
    },

    editSaveButton(e) {
      e.preventDefault();
      const id         = this.props.todo.id;
      const title      = this.state.editTitle;
      const text       = this.state.editText;
      const ratio      = this.state.editPlayerRatio;
      const player     = Object.keys(ratio);
      const editDate   = moment().format("YYYY-MM-DD hh:mm:ss a");
      const editAuthor = this.props.user.username;
      const importance = this.state.editImportance;

      let ratioCheckNum = 0;
      const ratioCheckKey = Object.keys(ratio);
      for (let i = 0; i < ratioCheckKey.length; i++) {
        ratioCheckNum = ratioCheckNum + Number(ratio[ratioCheckKey[i]]);
      }

      if( !title.length || !text.length ) {
        window.alert('모든 입력칸을 입력해주세요');
      } else if ( ratioCheckNum !== 100 ) {
        window.alert('참여자의 기여도 합은 100이 되어야 합니다');
      } else {
        this.props.editTodo(id, title, text, importance, ratio, player, editAuthor, editDate);
        this.todoEditClose();
      }
    },

    editRemovePlayer(e) {
      e.preventDefault();

      const player    = e.currentTarget.id;
      const removeObj = this.state.editPlayerRatio;
      delete removeObj[player];

      if ( Object.keys(removeObj).length === 0 ) {
        this.setState({
          editPlayerRatio : {}
        });
      } else {
        this.setState({
          editPlaterRatio : removeObj
        });
      }
    },

    render() {
        const { author, player, title, text, status, startdate, enddate, index, importance, ratio, editDate, editAuthor } = this.props.todo;
        
        let playerList = Object.keys(this.state.editPlayerRatio);

        // Status 표시
        let backgroundColorSelect;

        if ( status === "created" ) {
          backgroundColorSelect = "rgba(246,145,149,0.8)";
        } else if ( status === "progress" ) {
          backgroundColorSelect = "rgba(249,187,148,0.8)";
        } else if ( status === "completed" ) {
          backgroundColorSelect = "rgba(133,202,231,0.8)";
        }

        let todoCardTableHeadBox = {
          backgroundColor : backgroundColorSelect,
          fontSize        : "13px",
          color           : "white"
        }

        let showDetailHeaderBoxBackground = {
          backgroundColor : backgroundColorSelect
        }

        // Player Ratio 표시
        const colorData = [
          "246,145,149", "255,225,139", "132,212,201", "183,165,205", "249,187,148", "255,250,133", "133,202,231", "211,164,206", "253,202,149", "199,252,134", "134,172,211", "241,163,205"
        ];

        let playerRatioBar = Object.keys(ratio);
        let playerRatioBarStyle = {};

        for(let i = 0; i < playerRatioBar.length; i++) {
          playerRatioBarStyle[playerRatioBar[i%12]] = {
            backgroundColor : "rgba(" + colorData[i%12] + ",.2)",
            border          : "1px solid rgba(" + colorData[i%12] + ",1)", 
            width           : ratio[playerRatioBar[i%12]] + "%", 
            height          : "10px"
          };
        }
        
        const playerRatioTooltip = (player, ratio) => (
          <Tooltip id={player}>
            {player + ": " + ratio + "%"}
          </Tooltip>
        )
    
        return (
            <div className="todoItemCard">
              <table className="tableContainer">
                <thead style={todoCardTableHeadBox}>
                  <tr>
                    <th className="todo-card-table-head-index">No</th>
                    <th className="todo-card-table-head-title">제목</th>
                    <th className="todo-card-table-head-player">참여자</th>
                    <th className="todo-card-table-head-button">작업</th>
                  </tr>
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
                        return (
                          <OverlayTrigger key={i} overlay={tooltip}>
                            <span className="textCircle">{player[0]+player[1]}</span>
                          </OverlayTrigger>
                        )                                              
                      })}</td>
                    <td className="todo-card-table-body-button">
                      <DropdownButton title="" id="todo-card-table-body-button-show" pullRight>
                        <MenuItem onClick={this.todoInfoOpen}>자세히 보기</MenuItem>
                        <MenuItem onClick={this.open}><span className="deleteMenuText">삭제하기</span></MenuItem>
                      </DropdownButton>
                    </td>
                  </tr>
                </tbody>
              </table>

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
              <Modal show={this.state.showDetail} onHide={this.todoInfoClose} className="testModalWidth">
                  <Modal.Header style={showDetailHeaderBoxBackground} closeButton>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="TodoItemTitle" style={showDetailHeaderBoxBackground}>
                      <h3>{title}</h3>
                      <p>{player.map((player,i) => {
                        if(i === 0) {
                          return (
                            <span key={player}>{player+" "}</span>
                          )
                        } else {
                          return (
                            <span key={player}>{"| "+ player + " "}</span>
                          )
                        }
                      })}</p>
                      {editAuthor.length !== 0? <p className="todo-item-edit-text">최종수정: {moment(editDate, "YYYY-MM-DD").fromNow() + " by " + editAuthor}</p> : null}
                    </div>
                    <div className="TodoItemDetail">
                      <div className="TodoItemDetail-header">
                        <p className="TodoItemDetail-Task">Task</p>
                        <div onClick={this.todoEditOpen} className="todoFixIconBox">{svgIcon.fixIcon}</div>
                      </div>
                      
                      <hr/>
                      <div className="TodoItemDetail-Task-Description">
                        <div className="TodoItemDetail-Task-Description-Icon">{svgIcon.goalIcon}</div>
                        <div className="TodoItemDetail-Task-Description-Text">{text}</div> 
                      </div>
                      <div className="TodoItemDetail-Task-Description">
                        <div className="TodoItemDetail-Task-Description-Icon">{svgIcon.startDateIcon}</div>
                        <div className="TodoItemDetail-Task-Description-Time-Text">{startdate? startdate : "시작안됨" }</div>
                        <div className="TodoItemDetail-Task-Description-Icon">{svgIcon.endDateIcon}</div>
                        <div className="TodoItemDetail-Task-Description-Time-Text1">{enddate? enddate : "완료안됨"}</div>
                      </div>
                      <div className="TodoItemDetail-Task-Description">
                        <div className="TodoItemDetail-Task-Description-Icon">{svgIcon.importanceIcon}</div>
                        <div className="TodoItemDetail-Task-Description-Time-Text">{importance}</div>
                        <div className="TodoItemDetail-Task-Description-Icon">{svgIcon.authorIcon}</div>
                        <div className="TodoItemDetail-Task-Description-Time-Text1">{author}</div>
                      </div>
                      <div className="TodoItemDetail-Task-Description">
                        <div className="TodoItemDetail-Task-Description-Icon">{svgIcon.ratioIcon}</div>
                        <div className="TodoItemDetail-Task-Description-Ratio">
                          {player.map((player,i) => (
                            <OverlayTrigger key={i} overlay={playerRatioTooltip(player, ratio[player])} placement="top">
                              <div style={playerRatioBarStyle[player]}></div>
                            </OverlayTrigger>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <div className="buttonSelectorStyle">
                        <div className="prev-Button" onClick={this.handlePrev}>{"<<< 이전 단계로"}</div>
                        <div className="next-Button" onClick={this.handleNext}>{"다음 단계로 >>>"}</div>
                    </div>
                  </Modal.Footer>
                </Modal>

                {/* Show Todo Item Detail Modal */}
                <Modal show={this.state.showEdit} onHide={this.todoEditClose}>
                  <Modal.Header className="todo-edit-header-background" closeButton>
                    Edit To-Do
                  </Modal.Header>
                  <Modal.Body>
                    <div className="todo-edit-item-box">
                      <span className="todo-edit-subject">작성자</span>
                      <span className="todo-edit-username">{this.props.user.username}</span>
                    </div>
                    <div className="todo-edit-item-box">
                      <span className="todo-edit-subject">제목</span>
                      <input type="text" className="todo-edit-title-input" value={this.state.editTitle} onChange={this.editTitle}/>
                    </div>
                    <div className="todo-edit-item-box">
                      <span className="todo-edit-subject">중요도</span>
                      <FormControl componentClass="select" className="todo-edit-importance-select" placeholder="select" value={this.state.editImportance} onChange={this.editImportance}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                      </FormControl>
                    </div>
                    <div className="todo-edit-item-player-box">
                      <span className="todo-edit-subject">참여자</span>
                      <input className="todo-edit-newplayer-name" type="text" placeholder="참여자 이름" ref="newPlayerName"/>
                      <input className="todo-edit-newplayer-ratio" type="text" placeholder="참여자 기여도(%)" ref="newPlayerRatio"/>
                      <div className="todo-edit-newplayer-addbutton" onClick={this.editAddPlayer}> 
                        {svgIcon.addPlayerIcon}
                      </div>
                    </div>
                    <div className="todo-edit-item-box">
                      <div className="todo-edit-subject"></div>
                      <div className="todo-edit-player-box">
                      {playerList.map((player,i) => {
                        return (
                            <div className="todo-edit-player-pill" id={player} key={player} onClick={this.editRemovePlayer}>
                              <span>{player}</span>
                              <span>{" | "}</span>
                              <span>{this.state.editPlayerRatio[player]+ "%"}</span>
                            </div>
                        )
                      })}
                      </div>
                    </div>
                    <div className="todo-edit-item-text-box">
                      <span className="todo-edit-text-subject">해야할 일</span>
                      <textarea className="todo-edit-text" rows="6" value={this.state.editText} onChange={this.editText}></textarea>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <button className="todo-edit-save-button" onClick={this.editSaveButton}>변경저장</button>
                    <button className="todo-edit-close-button" onClick={this.todoEditClose}>close</button>
                  </Modal.Footer>
                </Modal>

            </div>
        );
    }
})

export default Todo;


