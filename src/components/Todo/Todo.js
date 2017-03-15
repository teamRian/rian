import React, { PropTypes } from 'react';
import { Table, Button, Modal, Tooltip, OverlayTrigger, Pager, DropdownButton, MenuItem, ProgressBar } from 'react-bootstrap';
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
      let changedAt = moment().format('YYYY-MM-DD hh:mm:ss a');
      let log = {};
      let logContent = {};

      if(this.props.todo.status === 'created') {
        changeStatus = 'progress';
        startdate = moment().format("YYYY-MM-DD");
        logContent["message"] = `${this.props.todo.title}이(가) 진행중으로 이동`;
        logContent["author"] = `${this.props.user.username}`;
      } else if (this.props.todo.status === 'progress'){
        changeStatus = 'completed';
        enddate = moment().format("YYYY-MM-DD");
        logContent['message'] = `${this.props.todo.title}이(가) 완료로 이동`;
        logContent['author'] =  `${this.props.user.username}`;
      } else {
        changeStatus = 'completed';
      }

      log[changedAt] = logContent;

      this.props.changeStatus(changeStatus, id, startdate ,enddate, log);
      this.detailClose();
    },
      // Prev Button
    handlePrev(e) {
      e.preventDefault();
      let changeStatus = '';
      let id = this.props.todo.id;
      let startdate = this.props.todo.startdate;
      let enddate = this.props.todo.enddate;
      let changedAt = moment().format('YYYY-MM-DD hh:mm:ss a');
      let log = {};
      let logContent = {};

      if(this.props.todo.status === 'progress') {
        changeStatus = 'created';
        startdate = "";
        logContent['message'] = `${this.props.todo.title}이(가) 준비로 이동`;
        logContent['author'] =  `${this.props.user.username}`;
      } else if (this.props.todo.status === 'completed'){
        changeStatus = 'progress';
        enddate = "";
        logContent['message'] = `${this.props.todo.title}이(가) 진행중으로 이동`;
        logContent['author'] =  `${this.props.user.username}`;
      } else {
        changeStatus = 'created';
      }

      log[changedAt] = logContent;

      this.props.changeStatus(changeStatus, id, startdate, enddate, log);
      this.detailClose();
    },
      // Remove Button
    handleRemove(e) {
      e.preventDefault();
      const removedAt = moment().format('YYYY-MM-DD hh:mm:ss a')
      const log = {};
      const logContent = {};
      logContent['message'] = `${this.props.todo.title}이(가) 진행중으로 이동`;
      logContent['author'] =  `${this.props.user.username}`;

      log[removedAt] = logContent;

      this.props.removeTodo(this.props.todo.id, log);
      this.close();
    },

    render() {
        const { author, player, title, text, status, startdate, enddate, index, importance, ratio } = this.props.todo;
        
        // Status 표시
        let backgroundColorSelect;

        if(status === "created") {
          backgroundColorSelect = "rgba(246,145,149,0.8)";
        } else if (status === "progress") {
          backgroundColorSelect = "rgba(249,187,148,0.8)";
        } else if (status === "completed") {
          backgroundColorSelect = "rgba(133,202,231,0.8)";
        }

        let todoCardTableHeadBox = {
          backgroundColor: backgroundColorSelect,
          fontSize: "13px",
          color: "white"
        }

        let showDetailHeaderBoxBackground = {
          backgroundColor: backgroundColorSelect
        }

        // Player Ratio 표시
        const colorData = [
          "246,145,149", "255,225,139", "132,212,201", "183,165,205", "249,187,148", "255,250,133", "133,202,231", "211,164,206", "253,202,149", "199,252,134", "134,172,211", "241,163,205"
        ];

        let playerRatioBar = Object.keys(ratio);
        let playerRatioBarArr = [];
        let playerRatioBarBackground = ['red', 'blue', 'green', 'yellow', 'black'];
        let playerRatioBarStyle = {};
        for(let i = 0; i < playerRatioBar.length; i++) {
          playerRatioBarStyle[playerRatioBar[i%12]] = {
            backgroundColor: "rgba(" + colorData[i%12] + ",.2)",
            border: "1px solid rgba(" + colorData[i%12] + ",1)", 
            width: ratio[playerRatioBar[i%12]] + "%", 
            height: "10px"
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
                        <MenuItem onClick={this.detailOpen}>자세히 보기</MenuItem>
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
              <Modal show={this.state.showDetail} onHide={this.detailClose} className="testModalWidth">
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
                    </div>
                    <div className="TodoItemDetail">
                      <div className="TodoItemDetail-header">
                        <p className="TodoItemDetail-Task">Task</p>
                        {fixIcon}  
                      </div>
                      
                      <hr/>
                      <div className="TodoItemDetail-Task-Description">
                        <div className="TodoItemDetail-Task-Description-Icon">{goalIcon}</div>
                        <div className="TodoItemDetail-Task-Description-Text">{text}</div>
                      </div>
                      <div className="TodoItemDetail-Task-Description">
                        <div className="TodoItemDetail-Task-Description-Icon">{startDateIcon}</div>
                        <div className="TodoItemDetail-Task-Description-Time-Text">{startdate? startdate : "시작안됨" }</div>
                        <div className="TodoItemDetail-Task-Description-Icon">{endDateIcon}</div>
                        <div className="TodoItemDetail-Task-Description-Time-Text1">{enddate? enddate : "완료안됨"}</div>
                      </div>
                      <div className="TodoItemDetail-Task-Description">
                        <div className="TodoItemDetail-Task-Description-Icon">{importanceIcon}</div>
                        <div className="TodoItemDetail-Task-Description-Time-Text">{importance}</div>
                        <div className="TodoItemDetail-Task-Description-Icon">{authorIcon}</div>
                        <div className="TodoItemDetail-Task-Description-Time-Text1">{author}</div>
                      </div>
                      <div className="TodoItemDetail-Task-Description">
                        <div className="TodoItemDetail-Task-Description-Icon">{ratioIcon}</div>
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
            </div>
        );
    }
})


const goalIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512" style={{enableBackground:"new 0 0 512 512"}} xmlSpace="preserve" width="15px" height="15px">
    <g>
      <g>
        <path d="M512,65.826l-76.797,10.969L446.175,0l-58.415,58.413c-39.762-27.068-87.789-42.898-139.518-42.898    C111.141,15.515,0,126.656,0,263.758S111.141,512,248.242,512c137.1,0,248.242-111.141,248.242-248.242    c0-51.729-15.83-99.758-42.898-139.52L512,65.826z M248.242,449.939c-102.825,0-186.182-83.357-186.182-186.182    S145.417,77.576,248.242,77.576c43.024,0,82.634,14.601,114.16,39.108l-44.406,44.406c-19.88-13.534-43.891-21.453-69.755-21.453    c-68.551,0-124.121,55.571-124.121,124.121s55.571,124.121,124.121,124.121s124.121-55.571,124.121-124.121    c0-25.864-7.919-49.875-21.453-69.755l44.406-44.406c24.508,31.527,39.107,71.137,39.107,114.16    C434.424,366.583,351.066,449.939,248.242,449.939z M237.728,274.271c9.087,9.089,23.824,9.089,32.914,0l34.749-34.749    c3.16,7.447,4.912,15.638,4.912,24.236c0,34.276-27.786,62.061-62.061,62.061s-62.061-27.785-62.061-62.061    s27.786-62.061,62.061-62.061c8.599,0,16.789,1.75,24.235,4.912l-34.749,34.749C228.641,250.446,228.641,265.182,237.728,274.271z" fill="#9e9e9e"/>
      </g>
    </g>
  </svg>
);

const startDateIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 16 16" style={{enableBackground:"new 0 0 16 16"}} xmlSpace="preserve" width="15px" height="15px">
    <g>
      <g>
        <path d="M8,0C3.5,0,0,3.5,0,8s3.5,8,8,8s8-3.5,8-8S12.5,0,8,0z M8,14c-3.5,0-6-2.5-6-6s2.5-6,6-6s6,2.5,6,6    S11.5,14,8,14z" fill="#9e9e9e"/>
        <polygon points="6,12 11,8 6,4   " fill="#9e9e9e"/>
      </g>
    </g>
  </svg>
);

const endDateIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="15px" height="15px" viewBox="0 0 450 450" style={{enableBackground:"new 0 0 450 450"}} xmlSpace="preserve">
    <g>
      <g>
        <path d="M87.945,75.913c-1.877-7.41-9.408-11.893-16.818-10.018c-7.413,1.879-11.897,9.409-10.019,16.821l90.439,356.838    c1.589,6.271,7.224,10.446,13.409,10.446c1.127,0,2.271-0.139,3.413-0.428c7.409-1.877,11.895-9.409,10.017-16.819L87.945,75.913z" fill="#9e9e9e"/>
        <path d="M388.98,176.419c-14.739-54.423-29.492-108.842-44.234-163.265c-1.598-5.891-4.399-12.21-14.929-12.842    C246.929-5.691,192.503,76.854,109.614,70.85c-6.541-0.806-10.745,2.6-9.148,8.491c14.743,54.422,29.372,108.877,44.233,163.266    c2.385,8.729,8.388,12.035,14.931,12.842c82.887,6.004,137.315-76.541,220.205-70.537    C386.375,185.716,390.577,182.311,388.98,176.419z M323.934,20.857c4.066,15.015,8.138,30.029,12.204,45.044    c-17.436,0.574-32.825,4.092-49.132,10.203c-4.065-15.015-8.137-30.03-12.202-45.044C291.109,24.951,306.498,21.43,323.934,20.857    z M153.13,189.197c-4.627-17.059-9.246-34.122-13.868-51.182c18.328-0.531,34.591-4.503,51.602-11.227    c-4.07-15.015-8.138-30.03-12.204-45.045c16.629-7.433,32.314-16.332,48.022-25.523c4.066,15.014,8.138,30.029,12.205,45.044    c-15.709,9.19-31.395,18.092-48.023,25.524c4.623,17.06,9.244,34.122,13.866,51.182    C187.718,184.693,171.457,188.665,153.13,189.197z M217.114,223.674c-4.129-15.234-8.256-30.47-12.384-45.706    c16.513-7.377,32.087-16.201,47.683-25.327c4.128,15.236,8.256,30.471,12.383,45.707    C249.202,207.475,233.626,216.297,217.114,223.674z M252.75,152.445c-4.619-17.061-9.242-34.122-13.863-51.183    c15.706-9.17,31.403-17.945,48.119-25.157c4.624,17.06,9.246,34.121,13.867,51.181C284.16,134.5,268.458,143.274,252.75,152.445z     M313.545,172.876c-4.129-15.234-8.256-30.47-12.385-45.706c16.211-6.045,31.521-9.521,48.843-10.086    c4.129,15.236,8.257,30.471,12.386,45.705C345.066,163.355,329.754,166.83,313.545,172.876z" fill="#9e9e9e"/>
      </g>
    </g>
  </svg>
);

const authorIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 964.07 964.07" style={{enableBackground:"new 0 0 964.07 964.07"}} xmlSpace="preserve" width="15px" height="15px">
    <g>
      <path d="M850.662,877.56c-0.77,0.137-4.372,0.782-10.226,1.831c-230.868,41.379-273.337,48.484-278.103,49.037   c-11.37,1.319-19.864,0.651-25.976-2.042c-3.818-1.682-5.886-3.724-6.438-4.623c0.268-1.597,2.299-5.405,3.539-7.73   c1.207-2.263,2.574-4.826,3.772-7.558c7.945-18.13,2.386-36.521-14.51-47.999c-12.599-8.557-29.304-12.03-49.666-10.325   c-12.155,1.019-225.218,36.738-342.253,56.437l-57.445,45.175c133.968-22.612,389.193-65.433,402.622-66.735   c11.996-1.007,21.355,0.517,27.074,4.4c3.321,2.257,2.994,3.003,2.12,4.997c-0.656,1.497-1.599,3.264-2.596,5.135   c-3.835,7.189-9.087,17.034-7.348,29.229c1.907,13.374,11.753,24.901,27.014,31.626c8.58,3.78,18.427,5.654,29.846,5.654   c4.508,0,9.261-0.292,14.276-0.874c9.183-1.065,103.471-17.67,280.244-49.354c5.821-1.043,9.403-1.686,10.169-1.821   c9.516-1.688,15.861-10.772,14.172-20.289S860.183,875.87,850.662,877.56z" fill="#9e9e9e"/>
      <path d="M231.14,707.501L82.479,863.005c-16.373,17.127-27.906,38.294-33.419,61.338l211.087-166.001   c66.081,29.303,118.866,38.637,159.32,38.637c71.073,0,104.065-28.826,104.065-28.826c-66.164-34.43-75.592-98.686-75.592-98.686   c50.675,21.424,156.235,46.678,156.235,46.678c140.186-93.563,213.45-296.138,213.45-296.138   c-14.515,3.99-28.395,5.652-41.475,5.652c-65.795,0-111-42.13-111-42.13l183.144-39.885C909.186,218.71,915.01,0,915.01,0   L358.176,495.258C295.116,551.344,250.776,625.424,231.14,707.501z" fill="#9e9e9e"/>
    </g>
  </svg>
);

const importanceIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512" style={{enableBackground:"new 0 0 512 512"}} xmlSpace="preserve" width="15px" height="15px">
    <g>
      <g>
        <path d="M505.403,406.394L295.389,58.102c-8.274-13.721-23.367-22.245-39.39-22.245c-16.023,0-31.116,8.524-39.391,22.246    L6.595,406.394c-8.551,14.182-8.804,31.95-0.661,46.37c8.145,14.42,23.491,23.378,40.051,23.378h420.028    c16.56,0,31.907-8.958,40.052-23.379C514.208,438.342,513.955,420.574,505.403,406.394z M477.039,436.372    c-2.242,3.969-6.467,6.436-11.026,6.436H45.985c-4.559,0-8.784-2.466-11.025-6.435c-2.242-3.97-2.172-8.862,0.181-12.765    L245.156,75.316c2.278-3.777,6.433-6.124,10.844-6.124c4.41,0,8.565,2.347,10.843,6.124l210.013,348.292    C479.211,427.512,479.281,432.403,477.039,436.372z" fill="#9e9e9e"/>
      </g>
    </g>
    <g>
      <g>
        <path d="M256.154,173.005c-12.68,0-22.576,6.804-22.576,18.866c0,36.802,4.329,89.686,4.329,126.489    c0.001,9.587,8.352,13.607,18.248,13.607c7.422,0,17.937-4.02,17.937-13.607c0-36.802,4.329-89.686,4.329-126.489    C278.421,179.81,268.216,173.005,256.154,173.005z" fill="#9e9e9e"/>
      </g>
    </g>
    <g>
      <g>
        <path d="M256.465,353.306c-13.607,0-23.814,10.824-23.814,23.814c0,12.68,10.206,23.814,23.814,23.814    c12.68,0,23.505-11.134,23.505-23.814C279.97,364.13,269.144,353.306,256.465,353.306z" fill="#9e9e9e"/>
      </g>
    </g>
  </svg>
);

const ratioIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512.003 512.003" style={{enableBackground:"new 0 0 512.003 512.003"}} xmlSpace="preserve" width="15px" height="15px">
    <g>
      <g>
        <path d="M509.605,171.075l-99.3-99.301c-3.193-3.194-8.37-3.194-11.565,0l-49.65,49.65c-1.533,1.533-2.394,3.613-2.394,5.782    c0,2.169,0.861,4.249,2.394,5.782l4.953,4.953l-11.382,11.38c-7.389,7.386-18.854,9.402-28.528,5.011    c-9.07-4.117-19.153-6.292-29.161-6.292c-11.883,0-23.496,2.983-33.814,8.633c-4.303-1.06-8.719-1.603-13.179-1.603    c-6.45,0-12.785,1.113-18.829,3.31c-9.651,3.506-19.996,1.333-27.003-5.672L171.71,132.27l2.434-2.434    c1.533-1.533,2.394-3.613,2.394-5.782c0-2.169-0.861-4.249-2.394-5.782l-49.65-49.65c-3.195-3.194-8.371-3.194-11.565,0    L2.395,179.156c-3.193,3.194-3.193,8.371,0,11.564l49.649,49.65c1.534,1.534,3.613,2.395,5.783,2.395s4.248-0.861,5.783-2.395    l2.961-2.961l14.414,14.414c3.637,3.637,6.048,8.178,6.971,13.131c4.786,25.683,17.086,49.032,35.57,67.526l2.715,2.715    c-5.214,5.491-8.082,12.645-8.082,20.245c0,7.861,3.062,15.252,8.62,20.811c5.738,5.738,13.273,8.606,20.811,8.606    c0.491,0,0.98-0.013,1.471-0.038c-0.398,8.019,2.458,16.17,8.568,22.282c5.559,5.559,12.95,8.62,20.811,8.62    c0.219,0,0.437-0.011,0.656-0.016c-0.168,7.749,2.691,15.552,8.591,21.453c5.559,5.56,12.95,8.62,20.812,8.62    c7.861,0,15.251-3.062,20.811-8.62c0.468-0.468,0.909-0.952,1.34-1.442c2.895,1.009,5.957,1.546,9.052,1.546    c7.353,0,14.261-2.865,19.441-8.062c2.757-2.756,4.849-5.998,6.211-9.529l0.837,0.837c5.359,5.359,12.398,8.039,19.437,8.039    c7.039,0,14.078-2.68,19.437-8.039c2.848-2.848,4.988-6.211,6.344-9.878c4.797,3.489,10.476,5.236,16.158,5.236    c7.039,0,14.082-2.679,19.446-8.036c5.191-5.191,8.05-12.097,8.05-19.445c0-2.22-0.266-4.397-0.773-6.502    c5.237-1.064,10.049-3.635,13.91-7.501c5.191-5.191,8.05-12.094,8.05-19.437c0-5.785-1.782-11.292-5.073-15.91l6.56-6.56    c18.699-18.708,31.052-42.35,35.725-68.371c0.783-4.357,2.941-8.404,6.243-11.707l24.398-24.398l4.289,4.289    c1.597,1.597,3.69,2.395,5.783,2.395c2.092,0,4.186-0.798,5.783-2.395l49.65-49.65c1.533-1.533,2.394-3.613,2.394-5.782    S511.138,172.609,509.605,171.075z M57.827,223.025l-38.086-38.086L118.71,85.97l38.087,38.086L57.827,223.025z M156.836,364.689    c-5.097,5.096-13.392,5.098-18.493,0c-2.47-2.471-3.83-5.754-3.83-9.247c0-3.492,1.361-6.776,3.831-9.246    c2.549-2.549,5.896-3.824,9.245-3.824c3.348,0,6.698,1.275,9.246,3.824C161.933,351.294,161.933,359.59,156.836,364.689z     M187.684,395.537c-2.468,2.471-5.751,3.83-9.246,3.83c-3.492,0-6.776-1.361-9.245-3.83c-5.099-5.098-5.099-13.394,0-18.493    c2.549-2.549,5.896-3.824,9.246-3.824c3.347,0,6.697,1.275,9.245,3.824C192.784,382.142,192.784,390.439,187.684,395.537z     M217.742,425.594c-2.47,2.47-5.753,3.83-9.245,3.83c-3.493,0-6.777-1.361-9.246-3.83c-5.099-5.098-5.099-13.394,0-18.493    c2.549-2.549,5.896-3.824,9.246-3.824c3.347,0,6.697,1.275,9.245,3.824C222.841,412.2,222.841,420.496,217.742,425.594z     M356.63,362.822c-2.102,2.104-4.897,3.263-7.869,3.263s-5.767-1.159-7.873-3.268l-79.33-79.312    c-3.196-3.193-8.372-3.192-11.565,0.002c-3.192,3.193-3.191,8.371,0.002,11.564l85.451,85.442c2.103,2.102,3.26,4.898,3.26,7.872    c0,2.98-1.158,5.779-3.257,7.878c-4.347,4.343-11.416,4.344-15.756,0.003l-14.416-14.416c-0.08-0.083-0.158-0.167-0.241-0.249    c-0.024-0.024-0.051-0.045-0.076-0.069l-66.267-66.267c-3.195-3.193-8.371-3.193-11.565,0c-3.194,3.193-3.194,8.371,0,11.564    l66.48,66.479c2.032,2.083,3.151,4.839,3.151,7.763c0,2.974-1.159,5.77-3.261,7.872c-4.338,4.341-11.401,4.341-15.743,0    l-72.085-72.086c-3.195-3.194-8.371-3.194-11.565,0c-3.194,3.193-3.194,8.371,0,11.564l53.434,53.435    c0.015,0.015,0.027,0.032,0.043,0.046c2.101,2.097,3.257,4.888,3.257,7.859c0,2.973-1.158,5.769-3.269,7.88    c-2.099,2.104-4.893,3.263-7.87,3.263c-0.719,0-1.422-0.074-2.11-0.204c1.323-8.913-1.436-18.32-8.282-25.167    c-5.559-5.558-12.95-8.62-20.811-8.62c-0.219,0-0.437,0.011-0.656,0.016c0.168-7.749-2.69-15.552-8.591-21.453    c-5.56-5.558-12.95-8.62-20.812-8.62c-0.492,0-0.981,0.012-1.469,0.036c0.393-8.014-2.463-16.158-8.57-22.266    c-7.434-7.433-17.884-10.044-27.444-7.847l-5.864-5.864c-16.14-16.147-26.878-36.535-31.057-58.96    c-1.531-8.213-5.502-15.717-11.483-21.699l-14.415-14.415l82.01-82.01l20.438,20.438c7.856,7.856,18.552,12.06,29.507,12.06    c4.906,0,9.867-0.844,14.646-2.581c2.318-0.843,4.715-1.448,7.144-1.832l-50.632,50.633c-6.195,6.194-9.607,14.43-9.607,23.191    c0,8.76,3.412,16.996,9.606,23.19c6.394,6.394,14.79,9.59,23.19,9.589c8.398,0,16.797-3.198,23.192-9.589l25.43-25.43l6.883,6.888    c0.002,0.002,0.003,0.003,0.005,0.005l0.286,0.286l0.275,0.275c0.001,0.001,0.003,0.003,0.005,0.004l0.005,0.005    c0.079,0.078,0.156,0.152,0.233,0.226l95.881,95.881c2.103,2.102,3.26,4.898,3.26,7.872    C359.893,357.921,358.736,360.717,356.63,362.822z M408.137,240.834c-5.674,5.675-9.4,12.723-10.774,20.381    c-4.08,22.72-14.867,43.364-31.193,59.698l-6.284,6.285l-51.731-51.731c1.124,0.083,2.253,0.138,3.39,0.138    c5.238,0,10.598-0.918,15.934-3.101c4.18-1.71,6.182-6.485,4.472-10.664c-1.71-4.179-6.481-6.182-10.664-4.472    c-21.046,8.611-46.278-15.12-49.087-17.855c-0.047-0.046-0.094-0.091-0.142-0.135l-0.29-0.29    c-0.001-0.001-0.002-0.001-0.003-0.002l-0.253-0.252c-0.001-0.001-0.003-0.003-0.005-0.004l-6.884-6.889l7.806-7.807    c3.195-3.194,3.195-8.371,0.001-11.565c-3.194-3.192-8.371-3.193-11.564,0l-13.57,13.57c-0.005,0.005-0.011,0.01-0.016,0.015    c-0.005,0.005-0.01,0.011-0.015,0.016l-31.2,31.2c-6.412,6.411-16.842,6.409-23.252,0c-3.105-3.105-4.815-7.234-4.815-11.626    c0-4.392,1.71-8.521,4.816-11.626l53.852-53.854c2.996-2.995,6.326-5.63,9.905-7.837c8.503-5.256,18.324-8.034,28.401-8.034    c7.693,0,15.439,1.67,22.403,4.831c15.842,7.188,34.671,3.839,46.851-8.338l11.383-11.381l66.929,66.929L408.137,240.834z     M454.172,214.944l-87.736-87.736l38.087-38.086l87.736,87.736L454.172,214.944z" fill="#9e9e9e"/>
      </g>
    </g>
    <g>
      <g>
        <circle cx="462.41" cy="183.11" r="8.177" fill="#9e9e9e"/>
      </g>
    </g>
    <g>
      <g>
        <circle cx="53.567" cy="191.189" r="8.177" fill="#9e9e9e"/>
      </g>
    </g>
  </svg>
);

const fixIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="15px" height="15px" viewBox="0 0 495.555 495.555" style={{enableBackground:"new 0 0 495.555 495.555", marginTop: "10px"}} xmlSpace="preserve">
    <g>
      <g>
        <path d="M427.783,164.441l-52.929-11.819l-19.526-50.585l62.807-72.904c-31.662-5.652-65.398,4.982-87.908,31.116    c-25.054,29.089-29.128,69.08-13.703,101.688c-0.287,0.315-0.631,0.545-0.918,0.87l-59.135,68.649l52.164,56.658l64.929-75.372    c0.277-0.325,0.459-0.698,0.727-1.033c34.53,10.424,73.479,0.469,98.532-28.611c22.511-26.134,28.037-61.066,17.758-91.542    L427.783,164.441z" fill="#E0E0E0"/>
        <path d="M106.531,405.513c-12.928,15.004-11.236,37.647,3.768,50.576l3.625,3.117c15.003,12.929,37.647,11.236,50.576-3.768    l81.319-94.401l-52.164-56.657L106.531,405.513z" fill="#E0E0E0"/>
        <path d="M302.352,295.4l-52.163-56.659l-68.926-74.855c-0.287-0.315-0.65-0.526-0.947-0.832c0.669-1.549,1.282-3.127,1.865-4.705    c0.593-1.616,1.147-3.242,1.654-4.877c9.572-30.973,2.964-66.039-20.578-91.608c-23.361-25.379-57.433-34.894-88.884-28.2    l65.178,70.792l-17.844,51.207l-52.508,13.56L4.021,98.432c-9.266,30.801-2.591,65.532,20.779,90.911    c23.533,25.551,57.911,35.037,89.553,28.065c1.683-0.372,3.366-0.783,5.03-1.243c1.625-0.449,3.242-0.927,4.848-1.472    c0.277,0.324,0.469,0.688,0.755,1.004l74.941,81.386l52.163,56.658l89.878,97.614c7.067,7.679,16.716,11.57,26.393,11.57    c8.684,0,17.385-3.137,24.279-9.477l3.52-3.241c14.573-13.416,15.51-36.099,2.094-50.672L302.352,295.4z" fill="#E0E0E0"/>
      </g>
    </g>
  </svg>
)

export default Todo;

