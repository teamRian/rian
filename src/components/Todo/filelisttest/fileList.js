import React, { Component } from 'react';
import { Button, Modal, OverlayTrigger, Tooltip, Table } from 'react-bootstrap';
import moment from 'moment';

import './fileList.css';
import FileIcon from './fileIcon.js';
import FileTag from './fileTag.js';
import FileUpload from './FileUpload.js';

class FileList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showListModal: false,
      showDeleteModal: false,
      showFileEditModal: false, 
      showFileInfo: false,
      removeFileItem: "",
      downloadFileItem: "",
      searchFileText: "",
      fileInfoName: "",
      editFileName: "",
      editRemoveTag:"",
      editNewTag: []
    }
    // Open Modal
    this.openList = this.openList.bind(this);
    this.closeList = this.closeList.bind(this);
    this.openDeleteModal = this.openDeleteModal.bind(this);
    this.closeDeleteModal = this.closeDeleteModal.bind(this);
    this.openFileEditModal = this.openFileEditModal.bind(this);
    this.closeFileEditModal = this.closeFileEditModal.bind(this);

    // handle function
    this.handleRemove = this.handleRemove.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleFileInfo = this.handleFileInfo.bind(this);
    this.handleFileInfoClose = this.handleFileInfoClose.bind(this);
    this.handleEditRemoveTag= this.handleEditRemoveTag.bind(this);
  }

  openList() {
    this.setState({
      showListModal: true
    })
  }

  closeList() {
    this.setState({
      showListModal: false,
      showFileInfo: false,
      searchFileText: ""
    })
  }

  openDeleteModal(e) {
    const fileName = e.currentTarget.id;
    this.setState({
      showDeleteModal: true,
      removeFileItem: fileName
    })
  }

  closeDeleteModal() {
    this.setState({
      showDeleteModal: false
    })
  }

  openFileEditModal(e) {
    e.preventDefault();
    const filename = e.currentTarget.id;
    this.setState({
      showFileEditModal: true,
      editFileName: filename,
      editNewTag: this.props.uploadfile[filename].tag
    })
  }

  closeFileEditModal() {
    this.setState({
      showFileEditModal: false
    })
  }

  handleRemove(e) {
    e.preventDefault();
    this.state.showDeleteModal = false;
    const fileName = this.state.removeFileItem;
    this.props.deleteFile(fileName);
  }

  handleDownload(e) {
    e.preventDefault();
    const fileName = e.currentTarget.id;
    this.props.downloadFile(fileName); 
  }

  handleSearch(e) {
    e.preventDefault();
    this.setState({
      searchFileText: e.target.value
    })
  }

  handleFileInfo(e) {
    e.preventDefault();
    this.setState({
      showFileInfo: true,
      fileInfoName: e.currentTarget.id
    })
  }

  handleFileInfoClose(e) {
    e.preventDefault();
    this.setState({
      showFileInfo: false,
      fileInfoName: ""
    })
  }

  handleEditRemoveTag(e) {
    e.preventDefault();
    let originalTag = this.state.editNewTag;
    let tagIndex = originalTag.indexOf(e.currentTarget.textContent);
    let fixedTag = [ ...this.state.editNewTag.slice(0, tagIndex), ...this.state.editNewTag.slice(tagIndex+1)];
    if(fixedTag.length === 0) {
      this.setState({
        editNewTag: []
      })
    } else {
      this.setState({
        editNewTag: fixedTag
      })
    }
  }

  render() {

    let listKeys = Object.keys(this.props.uploadfile);

    let searchResult = [];
    let uploadFileList = this.props.uploadfile;
    let searchText = this.state.searchFileText; 

    if(this.state.searchFileText.length !== 0) {
      for(let i = 0; i < listKeys.length; i++) {

        if(listKeys[i].indexOf(searchText) !== -1) {
          searchResult.push(listKeys[i]);
        } 
        else {
          let tagList = uploadFileList[listKeys[i]].tag;
          for(let k = 0; k < tagList.length; k++) {
            if(tagList[k].indexOf(searchText) !== -1) {
              searchResult.push(listKeys[i])
            }
          }
        }
      }
      listKeys = searchResult;
    }
    
    return (
      <div>
        <Button bsStyle="info" onClick={this.openList}>File List</Button>
        <Modal show={this.state.showListModal} onHide={this.closeList}>
          <Modal.Header closeButton>
            <span className="file-modal-header-text">Project File List</span>
          </Modal.Header>
          <Modal.Body>
            <div className="fileListContainer">
              {this.state.showFileInfo? fileInfoTable(this.state.fileInfoName, this.props.uploadfile[this.state.fileInfoName], this.handleFileInfoClose, this.openFileEditModal) : ""}
              <ul className="filedashboard">
                {listKeys.map((key,i) => 
                  <li key={i} className="filedashboarditem">
                    <div className="iconImage" id={key} onClick={this.handleFileInfo}>
                      <FileIcon list={key}/>
                    </div>
                    <div className="filedashboardinfo">
                      <OverlayTrigger overlay={tooltip(key)} placement="top">
                        <h4 className="filedashboardinfo-name">{key}</h4>
                      </OverlayTrigger>
                      <button className="showInfo" id={key} onClick={this.handleDownload}>
                        {downloadButton}
                      </button>
                    </div>
                    <FileTag tags={this.props.uploadfile[key].tag} name={key}/>
                    <div className="removeButtonContainer">
                      <button className="removeButton" id={key} onClick={this.openDeleteModal}>
                        {removeButton}
                      </button>
                    </div>
                  </li>
                )}
              </ul>

              <Modal show={this.state.showFileEditModal} onHide={this.closeFileEditModal}>
                <Modal.Header>Tag 수정</Modal.Header>
                <Modal.Body>{this.state.editFileName.length === 0? "" : showTagList(this.state.editNewTag, this.handleEditRemoveTag)}</Modal.Body>
                <Modal.Footer>
                  <Button bsStyle="danger">변경하기</Button>
                  <Button onClick={this.closeFileEditModal}>취소하기</Button>
                </Modal.Footer>
              </Modal>

              <Modal show={this.state.showDeleteModal} onHide={this.closeDeleteModal}>
                <Modal.Header>파일 삭제</Modal.Header>
                <Modal.Body>{this.state.removeFileItem}을 삭제하시겠습니까?</Modal.Body>
                <Modal.Footer>
                  <Button bsStyle="danger" onClick={this.handleRemove}>삭제하기</Button>
                  <Button onClick={this.closeDeleteModal}>취소하기</Button>
                </Modal.Footer>
              </Modal>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="file-modal-footer-box">
              <div className="file-modal-footer-input-box">
                <input className="file-modal-footer-input" type="text" placeholder="File 검색" id="search-file" onChange={this.handleSearch}/>  
              </div>
              <div className="file-modal-footer-button">
                <FileUpload {...this.props}/>
                <Button className="file-modal-footer-button-close" onClick={this.closeList}>Close</Button>
              </div>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}
// React Component End

const showTagList = (tagList, removeFunction) => {
  return (
    <div>
      <form className="addTagContainer">
        <span className="editTagAddTag">Tag 추가</span>
        <input type="text" placeholder="Tag를 입력하세요" className="editTagInputText" />
        {plusIcon}
        <span className="editTagWarningText">* Tag를 클릭하시면 삭제됩니다.</span>
      </form>
      <ul className="editTagBox">
       {tagList.map((tag,i)=>(
          <li className="editTagItem" onClick={removeFunction} key={tag}>{tag}</li>
        ))} 
      </ul>
    </div>
  )
}


const showTag = (Tag) => {
  if (Tag.length === 0) {
    return (
      <span>No Tag</span>
    )
  } else {
    return (
      <span className="tagText">{Tag}</span>
    )
  }
}

const tooltip = (key) => {
  return (
    <Tooltip id={key}>
      {key}
    </Tooltip>
  )
}

const fileInfoTable = (key, info, close, openEdit) => {
  let tagString = "";

  for(let j = 0; j < info.tag.length; j++) {
    if (j === info.tag.length - 1) {
      tagString = tagString + " " + info.tag[j]; 
    } else {
      tagString = tagString + " " + info.tag[j] + ",";
    }
  }

  return (
    <div className="fileInfoTableBox">
      <Table className="fileInfoTableBoxMargin">
        <tbody>
          <tr>
            <td className="fileInfoTableTdTitle">파일명</td>
            <td className="fileInfoTableTd"><div className="scrollable">{key}</div></td>
            <td className="fileInfoTableTdTitle">uploader</td>
            <td className="fileInfoTableTd" colSpan="2"><div className="scrollable">{info.uploader}</div></td>
          </tr>
          <tr>
            <td className="fileInfoTableTdTitle">Created At</td>
            <td className="fileInfoTableTd"><div className="scrollable">{info.createdAt}</div></td>
            <td className="fileInfoTableTdTitle">파일크기</td>
            <td className="fileInfoTableTd" colSpan="2"><div className="scrollable">{info.filesize}</div></td>
          </tr>
          <tr>
            <td className="fileInfoTableTdTitle">Tag</td>
            <td className="fileInfoTableTd2" colSpan="3"><div className="scrollable">{tagString}</div></td>
            <td className="fileInfoTableTd3"><button onClick={openEdit} id={key}>edit</button></td>
          </tr>
        </tbody>
      </Table>
      <div className="fileInfoTableRemoveButtonContainer" onClick={close}>
        <button className="removeButton" id={key}>
          {removeButton}
        </button>
      </div>
    </div>
  )
}


// ICON SVGs
const downloadButton = (
  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
     viewBox="0 0 433.72 433.72" style={{enableBackground:"new 0 0 433.72 433.72"}} xmlSpace="preserve" width="18" height="18">
    <g>
      <path style={{fill:"#EF806F"}} d="M406.03,251.19c17.06,16.37,27.69,39.41,27.69,64.93c0,49.71-40.3,90-90,90c-49.71,0-90-40.29-90-90
        c0-3.53,0.2-7,0.6-10.42c5.16-44.79,43.22-79.58,89.4-79.58C367.9,226.12,389.86,235.65,406.03,251.19z"/>
      <polygon style={{fill:"#FFFFFF"}} points="336.217,248.596 336.217,354.94 309.423,328.146 298.816,338.752 343.717,383.653 
        388.619,338.752 378.012,328.146 351.217,354.94 351.217,248.596"/>
      <path style={{fill:"#1EA6C6"}} d="M412.91,216.89c0,7.16-0.85,14.12-2.46,20.79c-18.61-15.89-42.07-24.56-66.73-24.56
        c-52.35,0-96.33,39.16-102.31,91.07c-0.06,0.48-0.11,0.96-0.16,1.44H70.99C31.78,305.63,0,273.84,0,234.64
        c0-30.52,19.26-56.54,46.29-66.57c-0.1-1.46-0.16-2.94-0.16-4.42c0-36.41,29.51-65.92,65.92-65.92c11.66,0,22.61,3.04,32.12,8.36
        c10.19-44.94,50.38-78.49,98.4-78.49c55.73,0,100.91,45.18,100.91,100.91c0,0.58-0.02,1.16-0.03,1.75
        C383.19,139.06,412.91,174.5,412.91,216.89z"/>
    </g>
  </svg>
)

const removeButton = (
  <svg width="22" height="21" viewBox="0 0 18 17" className="removeIcon">
    <ellipse fill="#F8BBD0" cx="8.62" cy="8.383" rx="8.62" ry="8.383"></ellipse>
    <path stroke="#FFF" fill="#FFF" d="M11 6.147L10.85 6 8.5 8.284 6.15 6 6 6.147 8.35 8.43 6 10.717l.15.146L8.5 8.578l2.35 2.284.15-.146L8.65 8.43z"></path>
  </svg>
)

const plusIcon = (
  <svg className="editTagPlusIconStyle" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
viewBox="0 0 496.158 496.158" xmlSpace="preserve" width="20px" height="20px">
    <path style={{fill:"#32BEA6"}} d="M0,248.085C0,111.063,111.069,0.003,248.075,0.003c137.013,0,248.083,111.061,248.083,248.082
      c0,137.002-111.07,248.07-248.083,248.07C111.069,496.155,0,385.087,0,248.085z"/>
    <path style={{fill:"#FFFFFF"}} d="M383.546,206.55H289.08v-93.938c0-3.976-3.224-7.199-7.201-7.199H213.75
      c-3.977,0-7.2,3.224-7.2,7.199v93.938h-93.937c-3.977,0-7.2,3.225-7.2,7.2v69.187c0,3.976,3.224,7.199,7.2,7.199h93.937v93.41
      c0,3.976,3.224,7.199,7.2,7.199h68.129c3.978,0,7.201-3.224,7.201-7.199v-93.41h94.466c3.976,0,7.199-3.224,7.199-7.199V213.75
      C390.745,209.774,387.521,206.55,383.546,206.55z"/>
  </svg>
)

export default FileList;
