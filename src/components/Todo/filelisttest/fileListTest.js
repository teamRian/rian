import React, { Component } from 'react';
import { Button, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import moment from 'moment';

import './fileListTest.css';
import FileIcon from './fileIcon.js';
import FileTag from './fileTag.js';

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

    let listKeys = Object.keys(this.props.uploadfile);

    const tagText = {
      fontSize: "5px",
      padding: "2px 2px",
      marginRight: "2px",
      border: "1px solid #9E9E9E",
      borderRadius: "2px",
      color: "#9E9E9E"
    }

    const overflowX = {
      overflowX: "scroll",
      height: "30px",
      paddingLeft: "10px"
    }

    function showTag(Tag) {
       console.log("Tag:::: ", Tag)
      if (Tag.length === 0) {
        return (
          <span>No Tag</span>
        )
      } else {
        return (
          <span style={tagText}>{Tag}</span>
        )
      }
    }

    function tooltip(key) {
      return (
        <Tooltip>
          {key}
        </Tooltip>
      )
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
                      <FileIcon list={key}/>
                    </div>
                    <div className="filedashboardinfo">
                      <OverlayTrigger overlay={tooltip(key)} placement="top">
                        <h4 className="filedashboardinfo-name">{key}</h4>
                      </OverlayTrigger>
                      <button className="showInfo">
                        <svg width="28" height="28" viewBox="0 0 28 28" className="showInfoIcon">
                          <path d="M25.436 2.566a7.98 7.98 0 0 0-2.078-1.51C22.638.703 21.906.5 21.198.5a3 3 0 0 0-1.023.17 2.436 2.436 0 0 0-.893.562L2.292 18.217.5 27.5l9.28-1.796 16.99-16.99c.255-.254.444-.56.562-.888a3 3 0 0 0 .17-1.023c0-.708-.205-1.44-.555-2.16a8 8 0 0 0-1.51-2.077zM9.01 24.252l-4.313.834c0-.03.008-.06.012-.09.007-.944-.74-1.715-1.67-1.723-.04 0-.078.007-.118.01l.83-4.29L17.72 5.024l5.264 5.264L9.01 24.252zm16.84-16.96a.818.818 0 0 1-.194.31l-1.57 1.57-5.26-5.26 1.57-1.57a.82.82 0 0 1 .31-.194 1.45 1.45 0 0 1 .492-.074c.397 0 .917.126 1.468.397.55.27 1.13.678 1.656 1.21.53.53.94 1.11 1.208 1.655.272.55.397 1.07.393 1.468.004.193-.027.358-.074.488z"></path>
                        </svg>
                      </button>
                    </div>
                    <FileTag tags={this.props.uploadfile[key].tag} name={key}/>
                    <div className="removeButtonContainer">
                      <button className="removeButton">
                        <svg width="22" height="21" viewBox="0 0 18 17" className="removeIcon">
                          <ellipse cx="8.62" cy="8.383" rx="8.62" ry="8.383"></ellipse>
                          <path stroke="#FFF" fill="#FFF" d="M11 6.147L10.85 6 8.5 8.284 6.15 6 6 6.147 8.35 8.43 6 10.717l.15.146L8.5 8.578l2.35 2.284.15-.146L8.65 8.43z"></path>
                        </svg>
                      </button>
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


// import React, { Component } from 'react';
// import { Button, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
// import moment from 'moment';

// import './fileListTest.css';
// import FileIcon from './fileIcon.js';
// import FileTag from './fileTag.js';

// class FileList extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       showModal: false
//     }
//     this.open = this.open.bind(this);
//     this.close = this.close.bind(this);
//   }

//   open() {
//     this.setState({
//       showModal: true
//     })
//   }

//   close() {
//     this.setState({
//       showModal: false
//     })
//   }

//   render() {

//     let listKeys = Object.keys(this.props.uploadfile);

//     const tagText = {
//       fontSize: "5px",
//       padding: "2px 2px",
//       marginRight: "2px",
//       border: "1px solid #9E9E9E",
//       borderRadius: "2px",
//       color: "#9E9E9E"
//     }

//     const overflowX = {
//       overflowX: "scroll",
//       height: "30px",
//       paddingLeft: "10px"
//     }

//     function showTag(Tag) {
//        console.log("Tag:::: ", Tag)
//       if (Tag.length === 0) {
//         return (
//           <span>No Tag</span>
//         )
//       } else {
//         return (
//           <span style={tagText}>{Tag}</span>
//         )
//       }
//     }

//     function tooltip(key) {
//       return (
//         <Tooltip>
//           {key}
//         </Tooltip>
//       )
//     }

//     return (
//       <div>
//         <Button bsStyle="info" onClick={this.open}>File List</Button>
//         <Modal show={this.state.showModal} onHide={this.close}>
//           <Modal.Header closeButton>
//             Project File List
//           </Modal.Header>
//           <Modal.Body>
//             <div className="fileListContainer">
//               <ul className="filedashboard">
//                 {listKeys.map((key,i) => 
//                   <li className="filedashboarditem">
//                     <div className="iconImage">
//                       <FileIcon list={key}/>
//                     </div>
//                     <div className="filedashboardinfo">
//                       <OverlayTrigger overlay={tooltip(key)} placement="top">
//                         <h4 className="filedashboardinfo-name">{key}</h4>
//                       </OverlayTrigger>
//                       <button className="showInfo">
//                         <svg width="28" height="28" viewBox="0 0 28 28" className="showInfoIcon">
//                           <path d="M25.436 2.566a7.98 7.98 0 0 0-2.078-1.51C22.638.703 21.906.5 21.198.5a3 3 0 0 0-1.023.17 2.436 2.436 0 0 0-.893.562L2.292 18.217.5 27.5l9.28-1.796 16.99-16.99c.255-.254.444-.56.562-.888a3 3 0 0 0 .17-1.023c0-.708-.205-1.44-.555-2.16a8 8 0 0 0-1.51-2.077zM9.01 24.252l-4.313.834c0-.03.008-.06.012-.09.007-.944-.74-1.715-1.67-1.723-.04 0-.078.007-.118.01l.83-4.29L17.72 5.024l5.264 5.264L9.01 24.252zm16.84-16.96a.818.818 0 0 1-.194.31l-1.57 1.57-5.26-5.26 1.57-1.57a.82.82 0 0 1 .31-.194 1.45 1.45 0 0 1 .492-.074c.397 0 .917.126 1.468.397.55.27 1.13.678 1.656 1.21.53.53.94 1.11 1.208 1.655.272.55.397 1.07.393 1.468.004.193-.027.358-.074.488z"></path>
//                         </svg>
//                       </button>
//                     </div>
//                     <div style={overflowX}>
//                       {this.props.uploadfile[key].tag.map((tag,i) => 
//                         showTag(tag)
//                       )}
//                     </div>
//                     <div className="removeButtonContainer">
//                       <button className="removeButton">
//                         <svg width="22" height="21" viewBox="0 0 18 17" className="removeIcon">
//                           <ellipse cx="8.62" cy="8.383" rx="8.62" ry="8.383"></ellipse>
//                           <path stroke="#FFF" fill="#FFF" d="M11 6.147L10.85 6 8.5 8.284 6.15 6 6 6.147 8.35 8.43 6 10.717l.15.146L8.5 8.578l2.35 2.284.15-.146L8.65 8.43z"></path>
//                         </svg>
//                       </button>
//                     </div>
//                   </li>
//                 )}
//               </ul>
//             </div>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button onClick={this.close}>Close</Button>
//           </Modal.Footer>
//         </Modal>
//       </div>
//     )
//   }
// }

// export default FileList;