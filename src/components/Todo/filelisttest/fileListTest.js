import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import moment from 'moment';

import './fileListTest.css';

class FileList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false
    }
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  open() {
    this.setState({
      showModal: true
    })
  }

  close() {
    this.setState({
      showModal: false
    })
  }

  render() {

    let listKeys = Object.keys(this.props.uploadfile)

    function showTag(Tag) {
       console.log("Tag:::: ", Tag)
      if (Tag.length === 0) {
        return (
          <div>No Tag</div>
        )
      } else {
        return (
          <span>{"#" + Tag}</span>
        )
      }
    } 

    const imageIcon = (
      <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
         viewBox="0 0 58 58" style={{enableBackground: "new 0 0 58 58"}} xmlSpace="preserve">
        <rect x="1" y="7" style={{fill:"#C3E1ED",stroke:"#E7ECED", strokeWidth:"2", strokeMiterlimit:"10"}} width="56" height="44"/>
        <circle style={{fill:"#ED8A19"}} cx="16" cy="17.569" r="6.569"/>
        <polygon style={{fill:"#1A9172"}} points="56,36.111 55,35 43,24 32.5,35.5 37.983,40.983 42,45 56,45 "/>
        <polygon style={{fill:"#1A9172"}} points="2,49 26,49 21.983,44.983 11.017,34.017 2,41.956 "/>
        <rect x="2" y="45" style={{fill:"#6B5B4B"}} width="54" height="5"/>
        <polygon style={{fill:"#25AE88"}} points="37.983,40.983 27.017,30.017 10,45 42,45 "/>
      </svg>
    )

    function iconSelector(key) {
      if(key.indexOf('.svg') !== -1 || key.indexOf('.png') !== -1 || key.indexOf('.jpg') !== -1 || key.indexOf('.jpeg') !== -1) {
        return (<img src="http://www.freeiconspng.com/uploads/multimedia-photo-icon-31.png"/>)
      } else if(key.indexOf('.pptx') !== -1 || key.indexOf('ppt') !== -1) {
        return (<img src="http://icons.iconarchive.com/icons/blackvariant/button-ui-ms-office-2016/256/PowerPoint-2-icon.png"/>)
      } else if(key.indexOf('.pdf') !== -1) {
        return (<img src="./pdf.png"/>)
      } else {
        return (<img src="http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/file-text-icon.png"/>)
      }
    }

    return (
      <div>
        <Button bsStyle="info" onClick={this.open}>File List</Button>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            Project File List
          </Modal.Header>
          <Modal.Body>
            <div className="fileListContainer">
              <ul className="filedashboard">
                {listKeys.map((key,i) => 
                  <li className="filedashboarditem">
                    <div className="iconImage">
                      {iconSelector(key)}
                    </div>
                    <div className="filedashboardinfo">
                      <h4 className="filedashboardinfo-name">{key}</h4>
                      {this.props.uploadfile[key].tag.map((tag,i) => 
                        showTag(tag)
                      )}
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default FileList;