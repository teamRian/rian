import React from 'react';
import { FormControl, Button , Modal, Tooltip, OverlayTrigger } from 'react-bootstrap';
import moment from 'moment';
import './TodoAdd.css';

class TodoAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      addPlayer: "",
      addRatio: 0,
      playerRatio: {}
    }

    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.handleAddPlayer = this.handleAddPlayer.bind(this);
    this.handleRemovePlayer = this.handleRemovePlayer.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Modal Control
  close() {
    this.setState({ 
      showModal: false 
    });
  }

  open() {
    this.setState({ 
      showModal: true 
    });
  }

  handleAddPlayer(e) {
    e.preventDefault();
    const addPlayerName = this.refs.playername.value;
    const addPlayerRatio = this.refs.playerratio.value;
    const addPlayerObj = this.state.playerRatio;
    addPlayerObj[addPlayerName] = addPlayerRatio;

    this.setState({
      playerRatio: addPlayerObj
    });

    this.state.addPlayer = "";
    this.state.addRatio = 0;
  }

  handleRemovePlayer(e) {
    e.preventDefault();
    delete this.state.playerRatio[e.currentTarget.id];
    this.setState({
      playerRatio: this.state.playerRatio
    });
  }

  handleSubmit(e) {
      e.preventDefault();

      const author = this.props.user.username;
      const player = Object.keys(this.state.playerRatio);
      const title = this.refs.title.value;
      const text = this.refs.text.value;
      const ratio = this.state.playerRatio;
      const index = this.props.index + 1; // next index
      const newId = this.props.id + '_' + index;
      const importance = Number(this.importance.value);
      const createdAt = moment().format('YYYY-MM-DD hh:mm:ss a');
      const log = {};
      const logContent = {};

      logContent["message"] = `${title}가 준비되었습니다`;
      logContent["author"] = `${author}`;
      
      log[createdAt] = logContent;

      let checkHundredPercent = 0;
      for(let i = 0; i < player.length; i++) {
        checkHundredPercent = checkHundredPercent + Number(ratio[player[i]]);
      }

      if(author.length === 0 || player.length ===0 || text.length === 0 || title.length === 0 || !importance) {
        alert("모든 입력칸을 채우셔야 합니다!!!");
      } else if(checkHundredPercent !== 100) {
        alert("참여자 기여도의 합산이 100이어야 합니다.");
      } else {
        this.props.addTodo(newId, author, player, title, text, importance, index, log, ratio)
        this.state.addPlayer = "";
        this.state.addRatio = 0;
        this.state.playerRatio = {};
        this.close();
      }
  }

  render() {

    const wrap = {
      padding: "5px 5px"
    }

    const addPlayerArr = Object.keys(this.state.playerRatio);

    return (
      <div style={wrap}>
        <OverlayTrigger overlay={tooltip} placement="bottom">
          {addButton(this.open)}
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
            
            <div>
              <div>
                <form className="addPlayerContainer">
                  <div className="addTitleWidth">
                    <input type="text" className="addPlayerNameInput" required ref="title"/>
                    <span className="addPlayerNameHighlight"></span>
                    <span className="addPlayerNameBar"></span>
                    <label className="addPlayerNameLabel">제목을 입력하세요</label>
                  </div>
                </form>
              </div>
            </div>

            <div>
              <div>
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
                  <div onClick={this.handleAddPlayer}>{addPlayerIcon}</div>
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
              </div>
            </div>
            
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

const addButton = (open) => (
  <svg onClick={open} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        viewBox="0 0 508 508" style={{enableBackground:"new 0 0 508 508"}} xmlSpace="preserve" width="40px" height="40px">
      <circle style={{fill:"#4CDBC4"}} cx="254" cy="254" r="254"/>
      <path style={{fill:"#F9B54C"}} d="M254.4,322.8C254,322.8,254,322.8,254.4,322.8c-0.4,0-0.4,0-0.4,0c-60.8-29.6-54-68-54-68
          c0-0.8,0-1.2,0.4-2c0.4,0.4,0.8,0.8,1.2,1.6c14,21.6,32.4,36.8,52.8,36.8s38.8-14.8,52.8-36.8c0.4-0.4,0.8-0.8,1.2-1.2
          c0,0.4,0.4,1.2,0.4,1.6c0,0,0,0.4,0,0.8C309.2,261.6,309.6,296,254.4,322.8z"/>
      <path style={{fill:"#F1543F"}} d="M254.4,322.8C254,322.8,254,322.8,254.4,322.8c-0.4,0-0.4,0-0.4,0H254.4z"/>
      <path style={{fill:"#324A5E"}} d="M254,508c82,0,154.4-38.8,200.8-98.8l-26-80l-109.2-52.8c0,18.8-0.8,51.2-6.8,92.8
          c-13.6-42.8-58.8-46.4-58.8-46.4s-45.2,3.6-58.8,46.4c-6-41.6-6.8-74.4-6.8-92.8L78.8,329.2l-26,80C99.6,469.2,172,508,254,508z"/>
      <g>
          <path style={{fill:"#FFFFFF"}} d="M308.4,254.8c0,0,6.8,38.4-54.4,68.4c0,0,45.6,3.6,58.8,46.4C313.6,370.8,338.4,277.6,308.4,254.8z"
              />
          <path style={{fill:"#FFFFFF"}} d="M199.6,254.8c0,0-6.8,38.4,54.4,68.4c0,0-45.6,3.6-58.8,46.4C194.4,370.8,169.6,277.6,199.6,254.8z"
              />
      </g>
      <g>
          <path style={{fill:"#FFD05B"}} d="M316.8,236L316.8,236c-14.8,31.2-37.2,54.8-62.8,54.8c-27.6,0-51.6-27.6-66.4-62.4
              c-5.6-0.4-12-4.8-15.2-12c-3.6-7.2-3.2-14.8,0-19.6c6.8,18.4,15.2,30.8,15.2,30.8c-19.6-45.6,15.2-98.8,15.2-98.8
              c53.6,13.6,76.4-2.8,76.4-2.8c39.2-6.4,43.6,18.8,42.4,35.2c-0.4,9.2,0.4,18,1.6,27.2C326,211.2,318.4,232.8,316.8,236z"/>
          <path style={{fill:"#FFD05B"}} d="M335.6,216.4c-3.2,6.4-8,10.8-13.2,12c4-6.4,9.6-16,14.8-28C338.8,204.8,338.4,210.8,335.6,216.4z"
              />
      </g>
      <g>
          <path style={{fill:"#324A5E"}} d="M254,46.4c0,0,35.2,1.2,66.4,30.4c68.4,64.4-3.6,159.6-3.6,159.6s9.2-23.2,6.4-47.6
              c-1.2-9.2-2-18-1.6-27.2c1.2-16-3.2-41.6-42.4-35.2c0,0-22.8,16.8-76.4,2.8c0,0-34.8,53.2-15.2,98.8c0,0-57.6-86.8,3.2-142
              l-18.4,3.6c0,0,22.8-41.6,68-27.2c0,0-4.4-7.2-18.4-11.2c0,0,20.4-8.8,32,5.6C254,56.8,260.8,51.2,254,46.4z"/>
          <path style={{fill:"#324A5E"}} d="M322.4,228.4c-2.8,4.4-4.8,7.2-5.6,8l0,0c0,0,0,0,0-0.4c1.2-2.4,2.4-4.8,3.2-7.6
              C320.8,228.4,321.6,228.4,322.4,228.4z"/>
      </g>
      <circle style={{fill:"#FFFFFF"}} cx="407.2" cy="324" r="57.2"/>
      <path style={{fill:"#FF7058"}} d="M441.2,314.8H416v-25.2c0-5.2-4-9.2-9.2-9.2s-9.2,4-9.2,9.2v25.2h-25.2c-5.2,0-9.2,4-9.2,9.2
          s4,9.2,9.2,9.2h25.2V358c0,5.2,4,9.2,9.2,9.2s9.2-4,9.2-9.2v-25.2h25.2c5.2,0,9.2-4,9.2-9.2C450.4,318.8,446.4,314.8,441.2,314.8z"
          />
    </svg>
);

const addPlayerIcon = (
  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
   viewBox="0 0 417.118 417.118" style={{enableBackground:"new 0 0 417.118 417.118"}} xmlSpace="preserve" width="25px" height="25px">
    <g>
      <g>
        <g>
          <g id="XMLID_16_">
            <g>
              <path style={{fill:"#FCD09F"}} d="M176.505,0c46.66,0,84.49,37.82,84.49,84.48c0,46.67-37.83,110.49-84.49,110.49
                s-84.49-63.82-84.49-110.49C92.015,37.82,129.845,0,176.505,0z"/>
            </g>
          </g>
        </g>
        <circle style={{fill:"#EF806F"}} cx="303.365" cy="327.118" r="90"/>
        <g>
          <rect x="241.14" y="319.618" style={{fill:"#FFFFFF"}} width="124.451" height="15"/>
        </g>
        <g>
          <rect x="295.865" y="264.893" style={{fill:"#FFFFFF"}} width="15" height="124.451"/>
        </g>
      </g>
      <path style={{fill:"#1EA6C6"}} d="M199.363,327.118c0,21.69,6.67,41.85,18.09,58.54c-13.28,2.42-26.97,3.68-40.95,3.68
        c-58.79,0-112.38-22.3-152.75-58.91v-0.13c0-60.89,35.63-113.45,87.17-137.98c19.37,19.32,42.05,29.73,65.58,29.73
        c23.54,0,46.21-10.41,65.59-29.73c16.76,7.98,31.84,18.92,44.54,32.15C237.213,232.488,199.363,275.468,199.363,327.118z"/>
    </g>
  </svg>
);

export default TodoAdd;
