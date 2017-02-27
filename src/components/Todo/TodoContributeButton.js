import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2';

// Import Component
import TodoContribute from './TodoContribute.js';

// Import Css
import '../../styles/TodoContributeButton.css'

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

    const colorData = ["#f69195", "#ffe18b", "#84d4c9", "#b7a5cd", "#f9bb94", "#fffa85", "#85cae7", "#d3a4ce", "#fdca95", "#c7fc86", "#86acd3", "#f1a3cd"];
    const doughnutData = {
      labels: [],
      datasets: [
        {
          data:[],
          backgroundColor: [],
          hoverBackgroundColor: []
        }
      ]
    }

    let doughnutList = this.props.contributionList;
    for(let i = 0 ; i < doughnutList.length; i++) {
      let key = Object.keys(doughnutList[i])[0];
      doughnutData.labels.push(key);
      doughnutData.datasets[0].data.push(doughnutList[i][key].value);
      if(i < 13) {
        doughnutData.datasets[0].backgroundColor.push(colorData[i]);
        doughnutData.datasets[0].hoverBackgroundColor.push(colorData[i]);
      } else {
        doughnutData.datasets[0].backgroundColor.push(colorData[i%12]);
        doughnutData.datasets[0].hoverBackgroundColor.push(colorData[i%12]);
      }
    }

    const totalNumber = this.props.todoTotalListNumber;
    const doneNumber = this.props.todoDoneListNumber
    const donePercent = Math.round(doneNumber / totalNumber * 100);

    const fontSizeAdj = {
      fontSize: "10px"
    }

    const bottom = {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "middle",
      marginBottom: "10px",
      textAlign: "center"
    }

    const left = {
      width: "20%",
      fontSize: "13px"
    }

    const right = {
      width: "80%",
      borderRadius: "4px",
      backgroundColor: "rgba(245,245,245,1)"
    }

    const rightContent = {
      width: donePercent + "%",
      textAlign: "center",
      backgroundColor: "#4d5360",      
      color: "white",
      borderRadius: "4px"
    }

    return (
      <div>
        <Button bsStyle="info" onClick={this.open}>Contribution</Button>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>
              <p className="contribution-header-text">Contribution</p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>전체 정보</p>
            <div style={bottom}>
              <div style={left}>
                진행률
              </div>
              <div style={right}>
                <div style={rightContent}>
                  {donePercent + "%"}
                </div>
              </div>
            </div>
            <Doughnut data={doughnutData} /><hr/>
            <p>개별 정보</p>
            {this.props.contributionList.map((list,i) => 
            <TodoContribute {...this.props} key={i} i={i} color={i<13? colorData[i]: colorData[i%12]} total={this.props.total} list={list}/>)}
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
