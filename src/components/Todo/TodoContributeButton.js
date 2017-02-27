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

    let data = {
        labels: [
            "Red",
            "Blue",
            "Yellow"
        ],
        datasets: [
            {
                data: [300, 50, 100],
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56"
                ],
                hoverBackgroundColor: [
                    "#F7464A",
                    "#36A2EB",
                    "#FFCE56"
                ]
            }]
    };

    const colorData = ["#f69195", "#f9bb94", "#fdca95", "#ffe18b", "#fffa85", "#c7fc86", "#84d4c9", "#85cae7", "#86acd3", "#b7a5cd", "#d3a4ce", "#f1a3cd"];
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
            <p>전체정보</p>
            <Doughnut data={doughnutData} />
            {this.props.contributionList.map((list,i) => 
            <TodoContribute {...this.props} key={i} i={i} total={this.props.total} list={list}/>)}
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
