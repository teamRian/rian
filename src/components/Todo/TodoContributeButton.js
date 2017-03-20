import React from 'react';
import { Modal, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { Doughnut, HorizontalBar } from 'react-chartjs-2';

// Import Component
import TodoContribute from './TodoContribute.js';

// Import ICON
import svgIcon from './svgIcon';

// Import CSS
import './TodoContributeButton.css';

class TodoContributeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        showModal : false
    }
    this.open  = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  // Modal Button Action
  open () { this.setState( { showModal : true  } ); }
  close() { this.setState( { showModal : false } ); }

  render() {

    const colorData = [
      "246,145,149", "255,225,139", "132,212,201", "183,165,205", "249,187,148", "255,250,133", "133,202,231", "211,164,206", "253,202,149", "199,252,134", "134,172,211", "241,163,205"
    ]
    
    const doughnutData = {
        labels : [],
      datasets : [
        {
                          data : [],
               backgroundColor : [],
          hoverBackgroundColor : [],
                   borderWidth : 1,
                   borderColor : []
        }
      ]
    }

    let doughnutList = this.props.contributionList;
    for ( let i = 0 ; i < doughnutList.length; i++ ) {
      let key = Object.keys(doughnutList[i])[0];
      doughnutData.labels.push(key);
      doughnutData.datasets[0].data.push(doughnutList[i][key].value);

      // Graph Style
      let index                     = i % 12;
      let rgbText                   = "rgba(" + colorData[index];
      let graphBackgroundColor      = rgbText + ",0.2)";
      let graphHoverBackgroundColor = rgbText + ",0.4)";
      let graphBorderColor          = rgbText + ",1)";

      doughnutData.datasets[0].backgroundColor.push(graphBackgroundColor);
      doughnutData.datasets[0].hoverBackgroundColor.push(graphHoverBackgroundColor);
      doughnutData.datasets[0].borderColor.push(graphBorderColor);
    }

    const totalNumber = this.props.todoTotalListNumber;
    const doneNumber  = this.props.todoDoneListNumber
    const donePercent = Math.round(doneNumber / totalNumber * 100);

    const totalProgressBarData = {
        labels : [""],
      datasets : [
        {
                   labels : "Progress",
          backgroundColor : ['rgba(255, 99, 132, 0.2)'],
              borderColor : ['rgba(255,99,132,1)'],
              borderWidth : 1,
             barThickness : 10,
                     data : [donePercent]
        }
      ]
    }

    const totalProgressBarOpt = {
      title   : { display : false },
      legend  : { display : false },
      scales  : {
        yAxes : [ {
                    barThickness : 20,
          scaleShowVerticalLines : false
        } ],
        xAxes : [ {
          ticks : {
            min : 0,
            max : 100
          }
        } ]
      }
    }

    return (
      <div className="todo-contribution-button-box-wrap">
        <OverlayTrigger overlay={tooltip} placement="bottom">
          { svgIcon.contributeButton(this.open) }
        </OverlayTrigger>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header className="todo-contribution-modal-header" closeButton>
            <Modal.Title>
              <p className="todo-contribution-modal-header-text">Contribution</p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="todo-contribution-modal-body-title">전체 정보</p>
            <div className="todo-contribution-modal-body-info-box">
              <div className="todo-contribution-modal-body-info-box-left">
                현재 진행률
              </div>
              <div className="todo-contribution-modal-body-info-box-right">
                <HorizontalBar 
                     data = { totalProgressBarData } 
                  options = { totalProgressBarOpt } 
                   height = { 50 }/>
              </div>
            </div>
            <div className="todo-contribution-modal-body-info-box">
              <div className="todo-contribution-modal-body-info-box-left">
                개별 기여도
              </div>
              <div className="todo-contribution-modal-body-info-box-right">
                <Doughnut data = {doughnutData} />
              </div>
            </div>

            <p className="todo-contribution-modal-body-title">개별 상세 기여도</p>
            {this.props.contributionList.map((list,i) => 
            <TodoContribute { ...this.props } 
                key = { i } 
                  i = { i } 
              color = { i<13 ? colorData[i] : colorData[i%12] } 
              total = { this.props.total } 
               list = { list }
            />)}
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
  <Tooltip id="showContribute">
    Contribute 보기
  </Tooltip>
);

export default TodoContributeButton;
