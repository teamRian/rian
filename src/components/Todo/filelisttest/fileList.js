import React, { Component } from 'react';
import { Button, Modal, OverlayTrigger, Tooltip, Table } from 'react-bootstrap';
import moment from 'moment';

// Import Component
import FileIcon   from './fileIcon.js';
import FileTag    from './fileTag.js';
import FileUpload from './FileUpload.js';

// Import ICON
import FileSvgIcon from './file_svgIcon';

// Import CSS
import './fileList.css';

class FileList extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
          showListModal : false,
        showDeleteModal : false,
      showFileEditModal : false, 
           showFileInfo : false,
         removeFileItem : "",
       downloadFileItem : "",
         searchFileText : "",
           fileInfoName : "",
           editFileName : "",
          editRemoveTag : "",
             editNewTag : "",
        editNewTagArray : []
    };

    // Open Modal
    this.openList             = this.openList.bind(this);
    this.closeList            = this.closeList.bind(this);
    this.openDeleteModal      = this.openDeleteModal.bind(this);
    this.closeDeleteModal     = this.closeDeleteModal.bind(this);
    this.openFileEditModal    = this.openFileEditModal.bind(this);
    this.closeFileEditModal   = this.closeFileEditModal.bind(this);

    // Handle Function
    this.handleRemove         = this.handleRemove.bind(this);
    this.handleDownload       = this.handleDownload.bind(this);
    this.handleSearch         = this.handleSearch.bind(this);
    this.handleFileInfoOpen   = this.handleFileInfoOpen.bind(this);
    this.handleFileInfoClose  = this.handleFileInfoClose.bind(this);
    this.handleEditRemoveTag  = this.handleEditRemoveTag.bind(this);
    this.handleEditAddTagText = this.handleEditAddTagText.bind(this);
    this.handleEditAddTag     = this.handleEditAddTag.bind(this);
  }

  // Modal Button Action
  openList () { this.setState( { showListModal : true } ); }
  closeList() {
    this.setState({
       showListModal : false,
        showFileInfo : false,
      searchFileText : ""
    })
  }

  openDeleteModal(e) {
    const fileName = e.currentTarget.id;
    this.setState({
      showDeleteModal : true,
       removeFileItem : fileName
    })
  }
  closeDeleteModal() { this.setState( { showDeleteModal : false } ); }

  openFileEditModal(e) {
    e.preventDefault();
    const filename = e.currentTarget.id;
    this.setState({
     showFileEditModal : true,
          editFileName : filename,
       editNewTagArray : this.props.uploadfile[filename].tag
    })
  }
  closeFileEditModal() { this.setState( { showFileEditModal : false } ); }


  // Other Function Action
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
      searchFileText : e.target.value
    })
  }

  handleFileInfoOpen(e) {
    e.preventDefault();
    this.setState({
      showFileInfo : true,
      fileInfoName : e.currentTarget.id
    })
  }

  handleFileInfoClose(e) {
    e.preventDefault();
    this.setState({
      showFileInfo : false,
      fileInfoName : ""
    })
  }

  handleEditAddTagText(e) {
    e.preventDefault();
    this.setState({
       editNewTag : e.target.value
    })
  }

  handleEditAddTag(e) {
    e.preventDefault();

    if(this.state.editNewTag.length === 0) {
      window.alert("Tag를 입력하세요!!!");
    } else {
      let originalTagArr = this.state.editNewTagArray;
      if(originalTagArr.indexOf(this.state.editNewTag) === -1) {
        originalTagArr.push(this.state.editNewTag);
        this.setState({
          editNewTagArray: originalTagArr,
        })
        this.props.editFile(this.state.fileInfoName, originalTagArr);
      } else {
        window.alert("이미 존재하는 Tag입니다.");
      }
    }
  }

  handleEditRemoveTag(e) {
    e.preventDefault();
    
    let originalTag = this.state.editNewTagArray;
    let tagIndex    = originalTag.indexOf(e.currentTarget.textContent);
    let fixedTag    = [ ...originalTag.slice(0, tagIndex), ...originalTag.slice(tagIndex+1) ];

    if(fixedTag.length === 0) {
      this.setState({
        editNewTagArray : []
      })
    } else {
      this.setState({
        editNewTagArray : fixedTag
      })
    }

    this.props.editFile(this.state.fileInfoName, fixedTag);
  }

  render() {

    let listKeys = Object.keys(this.props.uploadfile);

    let searchResult   = [];
    let uploadFileList = this.props.uploadfile;
    let searchText     = this.state.searchFileText; 

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
          <Modal.Header className="file-list-modal-header-background" closeButton>
            <span className="file-modal-header-text">Project File List</span>
          </Modal.Header>
          <Modal.Body>
            <div className="fileListContainer">
              {this.state.showFileInfo? fileInfoTable(this.state.fileInfoName, this.props.uploadfile[this.state.fileInfoName], this.handleFileInfoClose, this.openFileEditModal) : ""}
              <ul className="filedashboard">
                {listKeys.map((key,i) => 
                  <li key={i} className="filedashboarditem">
                    <div className="iconImage" id={key} onClick={this.handleFileInfoOpen}>
                      <FileIcon list={key}/>
                    </div>
                    <div className="filedashboardinfo">
                      <OverlayTrigger overlay={tooltip(key)} placement="top">
                        <h4 className="filedashboardinfo-name">{key}</h4>
                      </OverlayTrigger>
                      <button className="showInfo" id={key} onClick={this.handleDownload}>
                        {FileSvgIcon.downloadButton}
                      </button>
                    </div>
                    <FileTag tags={this.props.uploadfile[key].tag} name={key}/>
                    <div className="removeButtonContainer">
                      <button className="removeButton" id={key} onClick={this.openDeleteModal}>
                        {FileSvgIcon.removeButton}
                      </button>
                    </div>
                  </li>
                )}
              </ul>

              <Modal show={this.state.showFileEditModal} onHide={this.closeFileEditModal}>
                <Modal.Header>Tag 수정</Modal.Header>
                <Modal.Body>
                  {this.state.editFileName.length === 0 ? "" : showTagList(this.state.editNewTagArray, this.handleEditRemoveTag, this.handleEditAddTagText, this.handleEditAddTag)}
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={this.closeFileEditModal}>닫기</Button>
                </Modal.Footer>
              </Modal>

              <Modal show={this.state.showDeleteModal} onHide={this.closeDeleteModal}>
                <Modal.Header>파일 삭제</Modal.Header>
                <Modal.Body>{this.state.removeFileItem}을 삭제하시겠습니까?</Modal.Body>
                <Modal.Footer>
                  <Button bsStyle="danger" onClick={this.handleRemove}>삭제하기</Button>
                  <button className="closeButtonStyle" onClick={this.closeDeleteModal}>취소하기</button>
                </Modal.Footer>
              </Modal>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="file-modal-footer-box">
              <div className="file-modal-footer-input-box">
                <input className="file-modal-footer-input" type="text" placeholder="File 검색" className="editTagInputText" onChange={this.handleSearch}/>  
              </div>
              <div className="file-modal-footer-button">
                <FileUpload {...this.props}/>
                <button className="closeButtonStyle" onClick={this.closeList}>Close</button>
              </div>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}
// React Component End


const showTagList = (tagList, removeFunction, stateAddTextFunction, addTagFunction) => {
  return (
    <div>
      <div>
        <form className="addTagContainer">
          <div className="testInput">
            <input type="text" className="editTagInputText2" onChange={stateAddTextFunction} required/>
            <span className="highlight"></span>
            <span className="bar"></span>
            <label className="testLabel">Tag를 추가하세요</label>
          </div>
          <div onClick={addTagFunction}>{FileSvgIcon.plusIcon}</div>
          <span className="editTagWarningText">* Tag를 클릭하시면 삭제됩니다.</span>
        </form>
      </div>
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
          {FileSvgIcon.removeButton}
        </button>
      </div>
    </div>
  )
}

export default FileList;
