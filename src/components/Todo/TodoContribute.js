import React from 'react'
import { ProgressBar, Button } from 'react-bootstrap';

// Import CSS
import '../../styles/TodoContribute.css';

class TodoContribute extends React.Component {
  constructor(props) {
      super(props);
      this.state ={
        showToggle: false, //SHOW HISTORY
      }
      this.toggle = this.toggle.bind(this);
  }

  // SHOW HISTORY BUTTON ACTION
  toggle() {
    this.setState({
      showToggle: !this.state.showToggle
    })
  }

  render() {
    // Todo에 참여한 사람의 개별 ID
    const key = Object.keys(this.props.list)[0];
    // Project 전체에서 해당 ID가 기여한 Percentage
    const value = Math.round(this.props.list[key].value / this.props.total * 100);

    // TODO별 내가 참여한 정보
    const partItem = data => {
      return data.map((item,i) => {

        // 완료된 item에 대한 개별 기여점수
        let point = Math.ceil(item.ratio/100 * item.importance);
        
        return (
          <tr key={i}>
            <td className="todo-contribute-box-body">{item.title}</td>
            <td className="todo-contribute-box-body">{point + "("+item.importance+")"}</td>
            <td className="todo-contribute-box-body">{item.ratio + '%'}</td>
          </tr>
        )
      })
    }

    const percentBar = {
      textAlign: "center",
      color: "white",
      width: value + "%",
      backgroundColor: this.props.color,
      borderRadius: "4px",
      fontSize: "12px"
    }

    const totalBackground = {
      backgroundColor: this.props.color,
      color: "white"
    }

    const leftCell = {
      width: "20%",
      textAlign: "center"
    }

    const centerCell = {
      width: "60%"
    }

    const rightCell = {
      width: "20%",
      textAlign: "center"
    }


    return (
        <div className="todo-contribute-container">
          <div className="todo-contribute-title">
            <div style={leftCell}>{key}</div>
            <div style={centerCell}>
              <div className="percentBox">
                <div style={percentBar}>
                  {value + '%'}
                </div>
              </div>
            </div>
            <div className="show-history-text" style={rightCell} onClick={this.toggle}>
              {this.state.showToggle ? "Close History" : "Show History"}
            </div>
          </div>
          {this.state.showToggle ?
            <table className="todo-contribute-box slideDown">
              <thead>
                <tr>
                  <td className="todo-contribute-box-header todo-contribute-box-header-left">To-Do</td>
                  <td className="todo-contribute-box-header todo-contribute-box-header-center">Point(중요도)</td>
                  <td className="todo-contribute-box-header todo-contribute-box-header-right">참여도</td>
                </tr>
              </thead>
              <tbody>
                {partItem(this.props.list[key].participatedList)}
                <tr>
                  <td className="todo-contribute-box-footer-center">Total</td>
                  <td className="todo-contribute-box-footer-center">{this.props.list[key].value + "("+ this.props.total + ")"}</td>
                  <td className="todo-contribute-box-footer-center" style={totalBackground}>{value + "%"}</td>
                </tr>
              </tbody>
            </table>
          : null}
        </div>          
    )
  }
}

export default TodoContribute;


/*import React from 'react'
import { ProgressBar, Button } from 'react-bootstrap';

// Import CSS
import '../../styles/TodoContribute.css';

class TodoContribute extends React.Component {
  constructor(props) {
      super(props);
      this.state ={
        showToggle: false, //SHOW HISTORY
      }
      this.toggle = this.toggle.bind(this);
  }

  // SHOW HISTORY BUTTON ACTION
  toggle() {
    this.setState({
      showToggle: !this.state.showToggle
    })
  }

  render() {
    // Todo에 참여한 사람의 개별 ID
    const key = Object.keys(this.props.list)[0];
    // Project 전체에서 해당 ID가 기여한 Percentage
    const value = Math.round(this.props.list[key].value / this.props.total * 100);

    // TODO별 내가 참여한 정보
    const partItem = data => {
      return data.map((item,i) => {

        // 완료된 item에 대한 개별 기여점수
        let point = Math.ceil(item.ratio/100 * item.importance);
        
        return (
          <tr key={i}>
            <td className="todo-contribute-box-body">{item.title}</td>
            <td className="todo-contribute-box-body">{point + "("+item.importance+")"}</td>
            <td className="todo-contribute-box-body">{item.ratio + '%'}</td>
          </tr>
        )
      })
    }

    const percentBar = {
      textAlign: "center",
      color: "white",
      width: value + "%",
      backgroundColor: this.props.color,
      borderRadius: "4px",
      fontSize: "12px"
    }

    const totalBackground = {
      backgroundColor: this.props.color,
      color: "white"
    }

    return (
        <div>
          <div className="todo-contribute-title">
            <span>{key}</span>
            <span className="show-history-text" onClick={this.toggle}>
              {this.state.showToggle ? "Close History" : "Show History"}
            </span>
          </div>
          <div className="percentBox">
            <div style={percentBar}>
              {value + '%'}
            </div>
          </div>
          {this.state.showToggle ?
            <table className="todo-contribute-box slideDown">
              <thead>
                <tr>
                  <td className="todo-contribute-box-header todo-contribute-box-header-left">To-Do</td>
                  <td className="todo-contribute-box-header todo-contribute-box-header-center">Point(중요도)</td>
                  <td className="todo-contribute-box-header todo-contribute-box-header-right">참여도</td>
                </tr>
              </thead>
              <tbody>
              {partItem(this.props.list[key].participatedList)}
              <tr>
                <td className="todo-contribute-box-footer-center">Total</td>
                <td className="todo-contribute-box-footer-center">{this.props.list[key].value + "("+ this.props.total + ")"}</td>
                <td className="todo-contribute-box-footer-center" style={totalBackground}>{value + "%"}</td>
              </tr>
              </tbody>
            </table>
          : null}<hr/>
        </div>          
    )
  }
}

export default TodoContribute;*/
