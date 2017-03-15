import React from 'react';
import { Modal, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { Doughnut, HorizontalBar } from 'react-chartjs-2';

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

    const colorData = [
      "246,145,149", "255,225,139", "132,212,201", "183,165,205", "249,187,148", "255,250,133", "133,202,231", "211,164,206", "253,202,149", "199,252,134", "134,172,211", "241,163,205"
    ]
    
    const doughnutData = {
      labels: [],
      datasets: [
        {
          data:[],
          backgroundColor: [],
          hoverBackgroundColor: [],
          borderWidth: 1,
          borderColor: []
        }
      ]
    }

    let doughnutList = this.props.contributionList;
    for(let i = 0 ; i < doughnutList.length; i++) {
      let key = Object.keys(doughnutList[i])[0];
      doughnutData.labels.push(key);
      doughnutData.datasets[0].data.push(doughnutList[i][key].value);

      // Graph Style
      let index = i % 12;
      let rgbText = "rgba(" + colorData[index];
      let graphBackgroundColor = rgbText + ",0.2)";
      let graphHoverBackgroundColor = rgbText + ",0.4)";
      let graphBorderColor = rgbText + ",1)";

      doughnutData.datasets[0].backgroundColor.push(graphBackgroundColor);
      doughnutData.datasets[0].hoverBackgroundColor.push(graphHoverBackgroundColor);
      doughnutData.datasets[0].borderColor.push(graphBorderColor);
    }

    const totalNumber = this.props.todoTotalListNumber;
    const doneNumber = this.props.todoDoneListNumber
    const donePercent = Math.round(doneNumber / totalNumber * 100);

    const totalProgressBarData = {
      labels: [""],
      datasets: [
        {
          labels: "Progress",
          backgroundColor:['rgba(255, 99, 132, 0.2)'],
          borderColor:['rgba(255,99,132,1)'],
          borderWidth: 1,
          barThickness: 10,
          data: [donePercent]
        }
      ]
    }

    const totalProgressBarOpt = {
      title:{
        display: false
      },
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
          barThickness: 20,
          scaleShowVerticalLines : false
        }],
        xAxes: [{
          ticks: {
            min:0,
            max:100
          }
        }]
      }
    }

    const wrap = {
      display: "flex",
      flexWrap: "wrap",
      padding: "5px 5px"
    }

    const tooltip = (
      <Tooltip id="showContribute">
        Contribute 보기
      </Tooltip>
    );

    const contributeButton = (
      <svg onClick={this.open} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 512 512" style={{enableBackground:"new 0 0 512 512"}} xmlSpace="preserve" width="40px" height="40px">
            <circle style={{fill:"#324A5E"}} cx="256" cy="256" r="256"/>
            <path style={{fill:"#2B3B4E"}} d="M509.6,291.059L342.323,123.782L236.347,370.81l-49.304,63.959l77.09,77.09
                C389.946,507.93,492.865,413.231,509.6,291.059z"/>
            <polygon style={{fill:"#F4E3C3"}} points="324.956,434.769 256,401.153 187.044,434.769 187.044,300.304 324.956,300.304 "/>
            <polygon style={{fill:"#FED8B2"}} points="255.426,300.304 255.426,401.432 256,401.153 324.956,434.769 324.956,300.304 "/>
            <circle style={{fill:"#FC6F58"}} cx="256" cy="216.523" r="126.707"/>
            <path style={{fill:"#F1543F"}} d="M256,89.815c-0.193,0-0.381,0.014-0.574,0.014v253.385c0.191,0,0.381,0.016,0.574,0.016
                c69.979,0,126.707-56.729,126.707-126.707S325.977,89.815,256,89.815z"/>
            <circle style={{fill:"#C1321F"}} cx="256" cy="216.523" r="84.471"/>
            <path style={{fill:"#A82116"}} d="M256,132.051c-0.193,0-0.381,0.014-0.574,0.014v168.913c0.191,0.002,0.381,0.016,0.574,0.016
                c46.652,0,84.471-37.819,84.471-84.471S302.651,132.051,256,132.051z"/>
            <path style={{fill:"#E6F3FF"}} d="M222.384,256.431c-2.426,0-4.853-0.926-6.704-2.777c-3.703-3.701-3.703-9.706,0-13.407l67.232-67.232
                c3.699-3.703,9.707-3.703,13.407,0c3.703,3.701,3.703,9.706,0,13.407l-67.232,67.232
                C227.237,255.505,224.809,256.431,222.384,256.431z"/>
            <path style={{fill:"#CFDBE6"}} d="M296.32,173.013c-3.699-3.703-9.707-3.703-13.407,0l-27.486,27.486v26.815l40.894-40.895
                C300.023,182.718,300.023,176.716,296.32,173.013z"/>
            <path style={{fill:"#E6F3FF"}} d="M227.55,192.215c-3.172,0-6.277-1.293-8.533-3.534c-2.241-2.243-3.534-5.361-3.534-8.533
                s1.293-6.292,3.534-8.533c2.258-2.241,5.361-3.534,8.533-3.534c3.189,0,6.291,1.293,8.533,3.534
                c2.258,2.241,3.534,5.361,3.534,8.533s-1.276,6.291-3.534,8.533C233.841,190.923,230.722,192.215,227.55,192.215z"/>
            <path style={{fill:"#CFDBE6"}} d="M284.439,257.724c-3.172,0-6.277-1.293-8.533-3.534c-2.241-2.243-3.534-5.361-3.534-8.533
                s1.293-6.292,3.534-8.533c2.241-2.241,5.361-3.534,8.533-3.534c3.189,0,6.291,1.293,8.533,3.534
                c2.258,2.241,3.534,5.361,3.534,8.533s-1.276,6.291-3.534,8.533C290.73,256.431,287.611,257.724,284.439,257.724z"/>
        </svg>
    );

    const contributionModalHeader = {
      backgroundColor: "#7E57C2",
      color: "white"
    }

    return (
      <div style={wrap}>
        <OverlayTrigger overlay={tooltip} placement="bottom">
          {contributeButton}
        </OverlayTrigger>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header style={contributionModalHeader} closeButton>
            <Modal.Title>
              <p className="contribution-header-text">Contribution</p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="body-header-text">전체 정보</p>
            <div className="body-info-box">
              <div className="body-info-box-left">
                현재 진행률
              </div>
              <div className="body-info-box-right">
                <HorizontalBar 
                  data={totalProgressBarData} 
                  options={totalProgressBarOpt} 
                  height={50}/>
              </div>
            </div>
            <div className="body-info-box">
              <div className="body-info-box-left">
                개별 기여도
              </div>
              <div className="body-info-box-right">
                <Doughnut data={doughnutData} />
              </div>
            </div>

            <p className="body-header-text">개별 상세 기여도</p>
            {this.props.contributionList.map((list,i) => 
            <TodoContribute {...this.props} key={i} i={i} color={i<13? colorData[i] : colorData[i%12]} total={this.props.total} list={list}/>)}
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
