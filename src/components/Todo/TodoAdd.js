import React from 'react';
import { FormControl, Button , Modal, Tooltip, OverlayTrigger } from 'react-bootstrap';
import moment from 'moment';

// Import ICON
import svgIcon from './svgIcon';

// Import CSS
import './TodoAdd.css';

class TodoAdd extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        showModal : false,
        addPlayer : "",
         addRatio : 0,
      playerRatio : {}
    }

    // Modal Control
    this.close = this.close.bind(this);
    this.open  = this.open.bind(this);

    // Other Functions    
    this.handleAddPlayer    = this.handleAddPlayer.bind(this);
    this.handleRemovePlayer = this.handleRemovePlayer.bind(this);
    this.handleSubmit       = this.handleSubmit.bind(this);
  }

  // Modal Control Action
  close() { this.setState( { showModal : false } ); }
   open() { this.setState( { showModal : true  } ); }

  // Other Functions
    // Add Player
  handleAddPlayer(e) {
    e.preventDefault();

    const addPlayerName  = this.refs.playername.value;
    const addPlayerRatio = this.refs.playerratio.value;
    
    const addPlayerObj   = this.state.playerRatio;
          addPlayerObj[addPlayerName] = addPlayerRatio;

    this.setState({
      playerRatio : addPlayerObj,
        addPlayer : "",
         addRatio : 0
    });
  }

    // Remove Player
  handleRemovePlayer(e) {
    e.preventDefault();
    delete this.state.playerRatio[e.currentTarget.id];
    this.setState({
      playerRatio : this.state.playerRatio
    });
  }

    // Save Todo
  handleSubmit(e) {
      e.preventDefault();

      const author     = this.props.user.username;
      const title      = this.refs.title.value;
      const text       = this.refs.text.value;
      const ratio      = this.state.playerRatio;
      const player     = Object.keys(this.state.playerRatio);
      const index      = this.props.index + 1; // next index
      const newId      = this.props.id + '_' + index;
      const importance = Number(this.importance.value);
      const createdAt  = moment().format('YYYY-MM-DD hh:mm:ss a');
      
      const log = {};
      const logContent = {};

      logContent["message"] = `${title}가 준비되었습니다`;
      logContent["author"]  = `${author}`;
      
      log[createdAt] = logContent;

      let checkHundredPercent = 0;
      for ( let i = 0; i < player.length; i++ ) {
        checkHundredPercent = checkHundredPercent + Number( ratio[ player[i] ] );
      }

      if ( author.length === 0 || player.length === 0 || text.length === 0 || title.length === 0 || !importance ) {
        window.alert("모든 입력칸을 채우셔야 합니다!!!");
      } else if ( checkHundredPercent !== 100 ) {
        window.alert("참여자 기여도의 합산이 100이어야 합니다.");
      } else {
        this.props.addTodo(newId, author, player, title, text, importance, index, log, ratio);
        // state 초기화
        this.state.addPlayer   = "";
        this.state.addRatio    = 0;
        this.state.playerRatio = {};
        // modal 닫기
        this.close();
      }
  }

  render() {

    const addPlayerArr = Object.keys(this.state.playerRatio);

    return (
      <div className="todo-add-box-wrap">
        <OverlayTrigger overlay={tooltip} placement="bottom">
          {svgIcon.addButton(this.open)}
        </OverlayTrigger>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header className="addTodoHeader" closeButton>
            <Modal.Title>Add To-Do</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="testAuthorBox">
              <p className="testTitleStyle">작성자</p>
              <p className="testTitleStyle2">{this.props.user.username ? this.props.user.username: "로그인하면 보여주기~~"}</p>
            </div>
            
            <form className="addPlayerContainer">
              <div className="addTitleWidth">
                <input type="text" className="addPlayerNameInput" required ref="title"/>
                <span className="addPlayerNameHighlight"></span>
                <span className="addPlayerNameBar"></span>
                <label className="addPlayerNameLabel">제목을 입력하세요</label>
              </div>
            </form>

            <form className="addPlayerContainer1">
              <div>
                <input type="text" className="addPlayerNameInput" required ref="playername"/>
                <span className="addPlayerNameHighlight"></span>
                <span className="addPlayerNameBar"></span>
                <label className="addPlayerNameLabel2">참여자를 추가하세요(이름)</label>
              </div>
              <div className="addPlayterRatioBox">
                <input type="text" className="addPlayerNameInput" required ref="playerratio"/>
                <span className="addPlayerNameHighlight"></span>
                <span className="addPlayerNameBar"></span>
                <label className="addPlayerNameLabel3">기여도를 추가하세요(%)</label>
              </div>
              <div onClick={this.handleAddPlayer}>{svgIcon.addPlayerIcon}</div>
              <span className="editTagWarningText">* 참여자를 클릭하시면 삭제됩니다.</span>
            </form>
            <ul className="addPlayerList">
              {addPlayerArr.length === 0 ? "" : <li>참여자</li>}
              {addPlayerArr.length === 0 ? "" : addPlayerArr.map((player,i) => (
                <li className="addPlayerItem" id={player} key={player} onClick={this.handleRemovePlayer}>
                  <span>{player}</span><span className="textSeparator">{" | "}</span><span>{this.state.playerRatio[player]+"%"}</span>
                </li>
              ))}
            </ul> 
            
            <div className="addPlayerContainer2">
              <span>중요도</span>
              <FormControl componentClass="select" placeholder="select" inputRef={ref => { this.importance = ref; }}>
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

            <div>
              <div className="addPlayerContainer3">해야할 일</div>
              <textarea className="alignTextarea" rows="6" placeholder="할일을 입력하세요" ref="text"></textarea>
            </div>

          </Modal.Body>
          <Modal.Footer>
            <Button bsClass="todo-add-savebutton" onClick={this.handleSubmit}>저장하기</Button>
            <Button bsClass="todo-add-closebutton" onClick={this.close}>취소하기</Button>
          </Modal.Footer>
            </Modal>
        </div>
      );
  }
};

const tooltip = (
  <Tooltip id="todoAdd">
    Todo 추가하기
  </Tooltip>
);

export default TodoAdd;
